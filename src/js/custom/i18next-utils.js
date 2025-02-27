import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import Cookies from "js-cookie";

const savedLang = Cookies.get("lang") || "ua"; // Отримуємо мову з кукі або ставимо "ua"

i18next
  .use(I18NextHttpBackend)
  .init({
    lng: savedLang,
    fallbackLng: "ua",
    ns: [
      "translation",
      "header",
      "footer",
      "activities",
      "about_us",
      "location",
      "404"
    ], // Define namespaces
    defaultNS: "translation", // Default namespace
    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json", // Adjust load path for namespaces
    },
  })
  .then(() => updateContent());

// Function to update content dynamically
export const updateContent = () => {
  // For data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) {
      el.textContent = i18next.t(key); // Replace the content with the translation
    }
  });
  // For data-i18n-placeholder attribute
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) {
      el.setAttribute("placeholder", i18next.t(key));
    }
  });
};

export const updateActiveClass = () => {
  document.querySelectorAll(".lang-switch").forEach((el) => {
    const lang = el.querySelector("a").dataset.lang;
    if (lang === i18next.language) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
};

// Add event listeners for language switching
document.querySelectorAll(".lang-switch").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const newLang = e.target.dataset.lang;
    i18next.changeLanguage(newLang, () => {
      Cookies.set("lang", newLang, { expires: 365 });
      updateContent();
      updateActiveClass();
    });
  });
});

// Update active class when language changes
i18next.on("languageChanged", () => {
  const slider = jQuery("#slider-revolution");

  slider.revnext();

  updateActiveClass();
});

i18next.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng);
});

// Initial setup
updateActiveClass();

export default i18next;
