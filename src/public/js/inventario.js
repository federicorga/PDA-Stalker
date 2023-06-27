
class Item{

    constructor(name,quantity=1,price,activo=false,img){
        this.name=name,
        this.quantity=quantity,
        this.price=price,
        this.activo=activo,
        this.img=`img/stalkeritems/${img}`
    }

};


const lataFood =new Item("Lata Conserva",5,100,true,"latafood.webp");

const bebidaStalker = new Item("Bebida S.T.A.L.K.E.R",5,200,true,"bebida.webp");
const pildoraRad =new Item("pildora anti-Radiación",5,200,true,"pildoraRad.webp");
const vodka= new Item("Vodka",10,1000,true,"Vodka.webp");


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
              <img id="lataFood" class="itemInventario" type="buttom" src="${lataFood.img}" alt="Conserva" title="Lata de conserva">
              <img id="bebidaStalker" class="itemInventario" type="buttom" src="${bebidaStalker.img}" alt="Bebida" title="Bebida S.T.A.L.K.E.R" style="width: 4rem;">
              <img id="pildoraRad" class="itemInventario" type="buttom" src="${pildoraRad.img}" alt="Pildora" title="Pildora anti-Radiacíon">
              <img id="vodka" class="itemInventario" type="buttom" src="${vodka.img}" alt="Vodka" title="Vodka" style="width: 4rem;">
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