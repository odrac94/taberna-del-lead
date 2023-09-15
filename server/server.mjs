// Importa los módulos necesarios
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const notion = new Client({
  auth: "secret_ajE0tvU2FCtCS5vUUcJ8DLWBo1j9PTdluk6zd5pUPgK"
});

const resources = await notion.databases.query({
  databe_id: "39699e926a6e47d8a6617485d8b46e38",
})

// Declarar las variables de datos
const personajeList = [];
const locacionesImg = [];

// Crea una instancia de Express
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Ruta para la página de inicio
app.get('/', (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  res.sendFile(__dirname + '/public/index.html');
});

// Define la ruta para obtener datos desde Notion
app.get('/notion-data', async (req, res) => {
  try {
    // Realiza una solicitud a la API de Notion para obtener los datos de tu base de datos
    const response = await fetch('https://api.notion.com/v1/databases/39699e926a6e47d8a6617485d8b46e38/query', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2023-08-01',
      },
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener la respuesta de Notion.');
    }

    const data = await response.json();
    
    // Actualiza tus arrays personajeList y locacionesImg con los datos de Notion
    personajeList[0] = data.results; // Asume que los datos de Notion reemplazarán la primera lista de personajes
    // Actualiza locacionesImg de manera similar si obtuviste datos para eso

    // Llama a la función para actualizar la interfaz
    actualizarEquipo();

    res.json(data); // Envía los datos como respuesta (opcional)
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener los datos de Notion' });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
