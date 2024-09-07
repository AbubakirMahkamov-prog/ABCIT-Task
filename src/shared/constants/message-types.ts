export const confirmationMessage  = (confirmationLink:string):string => `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h1>Welcome to ABC IT team!</h1>
              <p>Hi there,</p>
              <p>We're excited to have you on board. To get started, please click the button below to confirm your email address:</p>
              <div style="text-align: center;">
                <a href="${confirmationLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Confirm Email</a>
              </div>
              <p>If you didn't sign up for an account with us, you can safely ignore this email.</p>
              <p>Thanks,<br/>ABC IT team</p>
            </div>
          `;


export const confirmationSubject = "Please, confirm your account."

export const sendConfirm = `Confirmation link sent to your email, Please confirm your email!`;

export const successMessage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Confirmation Success</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
    <div style="text-align: center; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #4caf50; margin-bottom: 20px;">Success!</h1>
        <p style="font-size: 16px; line-height: 1.6;">Your email has been successfully confirmed.</p>
        <p style="font-size: 16px; line-height: 1.6;">Thank you for verifying your email address. You can now <a href="#" style="color: #2196f3; text-decoration: none;">log in</a> to your account.</p>
    </div>
</body>
</html>
`