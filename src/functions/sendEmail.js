import nodemailer from "nodemailer";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const {
    user_name,
    user_email,
    email_subject,
    email_message,
    recaptcha_token,
  } = JSON.parse(event.body);

  // Verify reCAPTCHA token
  const recaptchaSecret = "6LeDNuQqAAAAAAZ08cO-mnxR8UDScs97R9eIi4ZP";
  const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptcha_token}`,
    { method: "POST" }
  );

  const recaptchaResult = await recaptchaResponse.json();

  console.log("RECAPTCHA RESULT:", recaptchaResult);

  if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
    return {
      statusCode: 400,
      body: "Failed reCAPTCHA validation.",
    };
  }

  if (!user_name || !user_email || !email_subject || !email_message) {
    return {
      statusCode: 400,
      body: "All fields are required.",
    };
  }

  const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "smtp@mailtrap.io",
      pass: "cf690bc57cdb747a43c057ef45f1bdf9",
    },
  });

  const mailOptions = {
    // this is required format for mailtrap
    // maybe can test other but info
    from: "info@demomailtrap.com",
    to: process.env.EMAIL_USER,
    subject: email_subject,
    text: `From: ${user_name}\nEmail: ${user_email}\n\n${email_message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: "Email sent successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "Failed to send email.",
    };
  }
};
