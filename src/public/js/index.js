
import Anomalia from '../js/anomalias.js';
const socket = io(); //le decimos al front end que trabaje con socket



let user;
let imgPerfil="img/stalker.webp"
const body = document.body;
const anomaly=new Anomalia();
const zoom=document.getElementById('zoom-img');
const chatBox=document.getElementById('chatBox');
const btnEnviar=document.getElementById('btnChatBox');
const log = document.getElementById('messageLogs'); //esta es la etiqueta p donde se van a mostrar los mensajes

const audioA= new Audio('audio/beepDetector.mp3');
const audioB = new Audio('audio/beepDetector.mp3');
const audioC= new Audio('audio/beepDetector.mp3');


Swal.fire({ // al usar el then es como una promesa
    customClass: {
        popup: 'backPopu',
        confirmButton: 'buttonOkSweet',
       
      },
    title:'RED - S.T.A.L.K.E.R',
    imageUrl:"img/pdalog.webp",
    imageHeight: 100,
    input:'text',
    text:'ingresa un nombre de usuario para identificarte',
  
    inputValidator: (value)=>{
        return !value && "necesitas escribir un nombre de usuario para ingresar"
    },
    allowOutsideClick:false, // evita que de click fuera del modail
    allowEscapeKey:false //evita que se use el ESC para salir del modail
}).then(result=>{
    user=result.value; //asignamos el valor del input a el let usuer (que esta arriba)--> esto no se envia al servidor
    socket.emit('authenticated',user);
    
   
    zoom.scrollTo(510,3990); //me posiciona en el punto que quiero en el mapa de la PDA

});




const chatFuncion=(evt)=>{// escribiendo en el chatbox lo que queremos mandar.
    const audiobtnEnviar=new Audio('audio/btnenviar.mp3')
    if(evt.key==='Enter' || evt.target===btnEnviar ){
        if(chatBox.value.trim().length >0){  //aca le decimso que la cadena es mayor a 0 es deci que no enviamos un vacio en el chatbox.
            audiobtnEnviar.play();
            var today = new Date();
    const fechaActual = today.toLocaleString('es-Es');
            socket.emit('message',{user,fechaActual, message:chatBox.value}) //---> aqui se envia al servidor el usuario y lo demas
            
            chatBox.value=""; //limpia la barra
            
            
        }
    }
};

chatBox.addEventListener("keydown", chatFuncion);
btnEnviar.addEventListener("click",chatFuncion);







socket.on('messageLogs', data=>{ //los usuarios reciben (escuchan) al servidor

let messag = '';


    data.forEach(message => {
        
       messag +=`
        <section class="seccionMensaje">
            <div class="divCabezaChat">
                <img src=${imgPerfil} alt="">
                <p class="pUserFecha">${message.fechaActual} -<p class="pUser">${message.user}</p> </p>
            </div>
            <div class="divChat">
                <p class="pMensaje">${message.message}</p>
            <div>
        </section>`

        

    });

    

    log.innerHTML=messag;
   

    if(log.scrollTop!==0){
        log.scrollTop = log.scrollHeight;
    }
    
});






const audioNewStalker = new Audio('audio/stalker-new-stalker.mp3');
socket.on('newStalkerConnect',data=>{
audioNewStalker.play();
    Swal.fire({
        toast:true,
        position:'top-end',
        showConfirmButton: false,
        timer:3000,
        title:`Nuevo S.T.A.L.K.E.R. conectado: ${data}`,
        icon:"success",
    });

    
});

const btnPDA =document.getElementById('btnPDA');

const pdaCuerpo=document.getElementById('pdaCuerpo');

const loadingPDA=document.getElementById('loadingPDA');

const audioClickPDA = new Audio('audio/stalker-PDA-Click.mp3');

btnPDA.addEventListener('click',function(){
    audioClickPDA.play();
if(pdaCuerpo.classList.contains('pdaCuerpo')){
    loadingPDA.classList.toggle('hidden');

    setTimeout(function(){
        pdaCuerpo.classList.toggle('pdaCuerpo');
        loadingPDA.classList.toggle('hidden');
    },2000)
}else{
    pdaCuerpo.classList.toggle('pdaCuerpo');
}

    
});



function zoomMap(){
    const imgMap = document.getElementById('imgMap');
   
    imgMap.addEventListener('click', function(event) {
      let mouseX = event.offsetX; //indica posicion del puntero del mouse en el eje X.
      let mouseY = event.offsetY;// indica posicon del puntero del mouse en le eje Y.
      // Establecer el punto de origen en el punto donde se hizo clic
      imgMap.style.transformOrigin = `${mouseX}px ${mouseY}px`;
      // Hacer zoom en el punto donde se hizo clic
      imgMap.classList.toggle('zoom');
   
    

    });
    
}



// Obtén todos los botones de ubicación
var buttons = document.querySelectorAll('.scroll-button');

// Recorre cada botón y agrega un evento de clic
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    // Obtén las coordenadas del botón específico
    var posX = parseInt(button.getAttribute('data-posX'));
    var posY = parseInt(button.getAttribute('data-posY'));
    
    // Desplázate a las coordenadas especificadas en el elemento de mapa
    
    zoom.scrollTo(posX, posY);
  });
});

function detectorAnomalia(){
    const detector=document.getElementById('detector');
    const imgMap = document.getElementById('imgMap');
    const anomaliasMap=document.getElementById('anomaliasMap');
    let activador=false;
    detector.addEventListener('click',()=>{
        
        body.classList.toggle('detectorCursor');
        detector.classList.toggle('detectorCursor');
        imgMap.classList.toggle('detectorCursor');
      
        if(body.classList.contains('detectorCursor')){
            detector.src="img/detectorOpen.webp"
            detector.style.width = "4.9rem";
            detector.style.position="relative";
            
          
            
            anomaly.anomaliaRender(anomaliasMap);
            anomaly.anomaliaSonido(true,audioA,audioB,audioC);
            activador=true;
         
            
        }else{
            detector.style.position="relative";
            detector.style.bottom="1px"
          
          
            detector.src="img/detectorcerrado.webp"
            detector.style.width = "7rem";
            anomaly.anomaliaSonido(false,audioA,audioB,audioC);
            anomaliasMap.innerHTML='';
        }

        if(activador){
            const AnomalClick=document.getElementById('AnomalClick');

            AnomalClick.addEventListener('click',()=>{
                const captureAnomaly=new Audio('audio/capturarAnomalia.mp3');
                captureAnomaly.play();
                anomaly.anomaliaSonido(false,audioA,audioB,audioC);
                anomaliasMap.innerHTML='';

            });
        }
 

    });
    
};







function inventario(){
    const inventario = document.getElementById('inventory');
    const audioInventario = new Audio('audio/inventarioOpen.mp3');
    inventario.addEventListener('click',()=>{
    audioInventario.play();
        Swal.fire({
            title: 'INVENTARIO',
            showConfirmButton: false,
            background: 'linear-gradient(45deg, #27274e9c, #161a2ea8)', 
            showClass: {
                popup: 'animate__animated animate__headShake'},  
            html:
              `<section class="SeccionMochila">
              <img id="lataFood" class="itemInventario" type="buttom" src="img/stalkeritems/latafood.webp" alt="Conserva" title="Lata de conserva">
              <img id="bebidaStalker" class="itemInventario" type="buttom" src="img/stalkeritems/bebida.webp" alt="Bebida" title="Bebida S.T.A.L.K.E.R" style="width: 4rem;">
              <img id="pildoraRad" class="itemInventario" type="buttom" src="img/stalkeritems/pildoraRad.webp" alt="Pildora" title="Pildora anti-Radiacíon">
              <img id="vodka" class="itemInventario" type="buttom" src="img/stalkeritems/Vodka.webp" alt="Vodka" title="Vodka" style="width: 4rem;">
              </section>`,

              customClass: {
                title: 'tituloInventario'
              }
              
          });

          const imagenes = document.querySelectorAll(".SeccionMochila img");

          const audios = {
            lataFood: new Audio('audio/conserva_use.mp3'),
            bebidaStalker: new Audio('audio/bebidastalker.mp3'),
            pildoraRad:new Audio('audio/pildoraRad.mp3'),
            vodka:new Audio('audio/vodka.mp3')
            // Agrega más propiedades para otros audios según tus necesidades
          };
          
          imagenes.forEach(function(imagen) {
            imagen.addEventListener("click", function() {
              const id = imagen.id;
              const audio = audios[id];
              if (audio) {
                audio.play();
              }
          
              Swal.close();
            });
          });
          

    });
}


detectorAnomalia();
inventario();

zoomMap();




