var slideIndex = 1;
var slideInterval;

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function autoSlide() {
  plusSlides(1);
}

function resumeSlides() {
  slideInterval = setInterval(autoSlide, 3000); 
}

resumeSlides();

// event booking form--------------------------------

//custom event
function toggleCustomInput() {
  var eventTypeSelect = document.getElementById('eventType');
  var customEventTypeInput = document.getElementById('customEventType');

  customEventTypeInput.style.display = eventTypeSelect.value === 'custom' ? 'block' : 'none';
}

//booking subiited message

function submitForm(event) {
  event.preventDefault();
  var form = document.querySelector('form');
  form.style.display = 'none';
}

//generate Random Id

function getRandomId() {
  return Math.random().toString(36).substr(3,9);
}

window.onload = function() {
  var getBookingId = document.getElementById('bookingId');
  getBookingId.textContent = getRandomId();
};
