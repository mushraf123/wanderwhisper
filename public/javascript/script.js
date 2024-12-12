// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

let banner = document.querySelector("#banner")

gsap.to("#banner", { 
  height:"0vh",
  duration:0.5,
  delay:1,
  
});
gsap.from("#banner h1",{
   opacity:0,
   delay:0.5,
   duration:0.5,
   y:"10vh"
})
gsap.to("#banner h1",{
   duration:0.5,
   opacity:0,
   delay:1
})



// Function to toggle between light and dark mode
function toggleMode() {
  const body = document.body;
  const currentMode = body.classList.contains('light-mode') ? 'light' : 'dark';
  const newMode = currentMode === 'light' ? 'dark' : 'light';
  
  // Remove current mode class and add new mode class
  body.classList.remove(currentMode + '-mode');
  body.classList.add(newMode + '-mode');
  
  // Save the new mode to localStorage
  localStorage.setItem('colorMode', newMode);
}

// Function to load the saved mode from localStorage
function loadSavedMode() {
  const savedMode = localStorage.getItem('colorMode') || 'light';
  document.body.classList.add(savedMode + '-mode');
}

// Event listener for the toggle button
document.getElementById('switch').addEventListener('click', toggleMode);

// Load the saved mode on page load
window.onload = loadSavedMode;




document.addEventListener('DOMContentLoaded', () => {
  const hoverElement = document.querySelector('.hover-element');
  const video = document.getElementById('hover-video');

  hoverElement.addEventListener('mouseenter', () => {
      video.style.display = 'block';
      video.play();
  });

  hoverElement.addEventListener('mouseleave', () => {
      video.pause();
      video.style.display = 'none';
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const flashMessage = document.querySelector('.flash-msg');
  if (flashMessage) {
    setTimeout(() => {
      flashMessage.style.display = 'none';
    }, 5000); // Hide after 5 seconds
  }
});





let elements = document.querySelectorAll(".rolling-text");

elements.forEach(element => {
	let innerText = element.innerText;
	element.innerText = "";
	
	let textContainer = document.createElement("div");
	textContainer.classList.add("block");
	
	for (let letter of innerText) {
		let span = document.createElement("span");
		span.innerText = letter.trim() === "" ? "\xa0" : letter;
		span.classList.add("letter");
		textContainer.appendChild(span);
	}
	
	element.appendChild(textContainer);
	element.appendChild(textContainer.cloneNode(true));
});

// CSS 코드 대신 JS 코드로
let block = document.querySelectorAll('.block');
let letter = document.querySelectorAll('.letter');

for (let i = 0; i < block.length; i++) {
  for (let j = 0; j < letter.length/2; j++) {
    let gob = j * 0.015;
    block[i].children[j].style.transitionDelay = gob + "s";
  };
};


