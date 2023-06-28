const btnChat = document.getElementById('btnChat');
const btnMapa= document.getElementById('btnMapa');
const btnStalk= document.getElementById('btnStalk');
const btnGuia = document.getElementById('btnGuia');

let initialSection = document.getElementById("section2");
initialSection.style.display = "block";

function changeSection(sectionNumber) {
    // Ocultar todas las secciones
    let sections = document.getElementsByClassName("sectionpdabox");
    for (let i = 0; i < sections.length; i++) {
      sections[i].style.display = "none";
    }
    
    // Mostrar la sección seleccionada
    let selectedSection = document.getElementById("section" + sectionNumber);
    selectedSection.style.display = "block";
  }





