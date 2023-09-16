let personajeList = []; // Inicialmente vacío, se llenará con los datos del servidor

// Función para realizar la solicitud al servidor y obtener datos de Notion
async function obtenerDatosDeNotion() {
  console.log('Solicitud a Notion en proceso...');
  try {
    const response = await fetch('/notion-data'); // Ruta para obtener datos del servidor
    if (!response.ok) {
      throw new Error('No se pudo obtener la respuesta del servidor.');
    }
    const data = await response.json();

    // Asegúrate de que data sea un array antes de actualizar personajeList
    if (Array.isArray(data)) {
      personajeList = data;

      // Llama a la función para actualizar la interfaz con los nuevos datos
      actualizarEquipo();
    } else {
      console.error('Los datos obtenidos del servidor no son un array válido:', data);
    }
  } catch (error) {
    console.error('Error al obtener datos de Notion:', error);
  }
}

// Llamar a la función para obtener datos de Notion cuando sea necesario
obtenerDatosDeNotion();


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

// SLIDER
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
      }, 200);
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
    }, 200); // Espera 500 ms antes de cambiar la imagen (ajusta el tiempo según desees)
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


// BOTONES PARA CAMBIAR EQUIPO
let equipoFijado = 0;

const btnEquipoUno = document.querySelector('#equipo-1');
const btnEquipoDos = document.querySelector('#equipo-2');

btnEquipoUno.addEventListener('click', cambiarEquipoUno);
btnEquipoDos.addEventListener('click', cambiarEquipoDos);

function cambiarEquipoUno() {
  equipoFijado = 0;
  actualizarEquipo();
}
function cambiarEquipoDos() {
  equipoFijado = 1;
  actualizarEquipo();
}

//Obtener el contenedor donde se agregarán los personajes
const contenedorPersonajes = document.getElementById('contenedor-personajes');

// Función para actualizar el equipo en la interfaz
function actualizarEquipo() {
  // Borrar los personajes existentes en la interfaz
  contenedorPersonajes.innerHTML = '';

  // Obtiene el equipo actual
  const equipoActual = personajeList[equipoFijado];

  // Verificar que equipoActual sea un array antes de intetar iterar
  if (Array.isArray(equipoActual)) {
   // AGREGAR CONTENIDO DE LOS ARRAYS AL HTML
  
  // Iterar a través de la lista de personajes y crear elementos para cada uno
  for (const personaje of equipoActual) {
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
    vidaSpan.textContent = `${personaje.salud}/20`;

    // Calcular el ancho de la barra de vida
    const valorMaximoVida = 20;
    const anchoBarra = (personaje.salud / valorMaximoVida) * 100 + '%';
    vidaSpan.style.width = anchoBarra;

    // Agregar elementos a sus padres
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
} else {
  // Si equipoActual no es un array, muestra un mensaje de error o realiza alguna otra acción apropiada.
  console.error('El equipo actual no es un array válido:', equipoActual);
} 
};
actualizarEquipo();

// Función para realizar la solicitud al servidor y obtener datos de Notion
async function obtenerDatosDeNotion() {
  console.log('Solicitud a Notion en proceso...')
  try {
    const response = await fetch('/notion-data'); // Ruta para obtener datos del servidor
    if (!response.ok) {
      throw new Error('No se pudo obtener la respuesta del servidor.');
    }
    const data = await response.json();

    // Actualiza personajeList con los datos recibidos
    personajeList = data;

    // Llama a la función para actualizar la interfaz con los nuevos datos
    actualizarEquipo();
  } catch (error) {
    console.error('Error al obtener datos de Notion:', error);
  }
}

// Llamar a la función para obtener datos de Notion cuando sea necesario
obtenerDatosDeNotion();