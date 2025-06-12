import { bucket } from "@/utils/firebaseBucket";
import { getMimeType } from "@/utils/getMimeType";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const firebaseFolder = `MusculoPrincipiante`;
  const [files] = await bucket.getFiles({ prefix: firebaseFolder });

  console.log(files, "✅ Files");

  const targetFilename =
    "MusculoPrincipiante/PLAN HIPERTROFIA - PRINCIPIANTES .pdf";
  const pdfFiles = files.filter((file) => file.name === targetFilename);

  const attachments = await Promise.all(
    pdfFiles.map(async (file) => {
      const [buffer] = await file.download();
      const filename = file.name.split("/").pop() || "file.pdf";
      return {
        filename,
        content: buffer.toString("base64"),
        contentType: getMimeType(filename),
        encoding: "base64",
      };
    })
  );

  if (attachments.length === 0) {
    console.error("❌ No files found for attachments. Aborting email.");
    return;
  }

  try {
    await resend.emails.send({
      from: "soporte@tomymedina.com",
      to: "juansegundomartinez7@gmail.com",
      subject: "Pago Exitoso",
      html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <img src="https://www.tomymedina.com/imgs/logo.webp" alt="Logo" style="max-width: 150px;" />
                </div>
                <h1 style="color: #333; text-align: center;">¡Pago Exitoso!</h1>
                <div style="background-color: #f8f8f8; border-radius: 8px; padding: 20px; margin: 20px 0;">
                  <p style="margin: 10px 0;">¡Gracias por tu compra!</p>
                  <p style="margin: 10px 0;">Adjuntamos el plan Prueba</p>
                </div>
                <p style="text-align: center; color: #666;">Si tienes alguna duda, contacta con nuestro equipo de soporte.</p>
              </div>
            `,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (emailError) {
    console.error("❌ Error sending email via Resend:", emailError);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
