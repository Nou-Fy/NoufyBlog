import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, subject, message } = await req.json();

    // 1. Configuration du transporteur (Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 2. Contenu de l'e-mail
    const mailOptions = {
      from: process.env.GMAIL_USER, // Gmail force l'utilisation de l'email authentifié
      to: "nantsoinaharimanana@gmail.com", // Votre adresse de réception
      replyTo: email, // Permet de répondre directement à l'expéditeur
      subject: `[NoufyBlog] ${subject}`,
      text: `Nouveau message de : ${email}\n\nMessage :\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #059669;">Nouveau message de contact</h2>
          <p><strong>Expéditeur :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    // 3. Envoi
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email envoyé avec succès" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur Nodemailer:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'envoi de l'e-mail" },
      { status: 500 },
    );
  }
}
