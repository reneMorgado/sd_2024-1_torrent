# Documentación para la Descarga de Torrents con WebTorrent en Node.js

Este es un script en JavaScript que utiliza las bibliotecas WebTorrent, cli-progress, chalk y fs para descargar torrents desde la línea de comandos. A continuación, se proporciona una documentación detallada del código.

## Requisitos Previos
Asegúrate de tener Node.js instalado en tu sistema antes de ejecutar este script.

## Instalación de Dependencias
Antes de ejecutar el script, instala las dependencias necesarias utilizando el siguiente comando:

```bash
npm install webtorrent-hybrid cli-progress chalk fs
```

## Uso del Script

Ejecuta el script con el siguiente comando, proporcionando un enlace magnet como argumento:

```bash
node nombre_del_script.js "magnet_link"
```
## Descripción del Código

### Importación de Bibliotecas

```javascript
import WebTorrent from 'webtorrent-hybrid';
import cliProgress from 'cli-progress';
import chalk from 'chalk';
import fs from 'fs';
```

Se importan las bibliotecas necesarias para el funcionamiento del script.

### Configuración del Cliente WebTorrent

```javascript
const client = new WebTorrent();
```

Se crea una instancia del cliente WebTorrent.

### Manejo del Enlace Magnet

```javascript
const magnetLink = process.argv[2];

if (!magnetLink) {
  console.error(chalk.red('Error: Debes proporcionar un enlace magnet como argumento.'));
  process.exit(1);
}
```
Se verifica si se proporciona un enlace magnet como argumento al ejecutar el script. Si no se proporciona, el script muestra un mensaje de error y termina.
### Configuración de la Barra de Progreso
```javascript
const progressBar = new cliProgress.SingleBar(
  {
    format: 'Descargando [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} archivos',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  },
  cliProgress.Presets.rect
);
```
Se configura la barra de progreso para visualizar el progreso de la descarga.
### Manejo del Torrent y Descarga
```javascript
const downloadTorrent = (torrent) => {
  // ... Código para mostrar información sobre el torrent

  const file = torrent.files[0];
  const filePath = `./downloads/${file.name}`;
  const writeStream = fs.createWriteStream(filePath);

  // ... Configuración y manejo de la descarga con la barra de progreso

  stream.on('end', () => {
    // ... Código al completar la descarga con éxito
  });

  stream.on('error', (error) => {
    // ... Código al encontrar un error en la descarga
  });
};

client.add(magnetLink, { path: './downloads' }, downloadTorrent);
```
Se define la función **downloadTorrent** para manejar la información del torrent y gestionar la descarga del archivo. La función configura un flujo de lectura y escritura para el archivo y muestra información sobre la descarga.
### Manejo de Errores y Advertencias
```javascript
client.on('error', (err) => {
  // ... Código para manejar errores en el cliente WebTorrent
});

client.on('warning', (err) => {
  // ... Código para manejar advertencias en el cliente WebTorrent
});
```
Se configuran manejadores de eventos para el cliente WebTorrent, que capturan errores y advertencias durante el proceso de descarga.

Este script proporciona una manera sencilla de descargar torrents desde la línea de comandos y puede ser personalizado según las necesidades específicas del usuario.