//Variables
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje =document.getElementById('mensaje');
const buttomEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetButton = document.getElementById('resetBtn'); 



//event listener

eventListeners();

function eventListeners(){
    // Inicio de la aplicacion y deshabilitar submit
    document.addEventListener('DOMContentLoaded', inicioApp);

    //Campos del formulario
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    //Boton de enviar en el submit
    formularioEnviar.addEventListener('submit', enviarEmail);

    //Boton de reset
    resetButton.addEventListener('click', resetFormulario);
}


//Funciones

function inicioApp(){
    //deshabilitar el envio.

    buttomEnviar.disabled = true;
}

// Valida que el campo tenga algo escrito

function validarCampo(){
    
    //Se valida la longitud del texto y que no este vacio
    validarLongitud(this);

    //validar unicamente el email

    if(this.type === 'email'){
        validarEmail(this);
    }

    let errores = document.querySelectorAll('.error');

    if(email.value !== '' && asunto.value !== '' && mensaje.value !== ''){
        if(errores.length === 0){
            buttomEnviar.disabled = false;
        }else{
            buttomEnviar.disabled = true; 
        }
    }else{
        buttomEnviar.disabled = true; 
    }
}

//Cuando se envia el correo
function enviarEmail(e){

    //Spinner al presionar enviar
    const SpinnerGif = document.querySelector('#spinner');
    SpinnerGif.style.display = 'block';

    //Gif que envia email
    const enviado = document.createElement('img');

    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';

    //olcutar spinner y mostrar gif de enviado
    setTimeout(function(){
        SpinnerGif.style.display = 'none';

        document.querySelector('#loaders').appendChild(enviado);

        setTimeout(function(){
            enviado.remove();
            formularioEnviar.reset();
            buttomEnviar.disabled = true;
        },5000);
    },3000);

    e.preventDefault();
}

//Resetea el formulario
function resetFormulario(e){

    formularioEnviar.reset();

    e.preventDefault();
}

// Verifica la longitud del texto en los campos
function validarLongitud(campo){
    
    if(campo.value.length > 0){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
} 

function validarEmail(campo){
    const mensaje = campo.value;
    
    if(mensaje.indexOf('@') !== -1){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    }else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}