document.addEventListener('DOMContentLoaded', function() {

    // Seleccionar los elementos de la Interfaz.

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    // Asingar Eventos

    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    // Funciones

    function validar(e) {
        // console.log(e.target.parentElement.nextElementSibling);
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            return; 
        }
        
        eliminarAlerta(e.target.parentElement);
    }

    function mostrarAlerta(mensaje, referencia) {
        
        eliminarAlerta(referencia);
        
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        // Inyectar el error al formulario
        referencia.appendChild(error);    
    }

    function eliminarAlerta(referencia) {
        // Comprobar si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');

        if (alerta) {
            alerta.remove();
        }
        
    }

});


