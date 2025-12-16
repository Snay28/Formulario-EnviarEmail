document.addEventListener('DOMContentLoaded', function() {

    const campos = {
        email: '',
        asunto: '', 
        mensaje: ''
    }

    // Seleccionar los elementos de la Interfaz.

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const botom = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');

    // Asingar Eventos

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();

        // Reiniciar el objeto
        campos.email = ''
        campos.asunto = ''
        campos.mensaje = ''
        
        formulario.reset();
        comprobarCampos();
    })

    // Funciones
    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.remove('hidden');
        spinner.classList.add('flex');

        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            // Reinicio del objeto 'Campos'.
            resetFormulario();

            // Alerta

            const alertaExito = document.createElement('P');
            alertaExito.textContent = 'Mensaje enviado correctamete';
            alertaExito.classList.add('bg-green-500', 'p-2', 'text-center', 'text-whith', 'raunded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.classList.add('hidden');
            }, 3000);
        }, 3000);
    }

    function validar(e) {
        // console.log(e.target.parentElement.nextElementSibling);
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            campos[e.target.name] = ''; // Reinicia valor en objeto. 
            comprobarCampos();
            return; 
        }
        // Llamar validarEmail, mostrar error si es false, solo para campo email. 
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            campos[e.target.name] = ''; // Reinicia valor en objeto. 
            comprobarCampos();
            return;
        }
        
        eliminarAlerta(e.target.parentElement);

        // Asigar los valores
        campos[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto de campos. 
        comprobarCampos();
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

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
    }

    // Habilitar o Desactivar botom de enviar. 
    function comprobarCampos() {
        if (Object.values(campos).includes('')) { // Si tiene valores vacios. 
            botom.disabled = true; 
            botom.classList.add('opacity-50');
        } else { // Si no tiene. 
            botom.classList.remove('opacity-50');
            botom.disabled = false; 
        }
    }
 
});


