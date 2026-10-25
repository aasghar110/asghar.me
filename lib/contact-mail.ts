import nodemailer from "nodemailer";
import { contactDestination, gmailCredentials } from "./contact";
import type { ContactFields } from "./contact-validation";

export async function sendContactMail(fields: ContactFields) {
  const { user, pass } = gmailCredentials();
  if (!user || !pass) throw new Error("Gmail is not configured");
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  const result = await transporter.sendMail({
    from: { name: "Ali Asghar Portfolio", address: user },
    to: contactDestination,
    replyTo: fields.email,
    subject: `Portfolio enquiry: ${fields.subject}`,
    text: `From: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`,
  });
  return result.accepted.some(
    (address) => address.toLowerCase() === contactDestination.toLowerCase(),
  );
}
