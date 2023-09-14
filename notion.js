require('dotenv').config();

const { Client } = require('@notionhq/client'); // Usar 'require' en lugar de 'import'

const DATABASE_ID = '39699e926a6e47d8a6617485d8b46e38';

const notion = new Client({
    auth: process.env.NOTION_TOKEN // Usar 'process.env' en lugar de 'import.meta.env'
});

const obtenerPersonaje = async ({ filterBy } = {}) => {
    const query = { database_id: DATABASE_ID };

    if (filterBy) {
        query.filter = {
            property: 'personaje',
            rich_text: {
                equals: filterBy
            }
        };
    }

    try {
        const { results } = await notion.databases.query(query);
        console.log(results);
    } catch (error) {
        console.error(error);
    }
};

obtenerPersonaje();