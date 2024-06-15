const transporter = require("../configs/mail-transporter");
const CustomError = require("../utils/custom-error")

async function sendForgotPasswordMail({email,accessToken}) {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Change Password</title>
    </head>
    <body>
        <header>
            <h1>Change Password</h1>
        </header>
    
        <main>
            <section>
                <h3>Click Link to <a href="http://127.0.0.1:5500/frontend/pages/forgot_password.html?accessToken=${accessToken}">Change Password</a></h3>
            </section>
        </main>
    
    </body>
    </html>
    `;
    try {
        const info = await transporter.sendMail({
          from: `${process.env.EMAIL_ID}`,
          to: email,
          subject: "Change Password!!",
          html: htmlContent,
        });
        console.log("Change Password mail send successfully");
        return true;
    } catch (error) {
        throw new CustomError(503,error.message);
    }
}

async function sendSetPasswordMailForNewUser({email,accessToken}) {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Set Password</title>
    </head>
    <body>
        <header>
            <h1>Set Password</h1>
        </header>
    
        <main>
            <section>
                <h3>Click Link to <a href="http://127.0.0.1:5500/frontend/pages/set_password.html?accessToken=${accessToken}">Set Password</a></h3>
            </section>
        </main>
    
    </body>
    </html>
    `;
    try {
        const info = await transporter.sendMail({
          from: `${process.env.EMAIL_ID}`,
          to: email,
          subject: "Set Password!!",
          html: htmlContent,
        });
        console.log("Set Password mail send successfully");
        return true;
    } catch (error) {
        throw new CustomError(503,error.message);
    }
}


module.exports = Object.freeze({
    sendForgotPasswordMail,
    sendSetPasswordMailForNewUser
})