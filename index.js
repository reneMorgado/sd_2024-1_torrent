import WebTorrent from 'webtorrent-hybrid';
import cliProgress from 'cli-progress';
import chalk from 'chalk';
import fs from 'fs';
// Prueba commit
const client = new WebTorrent();
const magnetLink = process.argv[2];

if (!magnetLink) {
  console.error(chalk.red('Error: Debes proporcionar un magnet link como argumento.'));
  process.exit(1);
}

const progressBar = new cliProgress.SingleBar(
  {
    format: 'Descargando [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} archivos',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  },
  cliProgress.Presets.rect
);


console.log(chalk.blue('Descargando torrent...'));

const downloadTorrent = (torrent) => {
  console.log(chalk.green('Torrent añadido'));
  console.log('Nombre:', torrent.name);
  console.log('Número de archivos:', torrent.files.length);

  if (torrent.files.length === 0) {
    console.error(chalk.red('Error: No hay archivos en el torrent.'));
    process.exit(1);
  }

  const file = torrent.files[0];
  const filePath = `./downloads/${file.name}`;
  const writeStream = fs.createWriteStream(filePath);

  progressBar.start(1, 0);

  const stream = file.createReadStream();
  stream.pipe(writeStream);

  stream.on('end', () => {
    progressBar.increment();
    progressBar.stop();
    console.log(chalk.green('Descarga completa'));
    process.exit(0); // Termina el proceso con éxito
  });

  stream.on('error', (error) => {
    progressBar.stop();
    console.error(chalk.red('Error en la descarga:'), error);
    process.exit(1); // Termina el proceso con error
  });
};

client.add(magnetLink, { path: './downloads' }, downloadTorrent);

client.on('error', (err) => {
  console.error(chalk.red('Error en el cliente:'), err);
  process.exit(1); // Termina el proceso con error
});

client.on('warning', (err) => {
  console.warn(chalk.yellow('Advertencia del cliente:'), err);
});
