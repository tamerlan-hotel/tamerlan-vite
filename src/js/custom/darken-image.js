export default document.addEventListener("scroll", function () {
  const image = document.querySelector(".darken-image");
  const imagePosition = image.getBoundingClientRect().top;
  const triggerPoint = 100;

  if (imagePosition <= triggerPoint) {
    image.classList.add("darken");
  } else {
    image.classList.remove("darken");
  }
});
