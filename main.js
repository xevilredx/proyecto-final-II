alert(`Para simular que insertaste tu tarjeta haz click a cualquier parte de la ventana
    Contraseñas Aceptadas:
    - Eduardo:  1234
    - Juan?:    4321
    - Root:     0000
    - ElÑablo:  6666 (por alguna razón)`)

console.log("Hackers, no vean la consola, que he dejado todo aqui :v")
// ---------- VARIABLES
let usuarios = [    // Pensaaba usar el resto de campos, pero recorde que una vez pones la targeta solo te pide el PIN :/
    {
        "usr_name" : "root",
        "password" : "0000",
        "dni" : "00000000",
        "saldo" : 999999999,
        "rol" : "admin"
    },
    {
        "usr_name" : "eduardo",
        "password" : "1234",
        "dni" : "71799999",
        "saldo" : 500,
        "rol" : "cliente"
    },
    {
        "usr_name" : "juan",
        "password" : "4321",
        "dni" : "12345678",
        "saldo" : 800,
        "rol" : "cliente"
    },
    {
        "usr_name" : "diabluwu",
        "password" : "6666",
        "dni" : "66666666",
        "saldo" : 66666,
        "rol" : "cliente"
    },
]

let usuarioActual;

//const submitUsr = document.querySelector(".usuario")
const submitPass = document.getElementById("contraseña");

const plogin = document.querySelector(".sec-login");
const pmenu = document.querySelector(".sec-menu");
const psaldo = document.querySelector(".sec-consSaldo");
const pmonto = document.querySelector(".sec-ingMonto");
const pretirar = document.querySelector(".sec-retMonto");
const bienvenido = document.querySelector(".sec-bienvenido");
const perror = document.querySelector(".sec-error");
const pretirarEspecifico = document.querySelector(".sec-monEspecif")
const nomUsuario = document.querySelectorAll(".nomUsuario"); //Con esto puedo seleccionar a todos los que tienen nomUsuario

// ---------- LISTENERS
submitPass.addEventListener("input", getPass);
bienvenido.addEventListener("click", insertTarjeta);

// ---------- FUNCIONES
function insertTarjeta(){
    cargarPagina(bienvenido, plogin);
    //---------------
        mostrarCarga();
        setTimeout(() => {
            ocultarCarga();
        }, 800);
    //---------------
}

function getPass(event){
    if(event.target.value.length >= 4){
        console.log(event.target.value);
        return validarUsuario(event.target.value);
    }
}

function validarUsuario(passw){ // Aquí debia validar tanto el usuario como el password, pero como es con tarjeta solo validare el password (Osea el PIN)
    usuarios.forEach((usuario) => {
        if(passw === usuario.password){
            return successLogin(usuario);
        }
    })
}

function successLogin(usuario){
    console.log("preparando logeo: " + usuario.usr_name)
    usuarioActual = usuario;
    saludarUsuario();
    cargarPagina(plogin, pmenu);
}

function cargarPagina(pActual, pNueva){
    console.log("cargando pagina");
    pActual.style.display = "none";
    pNueva.style.display = "block";
}

function saludarUsuario(){
    console.log("saludar: "+usuarioActual.usr_name);
    nomUsuario.forEach((pagina) =>{
        pagina.textContent = usuarioActual.usr_name;
    })
    
}

// ---------------------------------------------------------------------------------------MENU
// ---------- VARIABLES
const ingresMonto = document.querySelector(".box5");
const consulSaldo = document.querySelector(".box4");
const retirMonto = document.querySelector(".box6");
// ---------- LISTENERS
ingresMonto.addEventListener("click", cargarIngresarMonto);
consulSaldo.addEventListener("click", cargarConsultarSaldo);
retirMonto.addEventListener("click", cargarRetirarMonto);
// ---------- FUNCIONES
function cargarConsultarSaldo(){
    console.log("Se carga consultar saldo")
    cargarPagina(pmenu, psaldo);
    cargarSaldoActual();
}

function cargarIngresarMonto(){
    console.log("Se carga Ingresar Monto")
    cargarPagina(pmenu, pmonto);
}

function cargarRetirarMonto(){
    console.log("Se carga retirar monto")
    cargarPagina(pmenu, pretirar);
}

// --------------------------------------------------------------------------- CONSULTAR SALDO
// ---------- VARIABLES
const saldoAct = document.getElementById("saldoActual");
const volverMenuSM = document.getElementById("volverMenuSM");
// ---------- LISTENERS
volverMenuSM.addEventListener("click", regresarMenuSM);
// ---------- FUNCIONES
function regresarMenuSM(){
    cargarPagina(psaldo, pmenu);
}

function cargarSaldoActual(){
    saldoAct.textContent = usuarioActual.saldo;
}

// -----------------------------------------------------------------------------INGRESAR MONTO
const inputMonto = document.querySelector(".inputMonto");
const bIngrsarMonto = document.getElementById("submitMonto");
const volverMenuIM = document.getElementById("volverMenuIM");

bIngrsarMonto.addEventListener("click", sumarMonto);
volverMenuIM.addEventListener("click", regresarMenuIM)


function sumarMonto(event){
    event.preventDefault();
        usuarioActual.saldo = usuarioActual.saldo + Number(inputMonto.value);
        console.log("Nuevo saldo: " + usuarioActual.saldo);
        actualizarUsuario();
        inputMonto.value="";
        cargarSaldoActual();
        cargarPagina(pmonto, psaldo);
        //---------------
        mostrarCarga();
        setTimeout(() => {
            ocultarCarga();
        }, 800);
        //---------------
}

function regresarMenuIM(){
    cargarPagina(pmonto, pmenu);
}

function actualizarUsuario(){ // Aquí pondria mas opciones a parte de actualizar saldo, pero que yo sepa no se puede actualizar nada más desde un cajero
    usuarios.forEach((usuario, index) => {  // Con este "index" puedo seleccionar el elememento específico del arreglo, asi que no necesito un for(){} para esto
        if(usuario.dni === usuarioActual.dni){
            usuario.saldo[index] = usuarioActual.saldo;
        }
        //console.log(""+usuarios[1].usr_name+" "+usuarios[1].saldo);
    })
}

// -----------------------------------------------------------------------------RETIRAR MONTO
const btnRetirar = document.querySelectorAll(".btnRetirar");
const btnRetirarEspecifico = document.querySelector(".btnRetirarEspecifico")
const bRetirarMonto = document.getElementById("submitRetiro");
const volverMenuRM = document.getElementById("volverMenuRM");
const inputRetiro = document.querySelector(".inputRetiro");
const volverMenuEspM = document.getElementById("volverMenuEspM");

btnRetirar.forEach((boton) => {
    boton.addEventListener("click", retirarDinero);
})
btnRetirarEspecifico.addEventListener("click", retirarMontoEspecifico)
volverMenuRM.addEventListener("click", regresarMenuRM);
bRetirarMonto.addEventListener("click", procesarRetiro);
volverMenuEspM.addEventListener("click", regresarMenuEspM);

function retirarDinero(event){
    event.preventDefault();

    if(usuarioActual.saldo >= Number(event.target.value)){
        usuarioActual.saldo = usuarioActual.saldo - Number(event.target.value)
        console.log("Nuevo saldo: " + usuarioActual.saldo);
        cargarSaldoActual();
        cargarPagina(pretirar, psaldo);
        //---------------
        mostrarCarga();
        setTimeout(() => {
            ocultarCarga();
        }, 800);
        //---------------
    }else{
        //---------------
        mostrarCarga();
        setTimeout(() => {
            ocultarCarga();
        }, 800);
        //---------------
        error(pretirar);
    }

}

function retirarMontoEspecifico(){
    cargarPagina(pretirar, pretirarEspecifico)
}

function procesarRetiro(event){
        event.preventDefault();

        if(usuarioActual.saldo >= Number(inputRetiro.value)){
        usuarioActual.saldo = usuarioActual.saldo - Number(inputRetiro.value)
        console.log("Nuevo saldo: " + usuarioActual.saldo);
        inputRetiro.value="";
        cargarSaldoActual();
        cargarPagina(pretirarEspecifico, psaldo);
        //---------------
        mostrarCarga();
        setTimeout(() => {
            ocultarCarga();
        }, 800);
        //---------------
    }else{
        inputRetiro.value="";
        //---------------
        mostrarCarga();
        setTimeout(() => {
            ocultarCarga();
        }, 800);
        //---------------
        error(pretirarEspecifico);
    }
}

function regresarMenuRM(){
    cargarPagina(pretirar, pmenu);
}
function regresarMenuEspM(){
    cargarPagina(pretirarEspecifico, pmenu);
}

// -----------------------------------------------------------------------------ERROR
const volverMenuEM = document.getElementById("volverMenuEM");

volverMenuEM.addEventListener("click", regresarMenuEM);

function error(pActual){
    
    cargarPagina(pActual, perror);
}

function regresarMenuEM(){
    cargarPagina(perror, pmenu);
}





// Esto de abajo es IA Slop
const loader = document.getElementById("pantallaCarga");
// Función para mostrar pantalla de carga
function mostrarCarga() {
    loader.classList.add("activo");
}
// Función para ocultar pantalla de carga
function ocultarCarga() {
    loader.classList.remove("activo");
}