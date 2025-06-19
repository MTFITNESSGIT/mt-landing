import PaymentModel from "../../../models/Payment";
import dbConnect from "../../../utils/mongodb";
import { Resend } from "resend";
import { getMimeType } from "@/utils/getMimeType";
import { bucket } from "@/utils/firebaseBucket";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  const body = await request.json();
  const response = NextResponse.json(
    { message: "Email process started" },
    { status: 200 }
  );

  // Background task
  setImmediate(async () => {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const paymentRecord = await PaymentModel.findOne({
        paymentId: body.paymentId,
      });

      if (!paymentRecord) {
        console.error("❌ Payment not found in DB.");
        return;
      }

      const firebaseFolder = paymentRecord.firebase_folder || "";

      const [files] = await bucket.getFiles({ prefix: firebaseFolder });
      const pdfFiles = files.filter((file) => !file.name.endsWith("/"));

      const attachments = await Promise.all(
        pdfFiles.map(async (file) => {
          const [buffer] = await file.download();
          const filename = file.name.split("/").pop() || "archivo.pdf";
          return {
            filename,
            content: buffer.toString("base64"),
            contentType: getMimeType(filename),
            encoding: "base64",
          };
        })
      );

      if (attachments.length === 0) {
        console.error("❌ No files found for attachments. Email not sent.");
        return;
      }

      await resend.emails.send({
        from: "soporte@tomymedina.com",
        to: "juansegundomartinez7@gmail.com",
        subject: "Renvio de plan",
        html: `
        <html>
          <body style="margin: 0; padding: 0; background-color: #000000;" bgcolor="#000000">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" bgcolor="#000000" style="background-color: #000000; width: 100%;">
              <tr>
                <td align="center">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #000000; padding: 30px; border-radius: 10px;">
                    <tr>
                      <td align="center" style="padding-bottom: 30px;">
                        <img src="https://www.tomymedina.com/imgs/logo.png" alt="Logo" style="max-width: 140px;" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h1 style="color: #da0504cc44567890; text-align: center; font-size: 28px; margin-bottom: 20px; font-family: Arial, sans-serif;">
                          ¡Muchas gracias por tu compra!
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: #1a1a1a; border-radius: 8px; padding: 20px; text-align: center;">
                        <p style="margin: 10px 0; font-size: 16px; color: #ffffff; font-family: Arial, sans-serif;">
                          Te agradezco por confiar en mí para acompañarte en tu proceso de entrenamiento.
                        </p>
                        <p style="margin: 10px 0; font-size: 16px; color: #ffffff; font-family: Arial, sans-serif;">
                          Te adjunto el plan <strong>${paymentRecord.title} - ${paymentRecord.category.toUpperCase()}</strong>
                        </p>
                        <p style="margin: 10px 0; font-size: 14px; color: #cccccc; font-family: Arial, sans-serif;">
                          Cualquier duda que tengas, no dudes en escribirme. ¡Estoy para ayudarte!
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: center; font-size: 12px; color: #777777; margin-top: 30px; padding-top: 30px; font-family: Arial, sans-serif;">
                        © 2025 Tomy Medina | Todos los derechos reservados
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
        attachments,
      });

      console.log("📤 Email sent successfully.");
    } catch (error) {
      console.error("❌ Background task failed:", error);
    }
  });

  // Respond immediately
  return response;
}
