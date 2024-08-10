//toggle icon navbar
document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('header nav');
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('header nav a');

  menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
  });

  window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;

      sections.forEach(sec => {
          const offset = sec.offsetTop - 150;
          const height = sec.offsetHeight;
          const id = sec.getAttribute('id');
          const navLink = document.querySelector(`header nav a[href="#${id}"]`);

          if (scrollPosition >= offset && scrollPosition < offset + height) {
              navLinks.forEach(link => link.classList.remove('active'));
              navLink.classList.add('active');
          }
      });

      const header = document.querySelector('header');
      header.classList.toggle('sticky', scrollPosition > 100);

      // Remove toggle icon and navbar when clicking navbar link
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              menuIcon.classList.remove('bx-x');
              navbar.classList.remove('active');
          });
      });
  });
});



//gallery section
const images = document.querySelectorAll('.gallery .image');

let globalIndex = 0,
    last = { x: 0, y: 0 };

const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = globalIndex;

  image.dataset.status = 'active';

  last = { x, y };
};

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
};

const handleOnMove = e => {
  if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / 20) {
    const lead = images[globalIndex % images.length],
      tail = images[(globalIndex - 5) % images.length];

    activate(lead, e.clientX, e.clientY);

    if (tail) tail.dataset.status = 'inactive';

    globalIndex++;
  }
};

window.onmousemove = e => {
  // Check if the cursor is within the gallery section
  const gallery = document.querySelector('.gallery');
  const { clientX, clientY } = e;
  const { top, bottom, left, right } = gallery.getBoundingClientRect();
  const cursorInsideGallery = clientX >= left && clientX <= right && clientY >= top && clientY <= bottom;

  if (cursorInsideGallery) {
    handleOnMove(e);
  } else {
    // If cursor is outside gallery, deactivate images
    images.forEach(image => {
      image.dataset.status = 'inactive';
    });
  }
};

window.ontouchmove = e => {
  const touch = e.touches[0];
  const { clientX, clientY } = touch;

  // Check if the touch is within the gallery section
  const gallery = document.querySelector('.gallery');
  const { top, bottom, left, right } = gallery.getBoundingClientRect();
  const touchInsideGallery = clientX >= left && clientX <= right && clientY >= top && clientY <= bottom;

  if (touchInsideGallery) {
    handleOnMove(touch);
  } else {
    // If touch is outside gallery, deactivate images
    images.forEach(image => {
      image.dataset.status = 'inactive';
    });
  }
};



//typing animation
var typed = new Typed(".typing",{
  strings:["","Frontend Developer","Full Stack Developer","Python Developer"],
  typeSpeed:100,
  BackSpeed:60,
  loop :true
})



//about section
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
  for(tablink of tablinks){
    tablink.classList.remove("active-link");
  }
  for(tabcontent of tabcontents){
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}


// effect when scroll
ScrollReveal({
  reset:true,
  distance:'80px',
  duration: 1000,
  delay:50
});

ScrollReveal().reveal('.home-content, .heading, .gallery', {origin:'top'});
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .portfolio p, .contact form, .navigation, .touch, .contact p, .more-proj, .gallery h3', {origin:'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img', {origin:'left'});
ScrollReveal().reveal('.home-content p, .about-content', {origin:'right'});






