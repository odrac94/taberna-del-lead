const path = require('path');

module.exports = {
  entry: './main.js', // Archivo principal de tu aplicación
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida para los archivos empaquetados
  },
};
