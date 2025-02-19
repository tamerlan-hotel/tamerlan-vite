import footer from "./footer";
import i18 from "./i18next-utils";

const observer = new MutationObserver(() => {
  document
    .querySelectorAll(".slider-caption-1, .slider-caption-sub-1")
    .forEach((el) => {
      const parent = el.parentElement;
      const parentWidth = parent.offsetWidth;
      const elWidth = el.offsetWidth;
      console.log("PARENT WIDTH:", parentWidth);
      const newLeft = (parentWidth - elWidth) / 2;
      el.style.left = `${newLeft}px`;
    });
});

// Спостерігаємо за змінами в стилях
document
  .querySelectorAll(".slider-caption-1, .slider-caption-sub-1")
  .forEach((el) => {
    observer.observe(el, { attributes: true, attributeFilter: ["style"] });
  });

// window.addEventListener("load", () => {
//   function centerCaptions() {
//     document
//       .querySelectorAll(".slider-caption-1, .slider-caption-sub-1")
//       .forEach((el) => {
//         const parent = el.parentElement;
//         const parentWidth = parent.offsetWidth;
//         const elWidth = el.offsetWidth;
//         console.log("parentWidth:", parentWidth);
//         const newLeft = (parentWidth - elWidth) / 2;
//         el.style.left = `${newLeft}px`;
//       });
//   }

//   // Викликаємо після завантаження сторінки
//   centerCaptions();

//   // Також можна викликати після зміни розміру вікна
//   //   window.addEventListener("resize", centerCaptions);
// });
