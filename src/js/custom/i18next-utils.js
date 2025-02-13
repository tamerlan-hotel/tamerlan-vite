import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";

i18next
  .use(I18NextHttpBackend)
  .init({
    lng: "ua",
    fallbackLng: "ua",
    ns: [
      "translation",
      "header",
      "footer",
      "activities",
      "about_us",
      "location",
    ], // Define namespaces
    defaultNS: "translation", // Default namespace
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Adjust load path for namespaces
    },
  })
  .then(() => {
    updateContent();
    return updatePlaceholder();
  });

// Function to update content dynamically
export const updateContent = () => {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) {
      el.textContent = i18next.t(key); // Replace the content with the translation
    }
  });
};

export const updatePlaceholder = () => {
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
    i18next.changeLanguage(e.target.dataset.lang, updateContent);
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
