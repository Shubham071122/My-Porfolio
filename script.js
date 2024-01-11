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

