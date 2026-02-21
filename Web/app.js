
// MÓDULO DE DATOS

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// ==========================
// GUARDAR TAREAS


function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// ==========================
// Crear


function crearTarea(texto) {
    const nuevaTarea = {
        id: Date.now(),
        texto: texto,
        completada: false
    };

    tareas.push(nuevaTarea);
    guardarTareas();
    mostrarTareas();
}

// ==========================
// Leer READ


function mostrarTareas() {

    const lista = document.getElementById("listaTarea");
    lista.innerHTML = "";

    tareas.forEach(tarea => {

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const span = document.createElement("span");
        span.textContent = tarea.texto;

        if (tarea.completada) {
            span.classList.add("completo");
        }

        // UPDATE
        span.onclick = () => actualizarTarea(tarea.id);

        // DELETE
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.onclick = () => eliminarTarea(tarea.id);

        li.appendChild(span);
        li.appendChild(btnEliminar);

        lista.appendChild(li);
    });
}

// ==========================
// UPDATE


function actualizarTarea(id) {
    tareas = tareas.map(t =>
        t.id === id ? { ...t, completada: !t.completada } : t
    );

    guardarTareas();
    mostrarTareas();
}

// ==========================
// DELETE


function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    guardarTareas();
    mostrarTareas();
}

// ==========================
// EVENTO BOTÓN AGREGAR


document.getElementById("addBtn").addEventListener("click", () => {

    const input = document.getElementById("entrada");
    const texto = input.value.trim();

    if (texto !== "") {
        crearTarea(texto);
        input.value = "";
    }

});

// Mostrar tareas al iniciar
mostrarTareas();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado'));
}