

class Anomalia{


    anomaliaRender=(container)=>{
        
        const span = document.createElement("span");

        span.innerHTML += `
        <div id="anomalia" class="anomaliaCapa1">
                    <div id="anomaliaB" class="anomaliaCapa2">
                        <div id="anomaliaC" class="anomaliaCapaArtefacto"><img class="anomaliaimg"id="AnomalClick"src="img/stalkeritems/artefacto1.webp" alt="" title="Artefacto"></div>
                    </div>
                </div>`

        container.appendChild(span);
        let ejex=this.generarNumeroRango(0,93)
        let ejey=this.generarNumeroRango(0,281)
        this.anomaliaPoscion(ejex,ejey);
    }

    anomaliaPoscion=(ejeX,ejeY)=>{
        const anomal = document.getElementById('anomalia');
        
        let originalLeft; // Variable global para almacenar la posición original del div hijo
        let originalTop;
    
        anomal.style.color = 'red';
      
        //Max left 82 min left -5
        //Max top 255 min top 0
        let ejex = ejeX;
        let ejey = ejeY;
    
        anomal.style.top = ejey + 'rem';
        
        anomal.style.left = ejex + 'rem';
       
        originalLeft = parseInt(anomal.style.left);
        originalTop = parseInt(anomal.style.top);
    
    };

anomaliaSonido=(boolean,audioA,audioB,audioC)=>{

    const area1 = document.getElementById('anomalia');
    const area2 = document.getElementById('anomaliaB');
    const area3 = document.getElementById('anomaliaC');
    

    if(boolean){
        area1.addEventListener('mouseover', ()=> {
            this.reproducirSonido(audioA,0.3);
        });
        
        area1.addEventListener('mouseout',()=>  {
            this.detenerSonido(audioA);
        });
        
        area2.addEventListener('mouseover', ()=>  {
            this.reproducirSonido(audioB,1);
        });
        
        area2.addEventListener('mouseout', ()=>  {
            this.detenerSonido(audioB);
        });
        
        area3.addEventListener('mouseover', ()=>  {
            this.reproducirSonido(audioC,1.2);
        });
        
        area3.addEventListener('mouseout', ()=>  {
            this.detenerSonido(audioC);
        });
    }else{

        this.detenerSonido(audioA);
        this.detenerSonido(audioB);
        this.detenerSonido(audioC);
        area1.removeEventListener('mouseover', this.reproducirSonido);
        area1.removeEventListener('mouseout', this.detenerSonido);
        area2.removeEventListener('mouseover', this.reproducirSonido);
        area2.removeEventListener('mouseout', this.detenerSonido);
        area3.removeEventListener('mouseover', this.reproducirSonido);
        area3.removeEventListener('mouseout', this.detenerSonido);

        console.log('Eventos de anomalia limpiados.');
    }
       
    };
  

      reproducirSonido=(audio,velocidad)=>{
    
        audio.loop = true; // Reproducir en bucle
        audio.playbackRate = velocidad; // Cambiar la velocidad
        audio.play();
      };
    
    detenerSonido=(audio)=> {
        audio.loop = false;
        audio.currentTime = 0;
        audio.pause();
       // Reiniciar el audio al principio
      };


      generarNumeroRango(minimo, maximo) {
        return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
      }

    
};

export default Anomalia;
