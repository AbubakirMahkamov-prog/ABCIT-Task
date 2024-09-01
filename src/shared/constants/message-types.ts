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