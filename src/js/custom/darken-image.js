export default document.addEventListener("scroll", function () {
  const images = document.querySelectorAll(".darken-image");
  const triggerPoint = 100;

  images.forEach(function (image) {
    const imagePosition = image.getBoundingClientRect().top;

    if (imagePosition <= triggerPoint) {
      image.classList.add("darken");
    } else {
      image.classList.remove("darken");
    }
  });
});
