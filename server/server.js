const express = require('express');
const { Client } = require('@notionhq/client');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = 'your-database-id'; // Reemplaza con tu ID de base de datos

const notion = new Client({ auth: NOTION_TOKEN });

app.get('/obtener-personajes', async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
    });

    const resultados = response.results;
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos de Notion' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
