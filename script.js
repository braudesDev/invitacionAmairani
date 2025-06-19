AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

// Función para crear confeti aleatorio
function crearConfeti() {
  const confetiCantidad = 20; // Puedes ajustar el número de confetis
  const contenedor = document.body; // Coloca el confeti en el body o en un contenedor específico

  for (let i = 0; i < confetiCantidad; i++) {
    const confeti = document.createElement("div");
    confeti.classList.add("confeti");

    // Establece posiciones y tamaños aleatorios
    confeti.style.left = `${Math.random() * 100}vw`; // 100% del ancho de la ventana
    confeti.style.animationDuration = `${Math.random() * 3 + 2}s`; // Duración aleatoria
    confeti.style.animationDelay = `${Math.random() * 5}s`; // Retraso aleatorio

    contenedor.appendChild(confeti);
  }
}

// Llama a la función para crear confeti al cargar la página
window.onload = function () {
  crearConfeti();
};

// ======================================
// Reproductor de musica
// ======================================
document.addEventListener("DOMContentLoaded", function () {
  // Lista de canciones
  const canciones = [
    "https://res.cloudinary.com/drsyb53ae/video/upload/v1740983843/musica%20amairani/l4otlu6b7n1z2cof50fs.mp3",
    "https://res.cloudinary.com/drsyb53ae/video/upload/v1740983843/musica%20amairani/fjkxoy95ykv4odccuujn.mp3",
    "https://res.cloudinary.com/drsyb53ae/video/upload/v1740983843/musica%20amairani/iyqi5iktgi0jisxdwnno.mp3",
    "https://res.cloudinary.com/drsyb53ae/video/upload/v1740983842/musica%20amairani/fxez6gm3ckitbondpgqm.mp3",
    "https://res.cloudinary.com/drsyb53ae/video/upload/v1740983843/musica%20amairani/ribemt7rsamzxabgvfux.mp3",
  ];

  let indiceActual = 0;
  const audio = document.getElementById("musica");
  const botonReproducir = document.querySelector(".boton-reproducir");
  const botonSiguiente = document.querySelector(".boton-siguiente");

  // Verificar si los elementos existen
  if (!audio || !botonReproducir || !botonSiguiente) {
    console.error(
      "❌ Error: No se encontró uno de los elementos del reproductor."
    );
    return;
  }

  // Función para reproducir/pausar
  function playAudio() {
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          botonReproducir.textContent = "Pausar"; // Cambia el texto del botón a "Pausar"
        })
        .catch((error) => console.error("❌ Error al reproducir:", error));
    } else {
      audio.pause();
      botonReproducir.textContent = "Reproducir"; // Cambia el texto del botón a "Reproducir"
    }
  }

  // Función para cambiar de canción
  function nextSong() {
    indiceActual = (indiceActual + 1) % canciones.length; // Cambia de canción al siguiente en la lista
    audio.src = canciones[indiceActual]; // Actualiza la fuente del audio
    audio.load(); // Recarga el audio
    audio
      .play() // Reproduce la nueva canción
      .then(() => {
        botonReproducir.textContent = "Pausar"; // Cambia el texto del botón a "Pausar"
      })
      .catch((error) =>
        console.error("❌ Error al cambiar de canción:", error)
      );
  }

  // Función para ajustar el volumen - Haciendo accesible globalmente
  window.setVolumen = function (valor) {
    const audio = document.getElementById("musica");
    if (audio) {
      audio.volume = valor;
    }
  };

  // Cambiar automáticamente a la siguiente canción cuando termina
  audio.addEventListener("ended", function () {
    console.log("La canción terminó, cambiando a la siguiente...");
    nextSong(); // Llamar a la función nextSong para cambiar la canción
  });

  // Asignar evento al botón de reproducción
  botonReproducir.addEventListener("click", playAudio);
  // Asignar evento al botón de siguiente canción
  botonSiguiente.addEventListener("click", nextSong);
});

// ======================================
// Contador para la Fiesta
// ======================================

// Fecha de la fiesta
const fechaFiesta = new Date("2025-07-12T15:00:00").getTime();

// Obtener el contenedor de la sección "Subir Fotos"
const sectionSubirFotos = document.getElementById("subir-fotos"); // Asegúrate de que la sección tiene el ID "subir-fotos"
sectionSubirFotos.style.display = "none"; // Iniciar oculta

// Actualiza la cuenta regresiva cada segundo
const intervalo = setInterval(function () {
  // Obtener la fecha y hora actual
  const ahora = new Date().getTime();

  // Calcular la diferencia entre la fecha de la fiesta y la fecha actual
  const distancia = fechaFiesta - ahora;

  // Cálculos de días, horas, minutos y segundos
  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  // Mostrar los resultados en la pantalla
  document.getElementById("dias").innerHTML = dias + " <span>Días</span>";
  document.getElementById("horas").innerHTML = horas + " <span>Horas</span>";
  document.getElementById("minutos").innerHTML =
    minutos + " <span>Minutos</span>";
  document.getElementById("segundos").innerHTML =
    segundos + " <span>Segundos</span>";

  // Si la cuenta regresiva llega a cero, mostrar mensaje y la sección de fotos
  if (distancia < 0) {
    clearInterval(intervalo);
    document.getElementById("contador").innerHTML = "¡Es el gran día!";

    // Mostrar la sección de subir fotos
    sectionSubirFotos.style.display = "block"; // Mostrar cuando llega la fecha
  }
}, 1000);

// ======================================
// Modal para visualizar imágenes grandes
// ======================================

// Obtener los elementos del DOM
const modal = document.querySelector(".modal");
const modalImage = document.getElementById("imagenModal");
const images = document.querySelectorAll(".contenedor-galeria img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 0; // Índice de la imagen actual

// Función para abrir el modal con animación
const abrirModal = (imgSrc, index) => {
  modalImage.src = imgSrc; // Asignar la imagen seleccionada
  modal.style.display = "flex"; // Asegurar que el modal esté visible
  currentIndex = index; // Actualizar el índice de la imagen actual
  actualizarBotonesNav(); // Actualizar visibilidad de botones de navegación
  setTimeout(() => modal.classList.add("show"), 10); // Agregar animación de apertura
};

// Función para cerrar el modal con animación
const cerrarModal = () => {
  modal.classList.remove("show"); // Iniciar animación de cierre
  setTimeout(() => {
    modal.style.display = "none"; // Ocultar completamente después de la animación
  }, 300); // Tiempo igual a la transición en CSS
};

// Evento para abrir el modal cuando se hace clic en una imagen
images.forEach((img, index) => {
  img.addEventListener("click", () => abrirModal(img.src, index));
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length; // Incrementar el índice y volver al inicio si es necesario
  modalImage.src = images[currentIndex].src; // Cambiar la imagen del modal
  actualizarBotonesNav(); // Actualizar visibilidad de botones de navegación
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length; // Incrementar el índice y volver al inicio si es necesario
  modalImage.src = images[currentIndex].src; // Cambiar la imagen del modal
  actualizarBotonesNav(); // Actualizar visibilidad de botones de navegación
});

// Evento para cerrar el modal al hacer clic en el botón de cierre
closeBtn.addEventListener("click", cerrarModal);

//Funcion para actualizar la visibilidad de los botones de navegación
const actualizarBotonesNav = () => {
  if (currentIndex === 0) {
    prevBtn.style.display = "none"; // Ocultar botón de "Anterior" si es la primera imagen
  } else {
    prevBtn.style.display = "block"; // Mostrar botón de "Anterior" si no es la primera imagen
  }

  if (currentIndex === images.length - 1) {
    nextBtn.style.display = "none"; // Ocultar botón de "Siguiente" si es la última imagen
  } else {
    nextBtn.style.display = "block"; // Mostrar botón de "Siguiente" si no es la última imagen
  }
};

// Evento para cerrar el modal al hacer clic fuera de la imagen
modal.addEventListener("click", (e) => {
  if (e.target === modal) cerrarModal();
});

// ======================================
// Reventar globo y lanzar confeti
// ======================================
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.3.2";
document.body.appendChild(script);

script.onload = function () {
  const globo = document.getElementById("globo");
  const eventLocations = document.getElementById("event-locations");
  const titulo = document.querySelector("#fiesta-infantil h1");

  globo.addEventListener("click", function () {
    //Reproducir el sonido del globo explotando
    var sonido = document.getElementById("sonido-globo");
    sonido.play();

    // Agregar clase para la animación de reventar
    globo.classList.add("reventar");

    // Lanzar confeti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Ocultar el globo y mostrar la información de la fiesta después de la animación
    setTimeout(() => {
      globo.style.display = "none";
      eventLocations.style.display = "block";
      titulo.style.display = "none"; // Opcional: ocultar el título
    }, 500); // Ajusta el tiempo para que coincida con la duración de la animación
  });
};

// Girar tarjeta
function girarTarjeta(card) {
  const inner = card.querySelector(".location-inner");
  inner.style.transform =
    inner.style.transform === "rotateY(180deg)"
      ? "rotateY(0deg)"
      : "rotateY(180deg)";
}

// ======================================
// Lógica para subir fotos a Google Drive
// ======================================

// Obtener referencias a los elementos del DOM
const fileInput = document.getElementById("fileInput");
const statusMessage = document.getElementById("statusMessage"); // Usamos "statusMessage"
const fileList = document.getElementById("fileList");

// Mostrar la lista de archivos seleccionados
fileInput.addEventListener("change", () => {
  fileList.innerHTML = ""; // Limpiar la lista anterior
  if (fileInput.files.length > 0) {
    // Mostrar los nombres de los archivos seleccionados
    Array.from(fileInput.files).forEach((file) => {
      fileList.innerHTML += `<p>${file.name}</p>`;
    });
  } else {
    fileList.textContent = "No se han seleccionado archivos.";
  }
});

// Manejar el clic en el botón de subir
document
  .getElementById("uploadButton")
  .addEventListener("click", async (event) => {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    // Validar si se seleccionaron archivos
    if (fileInput.files.length === 0) {
      statusMessage.textContent = "Por favor, selecciona al menos un archivo."; // Usamos "statusMessage"
      statusMessage.style.display = "block"; // Mostrar el mensaje de error
      return;
    }

    // Validar el número de archivos seleccionados
    if (fileInput.files.length > 5) {
      statusMessage.textContent =
        "¡Recuerda que solo puedes subir un máximo de 5 archivos a la vez! :)"; // Usamos "statusMessage"
      statusMessage.style.display = "block"; // Mostrar el mensaje de error
      return;
    }

    // Validar si el tamaño total de los archivos es mayor al límite
    const totalSize = Array.from(fileInput.files).reduce(
      (total, file) => total + file.size,
      0
    );
    const maxSize = 200 * 1024 * 1024; // 200 MB en bytes
    if (totalSize > maxSize) {
      statusMessage.textContent =
        "¡El tamaño total de los archivos no debe superar los 50 MB!"; // Usamos "statusMessage"
      statusMessage.style.display = "block"; // Mostrar el mensaje de error
      return;
    }

    // Preparar la subida de archivos
    const formData = new FormData();
    Array.from(fileInput.files).forEach((file) => {
      formData.append("files", file);
    });

    // Mostrar el loader personalizado
    statusMessage.innerHTML = `
        <div class="status-container">
            <div class="loader"></div>
            <p class="subiendo-archivos">Subiendo archivos...</p>
        </div>
    `;
    statusMessage.style.display = "block"; // Asegurar que el loader sea visible

    try {
      // Llamar al endpoint de subida sin necesidad de token
      const response = await fetch("/upload-multiple", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        statusMessage.innerHTML = `¡${result.uploadedFiles.length} archivo(s) subido(s) exitosamente!`; // Usamos "statusMessage"
      } else {
        throw new Error(result.error || "Error en el servidor");
      }
    } catch (error) {
      statusMessage.innerHTML = `Error: ${error.message}`; // Usamos "statusMessage"
    } finally {
      // Limpiar la lista de archivos seleccionados
      fileList.innerHTML = "";
      // Asegurar que el mensaje final sea visible
      statusMessage.style.display = "block"; // Usamos "statusMessage"
    }
  });

// ======================================
// Lógica para confirmacion de asistencia
// ======================================

// Selecciona el botón de confirmar (el enlace)
const botonConfirmar = document.querySelector(".boton-confirmar");

botonConfirmar.addEventListener("click", function (event) {
  // Si deseas ver la animación antes de redirigir, descomenta las dos líneas siguientes:
  event.preventDefault();
  setTimeout(() => window.open(botonConfirmar.href, "_blank"), 1500);

  // Lanza la animación de confeti
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });
});
