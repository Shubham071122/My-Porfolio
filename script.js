

const navToggle = document.querySelector('.nav-toggle');
const navItem = document.querySelector(".nav-items")

navToggle.addEventListener("click", () => {
  if (navItem.classList.contains("active")) {
    navItem.classList.remove("active");
  }
  else
    navItem.classList.add("active");
})


// window.body.addEventListener('scroll',() => {
//   if(navItem.classList.contains('active'))
//     navItem.classList.remove('active');
// })


//** Handle popup */

const form = document.querySelector('.form');
const result = document.querySelector('#form-result');
const setCaptcha = document.querySelector('.h-captcha');

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
        location.reload();
      }, 3000);
    });
});

