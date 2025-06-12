import { bucket } from "@/utils/firebaseBucket";
import { getMimeType } from "@/utils/getMimeType";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const firebaseFolder = `MusculoPrincipiante`;
  const [files] = await bucket.getFiles({ prefix: firebaseFolder });

  const pdfFiles = files.filter((file) => !file.name.endsWith("/")).slice(0, 3); // limit to 3 files

  if (pdfFiles.length === 0) {
    console.error("❌ No files found for attachments. Aborting email.");
    return NextResponse.json({ error: "No files to send" }, { status: 400 });
  }

  const sendResults = [];

  for (let i = 0; i < pdfFiles.length; i++) {
    const file = pdfFiles[i];
    const [buffer] = await file.download();
    const filename = file.name.split("/").pop() || "archivo.pdf";

    const attachment = {
      filename,
      content: buffer.toString("base64"),
      contentType: getMimeType(filename),
      encoding: "base64",
    };

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px; background-color: #000; border-radius: 8px; padding: 20px;">
          <img src="https://www.tomymedina.com/imgs/logo.webp" alt="Logo" style="max-width: 150px;" />
        </div>
        <h1 style="color: #333; text-align: center;">¡Pago Exitoso!</h1>
        <div style="background-color: #f8f8f8; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="margin: 10px 0;">¡Gracias por tu compra!</p>
          <p style="margin: 10px 0;">Adjuntamos el plan <strong>${filename}</strong></p>
        </div>
        <p style="text-align: center; color: #666;">Si tienes alguna duda, contacta con nuestro equipo de soporte.</p>
      </div>
    `;

    try {
      const to = "mtfitness0@gmail.com"; // fallback
      const response = await resend.emails.send({
        from: "soporte@tomymedina.com",
        to,
        subject: "Pago Exitoso",
        html: htmlContent,
        attachments: [attachment],
      });
      sendResults.push({ to, status: "success", response });
    } catch (err) {
      sendResults.push({ status: "error", error: err });
    }
  }

  return NextResponse.json({
    success: true,
    message: "Emails processed",
    results: sendResults,
  });
}
