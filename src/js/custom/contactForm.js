/**
 * Contact Form Validation and Submission Script
 *
 * This script handles the validation and submission of a contact form.
 * It validates user inputs, displays error messages, and submits the form data
 * to a Netlify function endpoint with reCAPTCHA verification.
 */

import i18next from "i18next";

const errorBorderStyle = "1px solid red"; // Style for highlighting invalid fields

// Regular expression for email validation
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Displays an error message below the specified field
 * @param {HTMLElement} field - The form field that has an error
 * @param {string} message - The error message to display
 */
const showError = (field, message) => {
  // Add red border to the field
  field.style.border = errorBorderStyle;

  // Create error message element
  const errorSpan = document.createElement("span");
  errorSpan.setAttribute("data-i18n-error", message);
  errorSpan.className = "error";
  errorSpan.textContent = i18next.t(message);
  errorSpan.style.color = "red";

  // Insert error message after the field
  field.insertAdjacentElement("afterend", errorSpan);
};

document.addEventListener("DOMContentLoaded", () => {
  // Get the contact form element from the DOM
  const contactForm = document.getElementById("contact-form-id");

  // Exit early if the form doesn't exist on the page
  if (!contactForm) return;

  // Get form field elements
  const userName = document.getElementById("user_name");
  const userEmail = document.getElementById("user_email");
  const emailSubject = document.getElementById("email_subject");
  const emailMessage = document.getElementById("email_message");
  const submitButton = contactForm.querySelector("button[type=submit]");

  /**
   * Removes all error messages and styles from the form
   */
  const clearErrors = () => {
    // Remove all error message elements
    const errorMessages = contactForm.querySelectorAll(".error");
    errorMessages.forEach((msg) => msg.remove());

    // Reset the border style for all input fields
    [userName, userEmail, emailSubject, emailMessage].forEach((field) =>
      field.style.removeProperty("border")
    );
  };

  /**
   * Validates all form fields and displays error messages for invalid fields
   * @returns {boolean} - True if all fields are valid, false otherwise
   */
  const validateForm = () => {
    clearErrors(); // Remove any existing error messages
    let isValid = true;

    // Validate Name field
    if (!userName.value.trim()) {
      showError(userName, "location:error_name_required");
      isValid = false;
    }

    // Validate Email field - check for empty and valid format
    if (!userEmail.value.trim()) {
      showError(userEmail, "location:error_email_required");
      isValid = false;
    } else if (!isValidEmail(userEmail.value)) {
      showError(userEmail, "location:error_email_format");
      isValid = false;
    }

    // Validate Subject field
    if (!emailSubject.value.trim()) {
      showError(emailSubject, "location:error_subject_required");
      isValid = false;
    }

    // Validate Message field
    if (!emailMessage.value.trim()) {
      showError(emailMessage, "location:error_message_required");
      isValid = false;
    }

    return isValid;
  };

  /**
   * Handle form submission event
   */
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Stop submission if form validation fails
    if (!validateForm()) return;

    // Execute reCAPTCHA verification
    const token = await grecaptcha.execute(
      "6LeDNuQqAAAAAOrA5otIacy1wXHriwjGBxTZ7cYq", // reCAPTCHA site key
      {
        action: "submit",
      }
    );

    // Prepare form data for submission
    const formData = {
      safety_key: "dynatf", // Security key for the backend
      user_name: userName.value.trim(),
      user_email: userEmail.value.trim(),
      email_subject: emailSubject.value.trim(),
      email_message: emailMessage.value.trim(),
      recaptcha_token: token,
    };

    // Disable submit button and show loading message
    submitButton.disabled = true;
    const messageSpan = document.createElement("span");
    messageSpan.className = "form_msg";
    messageSpan.textContent = "Please wait...";
    submitButton.insertAdjacentElement("afterend", messageSpan);

    try {
      // Send form data to the Netlify function endpoint
      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Process the response
      const result = await response.text();
      const status = response.status;

      if (status === 200) {
        messageSpan.textContent = "Email sent successfully!";
        // On success: Remove message and reset form after delay
        setTimeout(() => {
          messageSpan.remove();
          // Clear all form fields
          [userName, userEmail, emailSubject, emailMessage].forEach((field) => {
            field.value = "";
          });
          submitButton.disabled = false;
        }, 3000);
      } else {
        messageSpan.textContent = "ERROR: Failed to send email.";
        messageSpan.style.color = "red";
        // On failure: Re-enable submit button
        submitButton.disabled = false;
      }
    } catch (error) {
      // Handle any exceptions during fetch
      console.error("Error submitting form:", error);
      messageSpan.textContent =
        "An unexpected error occurred. Please try again.";
      messageSpan.style.color = "red";
      submitButton.disabled = false;
    }
  });
});

export default {};
