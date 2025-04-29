
/*** Dark Mode ***/

const darkBtn = document.querySelector('#switch-button');
const on = document.querySelector('#on-button');
const off = document.querySelector('#off-button');

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    on.style.display = 'block';
    off.style.display = 'none';
  }
  else {
    on.style.display = 'none';
    off.style.display = 'block';
  }
}

darkBtn.addEventListener('click', toggleDarkMode);

/*** Reduce Motion ***/
let motion = true;
const motionBtn = document.querySelector('#motion-switch');
const motionOn = document.querySelector('#motion-on-button');
const motionOff = document.querySelector('#motion-off-button');
const toggleMotion = () => {
  if (motion === true) {
    motion = false;
    motionOff.style.display = 'block';
    motionOn.style.display = 'none';
  }
  else {
    motion = true;
    motionOff.style.display = 'none';
    motionOn.style.display = 'block';  
  }
}
motionBtn.addEventListener('click', toggleMotion);

/*** Hide Event Description ***/
const eventItems = document.querySelectorAll('.event');

eventItems.forEach(item => {
  const eventImg = item.querySelector('.activity-image');
  const moreIcon = item.querySelector('.more-icon');
  item.addEventListener('click', () => {
    const paragraph = item.querySelector(".event-descr")
    if (paragraph.style.display === 'none') {
      paragraph.style.display = 'block'; 
    } else {
      paragraph.style.display = 'none'; 
    }
  });
  item.addEventListener('mouseover', () => {
    eventImg.style.opacity = 0.5;
    moreIcon.style.display = 'block';
  });
  item.addEventListener('mouseout', () => {
    eventImg.style.opacity = 1;
    moreIcon.style.display = 'none';
  });
});


/*** Form Handling ***/

const rsvpBtn = document.querySelector("#rsvp-submit");
let count = 3;

const addParticipant = (event, person) => {
  const participants = document.querySelector(".participants");
  const message = document.createElement('p');
  message.textContent = "🎉" + person.name + " has RSVP'd.";
  participants.appendChild(message);

  const counter = document.querySelector("#rsvp-count");
  const counting = document.querySelector(".rsvp-counting");
  counter.remove();
  count = count + 1;
  const newCounter = document.createElement('p');
  newCounter.setAttribute("id", "rsvp-count");
  newCounter.textContent = "🙋" + count + " people have RSVP'd to this event!"
  counting.appendChild(newCounter);

  toggleModal(person);

  event.preventDefault();
}
// rsvpBtn.addEventListener('click', addParticipant);

/*** Form Validation ***/

const validateForm = (event) => {
  let containsErrors = false;
  var rsvpInputs = document.getElementById("rsvp-form").elements;
  let person = {
    name: rsvpInputs[0].value,
    phone: rsvpInputs[1].value,
    email: rsvpInputs[2].value
  }

  const phoneRegex = /^\+?\d{10,11}$/;
  // TODO: Loop through all inputs
  for (let i = 0; i < rsvpInputs.length; i++) {
    // TODO: Inside loop, validate the value of each input
    if (rsvpInputs[i].id === "rsvp-email") {
      if (!rsvpInputs[i].value.includes('@')) {
        containsErrors = true;
        rsvpInputs[i].classList.add("error");
        alert("Enter A Valid Email!");
      }
      else {
        rsvpInputs[i].classList.remove("error");
      }
    }
    else if (rsvpInputs[i].id === "rsvp-name") {
      if (rsvpInputs[i].value.length <= 2) {
        containsErrors = true;
        rsvpInputs[i].classList.add("error");
        alert("Enter A Valid Name!");
      }
      else {
        rsvpInputs[i].classList.remove("error");
      }
    }
    else if (rsvpInputs[i].id === "rsvp-phone") {
      if (!phoneRegex.test(rsvpInputs[i].value)) {
        containsErrors = true;
        rsvpInputs[i].classList.add("error");
        alert("Enter A Valid Phone Number!");
      }
      else {
        rsvpInputs[i].classList.remove("error");
      }
    }
    /***
    else {
      rsvpInputs[i].classList.remove("error");
    }
     */
  }
  // TODO: If no errors, call addParticipant() and clear fields
  if (containsErrors === false) {
    addParticipant(event, person);
    for (let i = 0; i < rsvpInputs.length-1; i++) {
      rsvpInputs[i].value = "";
    }
  }

  event.preventDefault();
}

rsvpBtn.addEventListener('click', validateForm);

/*** unhide RSVP Form ***/
const registerBtn = document.querySelector('#register-button');
const unhideForm = () => {
  const rsvpForm = document.querySelector('#rsvp-form');
  rsvpForm.style.display = 'flex';
  registerBtn.style.display = 'none';
}

registerBtn.addEventListener('click', unhideForm);



/*** Scroll Animations ***/

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let current = revealableContainers[i];

        // Get current height of container and window
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
        let revealDistance = parseInt(getComputedStyle(current).getPropertyValue('--reveal-distance'), 10);
        if (motion === false) {
          revealableContainers[i].style.opacity = 1;
        }
        else {
          // If the container is within range, add the 'active' class to reveal
          if (topOfRevealableContainer < windowHeight - revealDistance) {
            current.classList.add('active');
          }
          // If the container is not within range, hide it by removing the 'active' class
          else { 
            current.classList.remove('active');
          }
        }
    }
}

window.addEventListener('scroll', reveal);


/*** Modal ***/

const modal = document.querySelector('.success-modal');
const toggleModal = (person) => {
  const modalText = document.querySelector('.modal-text');

  modal.style.display = 'flex';
  // TODO: Update modal text to personalized message
  const greeting = document.querySelector('#modal-greeting');
  const message = document.querySelector('#modal-message');

  greeting.remove();
  const newGreeting = document.createElement('h3');
  newGreeting.setAttribute('id', 'modal-greeting')
  newGreeting.textContent = "CONGRATULATION, " + person.name + "!";
  modalText.insertBefore(newGreeting,message);

  let intervalId = setInterval(animateImage, 500);
  // Set modal timeout to 5 seconds
  setTimeout(() => {
    modal.style.display = 'none';
    clearInterval(intervalId);
  }, 8000);
}

// TODO: animation variables and animateImage() function
let rotateFactor = 0;
const modalImage = document.querySelector('#success-img');

const animateImage = ( ) => {
  if (rotateFactor === 0) {
    rotateFactor = -10;
  }
  else {
    rotateFactor = 0;
  }
  if (motion === true) {
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
  }
}

// Add a button that closes the modal
const modalCloseBtn = document.querySelector('.modal-close-button');
const closeModal = ( ) => {
  modal.style.display = 'none';
}
modalCloseBtn.addEventListener('click', closeModal);