document.addEventListener('DOMContentLoaded', function() {

    const campos = {
        email: '',
        cc: '',
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
    const spinner = document.querySelector('#spinner');
    const input_cc = document.querySelector('#cc');

    // Asingar Eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    input_cc.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        // Reiniciar el objeto
        resetFormulario();
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

        // Valida que el campo no este vacio y que no sea el campo 'cc' que no es obligatorio.
        if (e.target.value.trim() === '' && e.target.id !== 'cc') {
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

        if (e.target.id === 'cc' && !validarEmail(e.target.value) && e.target.value != '') {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            campos[e.target.name] = '';
            return;
        } else{
            eliminarAlerta(e.target.parentElement);
        }
        
        eliminarAlerta(e.target.parentElement);

        // Asigar los valores
        campos[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto de campos. 
        comprobarCampos(e);
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
    function comprobarCampos(e) {

        // console.log(Object.keys(campos));
        if (Object.keys(campos).filter(propiedadCampo => propiedadCampo != 'cc').map(propiedadCampo => campos[propiedadCampo]).includes('')) { // Esto excluye a el campo cc y despues valida si los demas estan vacios. 
                botom.disabled = true; 
                botom.classList.add('opacity-50');
            
        } else { // Si no tiene. 
            botom.classList.remove('opacity-50');
            botom.disabled = false; 
        }
    }

    function resetFormulario() {
        campos.email = '';
        campos.asunto = '';
        campos.mensaje = '';
        campos.cc = '';
        
        formulario.reset();
        comprobarCampos();
        // Elimina todas las alertas del formulario cuando se reset.
        const alerta = document.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

   
 
});


