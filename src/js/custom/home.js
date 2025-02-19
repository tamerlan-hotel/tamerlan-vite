import footer from "./footer";
import i18 from "./i18next-utils";

// window.addEventListener("load", () => {
//   setTimeout(() => {
//     const slider = jQuery("#slider-revolution");
//     slider.revnext();
//   }, 770);
// });

window.addEventListener("load", () => {
  function centerCaptions() {
    document
      .querySelectorAll(".slider-caption-1, .slider-caption-sub-1")
      .forEach((el) => {
        const parent = el.parentElement;
        const parentWidth = parent.offsetWidth;
        const elWidth = el.offsetWidth;
        console.log("parentWidth:", parentWidth);
        const newLeft = (parentWidth - elWidth) / 2;
        el.style.left = `${newLeft}px`;
      });
  }

  // Викликаємо після завантаження сторінки
  centerCaptions();

  // Також можна викликати після зміни розміру вікна
  //   window.addEventListener("resize", centerCaptions);
});
