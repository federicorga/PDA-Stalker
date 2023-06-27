window.onload=function(){
    let contenedor= document.getElementById('loader');
    let imgLoader=document.getElementById('imgLoader');
    contenedor.style.transition='1.5s';
    contenedor.style.visibility= 'hidden';
    contenedor.style.opacity = '0';
    contenedor.style.zIndex='-1';
    imgLoader.style.animation='latido 1.5s'
    contenedor.setAttribute('transition-style','out:wipe:top-right')
  }