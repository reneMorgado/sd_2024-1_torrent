import WebTorrent from 'webtorrent-hybrid';
import ora from 'ora';

const client = new WebTorrent();
const magnetLink = 'magnet:?xt=urn:btih:YOUR_MAGNET_LINK';

const spinner = ora('Descargando torrent').start();

client.add(magnetLink, { path: './downloads' }, (torrent) => {
  spinner.succeed('Torrent añadido');
  console.log('Nombre:', torrent.name);
  console.log('Número de archivos:', torrent.files.length);

  torrent.files.forEach((file, index) => {
    const filePath = `./downloads/${index + 1}_${file.name}`;

    const fileSpinner = ora(`Descargando ${file.name} (${stringWidth(file.length)} bytes)`).start();

    file.createReadStream()
      .pipe(require('fs').createWriteStream(filePath))
      .on('finish', () => {
        fileSpinner.succeed(`Descargado ${file.name}`);
      });
  });

  torrent.on('done', () => {
    spinner.succeed('Descarga completa');
  });
});

client.on('error', (err) => {
  spinner.fail('Error en el cliente');
  console.error(err);
});

client.on('warning', (err) => {
  spinner.warn('Advertencia del cliente');
  console.warn(err);
});
