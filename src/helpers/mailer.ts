// import nodemailer from "nodemailer";
// import User from "@/models/user.model";
// import bcryptjs from "bcryptjs";

// export const sendEmail = async ({ email, emailType, userId }: any) => {
//   try {
//     const hashtoken = await bcryptjs.hash(userId.toString(), 10);

//     if (emailType === "VERIFY") {
//       await User.findByIdAndUpdate(
//         userId,
//         {
//           verifyToken: hashtoken,
//           verifyTokenExpire: Date.now() + 3600000,
//         },
//         { new: true }
//       );
//     } else if (emailType === "RESET") {
//       await User.findByIdAndUpdate(
//         userId,
//         {
//           forgetPasswordToken: hashtoken,
//           forgetPasswordTokenExpire: Date.now() + 3600000,
//         },
//         { new: true }
//       );
//     }

// var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: process.env.NODEMAILUSER,
//       pass: process.env.NODEMAILPASS,
//     }
//   });

//   const mailOptions = {
//     from: "jaman0120@gmail.com",
//     to: email,
//     subject: emailType === "VERIFY" ? "🔐 Verify Your Email Address" : "🔑 Reset Your Password",
//     html: `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
//         <header style="text-align: center; margin-bottom: 20px;">
//             <h1 style="color: #333;">${emailType === "VERIFY" ? "Email Verification" : "Password Reset"}</h1>
//         </header>
//         ${emailType === "VERIFY" &&
//           <main>
//           <p style="font-size: 16px; color: #555;">
//               ${emailType === "VERIFY" 
//                   ? "Thank you for signing up! Please verify your email address to activate your account." 
//                   : "We received a request to reset your password. If this was not you, please ignore this email."}
//           </p>
//           <p style="text-align: center; margin: 20px 0;">
//               <a href="${process.env.DOMAIN}/verifyemail?token=${hashtoken}" 
//                  style="text-decoration: none; color: #fff; background-color: #007BFF; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
//                  ${emailType === "VERIFY" ? "Verify My Email" : "Reset My Password"}
//               </a>
//           </p>
//           <p style="font-size: 14px; color: #999; text-align: center;">
//               Or copy and paste the link below into your browser:<br>
//               <a href="${process.env.DOMAIN}/verifyemail?token=${hashtoken}" style="color: #007BFF;">
//                   ${process.env.DOMAIN}/verifyemail?token=${hashtoken}
//               </a>
//           </p>
//       </main>
//         }
//         {emailType === "RESET" &&
//           <main>
//           <p style="font-size: 16px; color: #555;">
//               ${emailType === "VERIFY" 
//                   ? "Thank you for signing up! Please verify your email address to activate your account." 
//                   : "We received a request to reset your password. If this was not you, please ignore this email."}
//           </p>
//           <p style="text-align: center; margin: 20px 0;">
//               <a href="${process.env.DOMAIN}/forgetpassword?token=${hashtoken}" 
//                  style="text-decoration: none; color: #fff; background-color: #007BFF; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
//                  ${emailType === "VERIFY" ? "Verify My Email" : "Reset My Password"}
//               </a>
//           </p>
//           <p style="font-size: 14px; color: #999; text-align: center;">
//               Or copy and paste the link below into your browser:<br>
//               <a href="${process.env.DOMAIN}/forgetpassword?token=${hashtoken}" style="color: #007BFF;">
//                   ${process.env.DOMAIN}/verifyemail?token=${hashtoken}
//               </a>
//           </p>
//       </main>
//         }

//         <footer style="margin-top: 30px; text-align: center; font-size: 12px; color: #aaa;">
//             <p>If you did not request this email, no action is required.</p>
//             <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
//         </footer>
//     </div>
//     `,
// };


//     const mailresponse = await transport.sendMail(mailOptions);
//     console.log("Mail sent:", mailresponse);
//     return mailresponse;

//   } catch (error) {
//     console.error("Error sending email:", error);
//     return error;
//   }
// };

import nodemailer from "nodemailer";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashtoken = await bcryptjs.hash(userId.toString(), 10);

    // Update the user document based on the email type
    const updateFields =
      emailType === "VERIFY"
        ? { verifyToken: hashtoken, verifyTokenExpire: Date.now() + 3600000 }
        : { forgetPasswordToken: hashtoken, forgetPasswordTokenExpire: Date.now() + 3600000 };

    await User.findByIdAndUpdate(userId, updateFields, { new: true });

    // Configure nodemailer transport
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILUSER,
        pass: process.env.NODEMAILPASS,
      },
    });

    // Construct the email content
    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${hashtoken}`
        : `${process.env.DOMAIN}/forgetpassword?token=${hashtoken}`;

    const subject = emailType === "VERIFY" ? "🔐 Verify Your Email Address" : "🔑 Reset Your Password";

    const message = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <header style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333;">${emailType === "VERIFY" ? "Email Verification" : "Password Reset"}</h1>
        </header>
        <main>
            <p style="font-size: 16px; color: #555;">
                ${
                  emailType === "VERIFY"
                    ? "Thank you for signing up! Please verify your email address to activate your account."
                    : "We received a request to reset your password. If this was not you, please ignore this email."
                }
            </p>
            <p style="text-align: center; margin: 20px 0;">
                <a href="${link}" 
                   style="text-decoration: none; color: #fff; background-color: #007BFF; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
                   ${emailType === "VERIFY" ? "Verify My Email" : "Reset My Password"}
                </a>
            </p>
            <p style="font-size: 14px; color: #999; text-align: center;">
                Or copy and paste the link below into your browser:<br>
                <a href="${link}" style="color: #007BFF;">${link}</a>
            </p>
        </main>
        <footer style="margin-top: 30px; text-align: center; font-size: 12px; color: #aaa;">
            <p>If you did not request this email, no action is required.</p>
            <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        </footer>
    </div>
    `;

    const mailOptions = {
      from: "jaman0120@gmail.com",
      to: email,
      subject: subject,
      html: message,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Mail sent:", mailResponse);
    return mailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
    return error;
  }
};
