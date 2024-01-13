

const navToggle = document.querySelector('.nav-toggle');
const navItem = document.querySelector(".nav-items")

navToggle.addEventListener("click", () => {
  if (navItem.classList.contains("active")) {
    navItem.classList.remove("active");
    removeToggle();
  }
  else {
    navItem.classList.add("active");
    removeToggle();
  }

})

// //** Handeling scroll event */
// function closeToggle() {
//   if (navItem.classList.contains('active')) {
//     navItem.style.display = "none";
//   }
// }
// window.addEventListener('scroll', function () {
//   console.log("scroll hua")
//   closeToggle();
// }, false)


//**Handle click event */

function removeToggle() {
  function handleClickOutside(event) {
    if (navItem.contains(event.target) || !navItem.contains(event.target) && !navToggle.contains(event.target)) {
      // Click occurred outside the navItem and navToggle
      navItem.classList.remove('active');
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    }
  }
  
  
  // Handle scroll event
  function handleScroll() {
    if (navItem.classList.contains('active')) {
      console.log("hello")
      // Scroll occurred, close the navbar
      navItem.classList.remove('active');
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    }
  }
  
  window.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', handleScroll);
}



//** Handle popup */

const form = document.querySelector('.form');
const result = document.querySelector('#form-result');

//on submit, POST to web3Forms and get response
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."
  //fetch result
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
    .then(async (response) => {//show response
      let json = await response.json();
      console.log(json);
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.add("notice--success");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.add("notice--warning");

      }
    })
    .catch(error => {//show error
      console.log(error);
      result.innerHTML = "Something went wrong!";
      result.classList.add("notice--danger");

    })
    .then(function () {//reset form
      form.reset();
      //make response dissapear after 3 seconds if you wish
      setTimeout(() => {
        result.style.display = "none";
        // location.reload();
      }, 3000);
    });
});


//** Recaptch */
var allowSubmit = false;
function captcha_filled() {
  allowSubmit = true;
}

function captch_expired() {
  allowSubmit = false;
}

