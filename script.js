
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
  result.classList.add('margin-bot');
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


//***  Function to highlight the active section based on scroll position*/
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-items div a');
function highlightActiveSection() {

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      // This section is in the middle of the window
      navItems.forEach(item => item.classList.remove('active'));
      navItems[index].classList.add('active');
    }
  });
}

// Function to highlight the clicked navigation link
function highlightClickedLink(event) {
  const clickedLink = event.target;
  navItems.forEach(item => item.classList.remove('active'));
  clickedLink.classList.add('active');
}

// Initial call to set the initial state
highlightActiveSection();

// Event listener for scroll to update the active section
document.body.addEventListener('scroll', highlightActiveSection);

// Event listener for click to highlight the clicked link
document.getElementById('navbar-item').addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    highlightClickedLink(event);
  }
});



//***  Function to create the mailto link dynamically*/
function createMailtoLink() {
  var emailAddress = "shubhamkumar7112002@gmail.com";
  var subject = "Inquiry"; // You can customize the subject
  var body = "Hello,"; // You can customize the body

  var mailtoLink = "mailto:" + encodeURIComponent(emailAddress) +
                   "?subject=" + encodeURIComponent(subject) +
                   "&body=" + encodeURIComponent(body);

  document.getElementById("contactLink").setAttribute("href", mailtoLink);
  document.getElementById("contactLink2").setAttribute("href", mailtoLink);
}

//*** Adding download link for cv */
document.getElementById('downloadButton').addEventListener('click', function() {
  // Create an anchor element
  var downloadLink = document.createElement('a');
  
  // Replace the placeholder with the actual path to your PDF
  downloadLink.href = 'CVShubhamKumar.pdf';
  
  // Specify the filename for the downloaded file
  downloadLink.download = 'CV Shubham Kumar.pdf';  // Replace with the actual filename
  
  // Append the link to the document and trigger the click event
  document.body.appendChild(downloadLink);
  downloadLink.click();
  
  // Remove the link from the document
  document.body.removeChild(downloadLink);
});


// Disable right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};
