import dotenv from "dotenv";
dotenv.config({
    path: "src/.env",
});
import nodemailer from "nodemailer";
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const emailRegister = async (userData) => {
    const { name, email, token } = userData;
    console.log(`Intentando enviar un correo electronico de activación al usuario ${email}`);
    // Envia el correo
    await transport.sendMail({
        from: "220103@utxicotepec.edu.mx", // Emitente
        to: email, // Destinatario
        subject: "RealEstate-220103: Verify your account.", // Asunto
        text: "Welcome to RealEstate-220103, to continue you are required to click on the link below to activate your account.", //Cuerpo
        html: `
        <html>
        <head>
          <style>
          body {
              font-family: sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f0eae4;
              letter-spacing: 1px;
              font-size: 2em;
          }
      
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
          }
      
          header {
              text-align: center;
              background-color: #026873;
              color: #ffffff;
              padding: 10px 0;
          }
      
          span {
              font-size: 18px;
              font-weight: normal;
              color: #000000;
          }
      
          p {
              font-size: 14px;
              color: #000000;
              text-align: justify;
              margin: 10px 0;
          }
      
          a {
              display: block;
              width: 200px;
              margin: 0 auto;
              background-color: #bf8c2c;
              color: #ffffff;
              border-radius: 10px;
              padding: 10px 20px;
              text-align: center;
              font-size: 16px;
              text-decoration: none;
              margin-top: 20px;
          }
      
          a:hover {
              background-color: #9f7526;
              box-shadow: 2px 2px 2px black;
          }
      
          fieldset {
            border: 10px double #bf8c2c;
            padding: 10px;
            border-radius: 2px;
          }
      
          footer {
              text-align: center;
              background-color: #026873;
              color: #ffffff;
              padding: 10px 0;
          }
      
          .signature {
              font-size: 14px;
              text-align: left;
              margin: 20px 0;
          }
      
          .resaltado {
              color: red;
              font-weight: bold;
          }
          </style>
        </head>
        <body>
          <div class="container">
            <header style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center;">
                <h1 style="font-size: 40px; font-weight: bold; color: #bf8c2c;">ㅤReal<span style="font-size: 40px;">Estate</span></h1>
              </div>
              <div style="align-items: center; margin-bottom: 20px; margin-right: auto; margin-left: auto;">
                <a href="#https://www.facebook.com/alexba2004/" style="text-decoration: none; color: #bf8c2c; margin-right: 5px; display: inline-block; width: 25px; height: 25px; background-color: #bf8c2c; border-radius: 10px 39px 0px 22px;">
                  <img src="https://cdn-icons-png.flaticon.com/128/1077/1077041.png" alt="Facebook" style="width: 25px; height: 25px" />
                </a>
                <a href="#https://www.instagram.com/alexba2004/" style="text-decoration: none; color: #bf8c2c; margin-right: 5px; display: inline-block; width: 25px; height: 25px; background-color: #bf8c2c; border-radius: 10px 39px 0px 22px;">
                    <img src="https://cdn-icons-png.flaticon.com/128/1077/1077042.png" alt="Twitter" style="width: 25px; height: 25px" />
                </a>
                <a href="#https://twitter.com/alexba2004" style="text-decoration: none; color: #bf8c2c; margin-right: 5px; display: inline-block; width: 25px; height: 25px; background-color: #bf8c2c; border-radius: 10px 39px 0px 22px;">
                    <img src="https://cdn-icons-png.flaticon.com/128/5968/5968958.png" alt="LinkedIn" style="width: 25px; height: 25px" />
                </a>
                <a href="#https://github.com/alexba2004" style="text-decoration: none; color: #bf8c2c; margin-right: 5px; display: inline-block; width: 25px; height: 25px; background-color: #bf8c2c; border-radius: 10px 39px 0px 22px;">
                    <img src="https://cdn-icons-png.flaticon.com/128/1240/1240971.png" alt="LinkedIn" style="width: 25px; height: 25px" />
                </a>
              </div>
            </header>
            <fieldset>
              <legend align="center">New Account</legend>      
              <p style="font-size: 18px; margin-top: 20px;">Welcome to RealEstate-220103, ${name}!</p>
              <p>Thank you for choosing to search, sell, and buy properties. To continue using our platform, please click the link below to activate your account:</p>
              <a href = "http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/confirm/${token}">Click here to activate your account.</a>
              <div class="signature" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <p>Best regards,</p>
                <img src="https://avatars.githubusercontent.com/u/122334857?v=4" alt="Autor" style="width: 150px; height: auto; border-radius: 50%;" />
                <p>Jose Alejandro Briones Arroyo</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Alejandro_P%C3%A9rez_Lug%C3%ADn_firma.svg" alt="Firma" style="width: 200px; height: auto;" />
                <p>CEO of RealEstate-220103</p>
              </div>
              <p> <spam class="resaltado"><em>* If you did not create this account, please ignore this email.</em></spam></p>
        </div>
        </fieldset>
          <footer>
            &copy; RealEstate-220103, 2023.
          </footer>
        </body>
      </html>`,
    });
};

const emailPasswordRecovery = async (userData) => {
    const { name, email, token } = userData;
    console.log(`Intentando enviar un correo electronico dpara la recuperación de cuenta del usuario: ${email}`);
    // ENVIO DEL CORREO
    await transport.sendMail({
        from: "220103@utxicotepec.edu.mx", // Emitente
        to: email, // Destinatario
        subject: "RealEstate-220103: Reset your password.", // Asunto
        text: "Welcome back to RealEstate-220103, to recover your password click the link below to change it.", //Cuerpo
        html: `
        <html>
        <head>
          <style>
          body {
              font-family: sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f0eae4;
              letter-spacing: 1px;
              font-size: 2em;
          }
      
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
          }
      
          header {
              text-align: center;
              background-color: #026873;
              color: #ffffff;
              padding: 10px 0;
          }
      
          span {
              font-size: 18px;
              font-weight: normal;
              color: #000000;
          }
      
          p {
              font-size: 14px;
              color: #000000;
              text-align: justify;
              margin: 10px 0;
          }
      
          a {
              display: block;
              width: 200px;
              margin: 0 auto;
              background-color: #bf8c2c;
              color: #ffffff;
              border-radius: 10px;
              padding: 10px 20px;
              text-align: center;
              font-size: 16px;
              text-decoration: none;
              margin-top: 20px;
          }
      
          a:hover {
              background-color: #9f7526;
              box-shadow: 2px 2px 2px black;
          }
      
          fieldset {
            border: 10px double #bf8c2c;
            padding: 10px;
            border-radius: 2px;
          }
      
          footer {
              text-align: center;
              background-color: #026873;
              color: #ffffff;
              padding: 10px 0;
          }
      
          .signature {
              font-size: 14px;
              text-align: left;
              margin: 20px 0;
          }
      
          .resaltado {
              color: red;
              font-weight: bold;
          }
          </style>
        </head>
        <body>
          <div class="container">
            <header style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center;">
                <h1 style="font-size: 40px; font-weight: bold; color: #bf8c2c;">ㅤReal<span style="font-size: 40px;">Estate</span></h1>
              </div>
              <div style="align-items: center; margin-bottom: 20px; margin-right: auto; margin-left: auto;">
                <a href="#https://www.facebook.com/alexba2004/" style="text-decoration: none; color: #bf8c2c; margin-right: 5px; display: inline-block; width: 25px; height: 25px; background-color: #bf8c2c; border-radius: 10px 39px 0px 22px;">
                  <img src="https://cdn-icons-png.flaticon.com/128/1077/1077041.png" alt="Facebook" style="width: 25px; height: 25px" />
                </a>
                <a href="#https://www.instagram.com/alexba2004/" style="text-decoration: none; color: #bf8c2c; margin-right: 5px; display: inline-block; width: 25px; height: 25px; background-color: #bf8c2c; border-radius: 10px 39px 0px 22px;">
                    <img src="https://cdn-icons-png.flaticon.com/128/1077/1077042.png" alt="Twitter" style="width: 25px; height: 25px" />
                </a>
                <a href="#https://twitter.com/alexba2004" style="text-decoration: none; color: #bf8c2c; margin-right: 5px; display: inline-block; width: 25px; height: 25px; background-color: #bf8c2c; border-radius: 10px 39px 0px 22px;">
                    <img src="https://cdn-icons-png.flaticon.com/128/5968/5968958.png" alt="LinkedIn" style="width: 25px; height: 25px" />
                </a>
                <a href="#https://github.com/alexba2004" style="text-decoration: none; color: #bf8c2c; margin-right: 5px; display: inline-block; width: 25px; height: 25px; background-color: #bf8c2c; border-radius: 10px 39px 0px 22px;">
                    <img src="https://cdn-icons-png.flaticon.com/128/1240/1240971.png" alt="LinkedIn" style="width: 25px; height: 25px" />
                </a>
              </div>
            </header>
            <fieldset>
              <legend align="center">Change Password</legend>      
              <p style="font-size: 18px; margin-top: 20px;">Welcome back to RealEstate-220103, ${name}!</p>
              <p>Thank you for choosing to search, sell, and buy properties. To recover your account, click the following link to change your password:</p>
              <a href = "http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/update-password/${token}">Click here to change your password.</a>
              <div class="signature" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <p>Best regards,</p>
                <img src="https://avatars.githubusercontent.com/u/122334857?v=4" alt="Autor" style="width: 150px; height: auto; border-radius: 50%;" />
                <p>Jose Alejandro Briones Arroyo</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Alejandro_P%C3%A9rez_Lug%C3%ADn_firma.svg" alt="Firma" style="width: 200px; height: auto;" />
                <p>CEO of RealEstate-220103</p>
              </div>
              <p> <spam class="resaltado"><em>* If you did not want to change your password, please ignore this email.</em></spam></p>
        </div>
        </fieldset>
          <footer>
            &copy; RealEstate-220103, 2023.
          </footer>
        </body>
      </html>`,
    });
};

export { emailRegister, emailPasswordRecovery };
