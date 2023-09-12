// import { Client } from '@notionhq/client'

// const DATABASE_ID = '39699e926a6e47d8a6617485d8b46e38'

// const notion = new Client({
//     auth: import.meta.env.NOTION_TOKEN
// })

// NOTION_TOKEN="secret_doUhA3ATP574RVDlI6KuwOrmlIApKFR0t4zz6H5RA2B"

// ARRAY DE STATS
const personajeList = [
    {
      nivel: 1,
      foto: './img/rebecca.jpg',
      nombre: 'Odrac',
      salud: 20,
      raza: 'Gay',
      habilidades: {
        fuerza: 2,
        destreza: 2,
        constitucion: 2,
        inteligencia: 2,
        carisma: 2,
      },
    },
    {
      nivel: 2,
      foto: 'https://images.ctfassets.net/swt2dsco9mfe/Ym9i1haRS4HsElvEa6SqS/604794ba06b9cef049fc141a4dc07513/dnd_home_lorecardv4.png?q=70&w=1342',
      nombre: 'Otro wey',
      salud: 20,
      raza: 'Elfo Mago',
      habilidades: {
        fuerza: 2,
        destreza: 2,
        constitucion: 2,
        inteligencia: 2,
        carisma: 2,
      },
    },
    {
      nivel: 4,
      foto: 'https://s1.eestatic.com/2017/08/16/actualidad/actualidad_239489274_129989410_1706x960.jpg',
      nombre: 'José Morales',
      salud: 20,
      raza: 'Elfo gay',
      habilidades: {
        fuerza: 2,
        destreza: 2,
        constitucion: 2,
        inteligencia: 2,
        carisma: 2,
      },
    },
    {
      nivel: 2,
      foto: 'https://cdn.mos.cms.futurecdn.net/Hv6uftXQZC4XRQx7QG33cF.jpg',
      nombre: 'Sco0by dooM69',
      salud: 20,
      raza: 'Elfo Mago',
      habilidades: {
        fuerza: 2,
        destreza: 2,
        constitucion: 2,
        inteligencia: 2,
        carisma: 2,
      },
    },
    // Más personajes...
  ];

const iconosHabilidades = {
    fuerza: '',
    destreza: '',
    constitucion: '',
    inteligencia: '',
    carisma: ''
};

// Array de locaciones
const locacionesImg = [
  'https://i.imgur.com/8zxPCVv.png',
  'https://i.imgur.com/jtLtkpK.png',
  'https://i.imgur.com/YW0s3V3.png',
  'https://i.imgur.com/oDWuqQu.png',
  'https://i.imgur.com/gSGVLD5.png',
  'https://i.imgur.com/YsF5OAU.png',
  'https://i.imgur.com/PgdSsBw.png',
  'https://i.imgur.com/Q0UQgmP.png'
];

// Variable para llevar un registro de la imagen actual
let locacionActual = 0;

// Obtener el elemento de imagen y el botones
const locacion = document.getElementById('imgLocacion');
const btnRetroceder = document.getElementById('retroceder');
const btnAvanzar = document.getElementById('avanzar');


//Función para retroceder
function retrocederImg() {
    // Verifica si hemos llegado al final del array de locaciones
    if(locacionActual > 0) {
        // Decrementa el índice y establece la fuente (src) de la imagen actual
        locacionActual--;
        locacion.style.opacity = 0;
        setTimeout(() => {
          locacion.src = locacionesImg[locacionActual];
          locacion.style.opacity = 1;
          actualizarIndicadores();
        }, 500);
    }
}

// Función para avanzar
function avanzarImg() {
  if (locacionActual < locacionesImg.length - 1) {
      locacionActual++;
      locacion.style.opacity = 0; // Establece la opacidad a 0 (imagen invisible)
      setTimeout(() => {
          locacion.src = locacionesImg[locacionActual];
          locacion.style.opacity = 1; // Establece la opacidad a 1 (imagen visible)
          actualizarIndicadores();
      }, 500); // Espera 500 ms antes de cambiar la imagen (ajusta el tiempo según desees)
  }
}

// Asigna las funciones a los eventos clic en los botones
btnRetroceder.addEventListener('click', retrocederImg);
btnAvanzar.addEventListener('click', avanzarImg);

// Muestra la primer imagen
locacion.src = locacionesImg[locacionActual];

// Indicadores
const indicadoresContenedor = document.querySelector('#indicadores');

// Crear indicadores automáticamente
locacionesImg.forEach((imagen, index) => {
  const indicador = document.createElement('div');
  indicador.classList.add('indicador');
  indicador.dataset.index = index;
  indicadoresContenedor.appendChild(indicador);
});

// Función para actualizar los indicadores
function actualizarIndicadores() {
  const indicadores = document.querySelectorAll('.indicador');
  indicadores.forEach((indicador, index) => {
    if(index === locacionActual) {
      indicador.classList.add('activo');
    } else {
      indicador.classList.remove('activo');
    }
  });
}

// Llama a la función para mostrar los indicadores iniciales
actualizarIndicadores();

//Obtener el contenedor donde se agregarán los personajes
const contenedorPersonajes = document.getElementById('contenedor-personajes');

// Iterar a través de la lista de personajes y crear elementos para cada uno
for (const personaje of personajeList) {
    const personajeDiv = document.createElement('div');
    personajeDiv.classList.add('personaje');

    // Elementos para la imagen del personaje
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img');

    const img = document.createElement('img');
    img.setAttribute('src', personaje.foto);
    img. setAttribute('alt', 'Imagen de personaje');

    imgDiv.appendChild(img);

    // Elementos del HUD del personaje
    const hudDiv = document.createElement('div');
    hudDiv.classList.add('personaje__hud');

    const contenedorHudDiv = document.createElement('div');
    contenedorHudDiv.classList.add('contenedor__hud');

    const nivelDiv = document.createElement('div');
    nivelDiv.classList.add('nivel');
    nivelDiv.innerHTML = `<p>${personaje.nivel}</p>`;

    const vidaContenedorDiv = document.createElement('div');
    vidaContenedorDiv.classList.add('vida__contenedor');

    const vidaSpan = document.createElement('span');
    vidaSpan.classList.add('vida');
    vidaSpan.textContent = personaje.salud;

    hudDiv.appendChild(contenedorHudDiv);
    contenedorHudDiv.appendChild(nivelDiv);
    contenedorHudDiv.appendChild(vidaContenedorDiv);
    vidaContenedorDiv.appendChild(vidaSpan);

    // Nombre del personaje
    const nombreDiv = document.createElement('div');
    nombreDiv.classList.add('nombre__personaje');

    const nombreH2 = document.createElement('h2');
    nombreH2.textContent = personaje.nombre;

    hudDiv.appendChild(nombreDiv);
    nombreDiv.appendChild(nombreH2);

    // Raza del personaje
    const razaH3 = document.createElement('h3');
    razaH3.textContent = personaje.raza;

    nombreDiv.appendChild(razaH3);

    // Elementos de Habilidades
    const habilidadesDiv = document.createElement('div');
    habilidadesDiv.classList.add('habilidades');

    // Iterar a través de la lista de habilidad y crear elementos para cada uno
    for(const habilidad in personaje.habilidades) {
        const columnaDiv = document.createElement('div');
        columnaDiv.id = habilidad;
        columnaDiv.classList.add('columna');

        const iconDiv = document.createElement('div');
        iconDiv.classList.add('icon');

        // Obtén el icono correspondiente de acuerdo a la habilidad
        iconDiv.textContent = iconosHabilidades[habilidad];

        const valorDiv = document.createElement('div');
        valorDiv.classList.add('valor');
        // valorDiv.textContent = personaje.habilidades[habilidad];
        valorDiv.innerHTML = `<p>${personaje.habilidades[habilidad]}</p>`;

        columnaDiv.appendChild(iconDiv);
        columnaDiv.appendChild(valorDiv);
        habilidadesDiv.appendChild(columnaDiv);
    }

    // Agregar todos los elementos al div del personaje
    personajeDiv.appendChild(imgDiv);
    personajeDiv.appendChild(hudDiv);
    personajeDiv.appendChild(habilidadesDiv);

    // Agregar el div del personaje al contenedor principal
    contenedorPersonajes.appendChild(personajeDiv);
}