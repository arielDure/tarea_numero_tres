
class Tarea {
    constructor(id, titulo, completada = false) {
        this.id = id;
        this.titulo = titulo;
        this.completada = completada;
    }

    toggleEstado() {
        this.completada = !this.completada;
    }
}

class GestorTareas {
    constructor() {
        this.tareas = [];
        this.idCounter = 1;
    }

    agregarTarea(titulo) {
        const tarea = new Tarea(this.idCounter++, titulo);
        this.tareas.push(tarea);
    }

    listarTareas() {
        console.log("Lista de tareas:");
        this.tareas.forEach(t => {
            console.log('ID: ' +t.id +' '+ t.titulo +' '+ 'Completada: '+ t.completada);
        });
    }

    buscarPorTitulo(titulo) {
        return this.tareas.find(t => t.titulo.toLowerCase() === titulo.toLowerCase());
    }

    listarCompletadas() {
        return this.tareas.filter(t => t.completada);
    }
}

//Tareas simuladas
function cargarTareas() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const tareasIniciales = [
                new Tarea(1, "Estudiar JavaScript", true),
                new Tarea(2, "Hacer ejercicio", false),
                new Tarea(3, "Leer un libro", true)
            ];
            resolve(tareasIniciales);
        }, 2000);
    });
}


async function main() {
    const gestor = new GestorTareas();

    console.log(" Cargando tareas...");
    const tareasIniciales = await cargarTareas();
    gestor.tareas = tareasIniciales;
    gestor.idCounter = tareasIniciales.length + 1;

    console.log("Tareas cargadas correctamente");
    gestor.listarTareas();

    //Agregar nueva tarea
    gestor.agregarTarea("Aprender Node.js");
    console.log("\n Lista después de agregar nueva tarea:");
    gestor.listarTareas();

    
    console.log("\nTareas completadas:");
    const completadas = gestor.listarCompletadas();
    completadas.forEach(t => console.log(t.titulo));

    
    console.log("\nTítulos de todas las tareas:");
    const titulos = gestor.tareas.map(t => t.titulo);
    console.log(titulos);

    
    function cargarUsuarios() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(["Usuario1", "Usuario2", "Usuario3"]);
            }, 1500);
        });
    }

    console.log("\nCargando tareas y usuarios en paralelo...");
    const [tareas, usuarios] = await Promise.all([cargarTareas(), cargarUsuarios()]);
    console.log("Tareas cargadas:", tareas.map(t => t.titulo));
    console.log("Usuarios cargados:", usuarios);
}

main();