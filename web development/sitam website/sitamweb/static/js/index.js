var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var y = document.getElementsByClassName("text-overlay");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < y.length; i++) {
    y[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  if (slideIndex > y.length) {slideIndex = 1}
  if(x[slideIndex - 1]) x[slideIndex - 1].style.display = "block";
  if (y[slideIndex - 1]) y[slideIndex - 1].style.display = "block";
  setTimeout(carousel, 8000); 
}

document.addEventListener('DOMContentLoaded', () => {

    AOS.init({
      duration: 1000,
      once: true,     
    });

     //chatbot sound

    document.querySelectorAll('.vision-paragraph, .mission-paragraph').forEach(paragraph => {
        paragraph.style.display = 'none';
    });
    const aboutUsLinks = document.querySelectorAll('.about-us-li');
    aboutUsLinks.forEach(link => {
        link.addEventListener('click', () => {
            aboutUsLinks.forEach(item => {
                item.querySelector('h3').classList.remove('active-link');
            });
            link.querySelector('h3').classList.add('active-link');
            document.querySelectorAll('.about-us-paragraph, .vision-paragraph, .mission-paragraph').forEach(paragraph => {
                paragraph.style.display = 'none';
            });
            const paraClass = link.getAttribute('data-linkname');
            document.querySelector(`.${paraClass}`).style.display = 'block';
        });
    });

    const msgCard = document.querySelectorAll(".msg-card");
    msgCard.forEach(card => {
      card.querySelector('.message').style.display = "none";
      card.addEventListener('mouseover', () => {
        card.querySelector('.message').style.display = "block";
      });
      card.addEventListener('mouseout', () => {
        card.querySelector('.message').style.display = "none";
      });
    });

    if (window.location.pathname === '/vision-mission') {
      const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const elements = document.querySelectorAll('.vision-block h1, .vision-block p, .mission-block h1, .mission-block p');
    elements.forEach(element => {
        observer.observe(element);
    });
    }

    //Admission Form

    document.getElementById('category-select').addEventListener('change', function() {
      const selectedCategory = this.value;
      const formSection = document.getElementById('form-container');
      const formCategoryA = document.getElementById('admissions-form-catA');
      const formCategoryB = document.getElementById('admissions-form-catB');
      const formCategoryC = document.getElementById('admissions-form-catC');
  
      if (selectedCategory === 'category-a') {
        console.log(selectedCategory);
        formSection.style.display = "block";
        formCategoryA.style.display = "block";
        formCategoryB.style.display = "none";
        formCategoryC.style.display = "none";
      } else if (selectedCategory === 'category-b') {
        console.log(selectedCategory);
        formSection.style.display = "block";
        formCategoryA.style.display = "none";
        formCategoryB.style.display = "block";
        formCategoryC.style.display = "none";
      } else if (selectedCategory === 'category-c') {
        console.log(selectedCategory);
        formSection.style.display = "block";
        formCategoryA.style.display = "none";
        formCategoryB.style.display = "none";
        formCategoryC.style.display = "block";
      }
  });

  const formCatA = document.getElementById('form-catA');
  const formCatB = document.getElementById('form-catB');
  const formCatC = document.getElementById('form-catC');

  formCatA.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const csrfToken = getCSRFToken();

    fetch('/submit-category-a/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrfToken,
      },
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            formCatA.reset();
        })
        .catch(error => {
            alert('An error occurred: ' + error);
        });
    });

  formCatB.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const csrfToken = getCSRFToken();

      fetch('/submit-category-b/', {
          method: 'POST',
          body: formData,
          headers: {
            'X-CSRFToken': csrfToken,
        },
      })
          .then(response => response.json())
          .then(data => {
              alert(data.message);
              formCatB.reset();
          })
          .catch(error => {
              alert('An error occurred: ' + error);
          });
    });

  formCatC.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const csrfToken = getCSRFToken();

      fetch('/submit-category-c/', {
          method: 'POST',
          body: formData,
          headers: {
            'X-CSRFToken': csrfToken,
        },
      })
          .then(response => response.json())
          .then(data => {
              alert(data.message);
              formCatC.reset();
          })
          .catch(error => {
              alert('An error occurred: ' + error);
          });
    });

    //campus Life

});

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
  slideInterval = setInterval(autoSlide, 6000); 
}

resumeSlides();

//CSRF Token

function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

//ChatBot

function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  chatWindow.classList.toggle('hidden');
  botSound.play();
}

function sendMessage() {
  const inputField = document.getElementById('chat-input');
  const message = inputField.value.trim();
  if (message === '') return;

  const chatBody = document.getElementById('chat-body');
  
  // Display the user's message
  const userMessage = document.createElement('div');
  userMessage.className = 'user-message';
  userMessage.innerHTML = `<p>${message}</p>`;
  chatBody.appendChild(userMessage);

  inputField.value = '';

  chatBody.scrollTop = chatBody.scrollHeight;

  fetch('/chatbot/api/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message })
  })
  .then(response => response.json())
  .then(data => {
      const botMessage = document.createElement('div');
      botMessage.className = 'bot-message';
      botMessage.innerHTML = `<p>${data.response}</p>`;
      chatBody.appendChild(botMessage);
      chatBody.scrollTop = chatBody.scrollHeight;
  })
  .catch(error => {
      const botMessage = document.createElement('div');
      botMessage.className = 'bot-message';
      botMessage.innerHTML = `<p>Sorry, I couldn't process your message. Please try again later.</p>`;
      chatBody.appendChild(botMessage);
      chatBody.scrollTop = chatBody.scrollHeight;
  });
}

function handleKeyDown(event) {
  if (event.key === 'Enter') {
      sendMessage();
  }
}