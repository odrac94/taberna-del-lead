import { Client } from '@notionhq/client'

NOTION_TOKEN="secret_doUhA3ATP574RVDlI6KuwOrmlIApKFR0t4zz6H5RA2B"

const DATABASE_ID = '39699e926a6e47d8a6617485d8b46e38'

const notion = new Client({
    auth: import.meta.env.NOTION_TOKEN
})

export const getStats = async ({ filterBy } = {}) => {
    const query = { database_id: DATABASE_ID}
}

if(filterBy) {
    query.filter = {
        property: 'nivel',
        rich_text: {
            equals: filterBy;
        }
    }
}

const { results } = await notion.databases.query(query);

return results.map(page => {
    const { properties } = page
    const { nivel, foto, personaje, salud, raza, clase, fuerza, destreza, constitucion, inteligencia, carisma,} = properties;

    return {
        lvl: nivel.rich_text[0].plain_text,
        foto: foto.rich_text[0].plain_text,
        personaje: personaje.rich_text[0].plain_text,
        salud: salud.rich_text[0].plain_text,
        raza: raza.rich_text[0].plain_text,
        clase: clase.rich_text[0].plain_text,
        fuerza: fuerza.rich_text[0].plain_text,
        destreza: destreza.rich_text[0].plain_text,
        constitucion: constitucion.rich_text[0].plain_text,
        inteligencia: inteligencia.rich_text[0].plain_text,
        carisma: carisma.rich_text[0].plain_text
    }
});