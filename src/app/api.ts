import { MercadoPagoConfig, Preference } from "mercadopago";
import { TPlan } from "../types";

export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const capitalize = (str?: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

export const MercadoPagoLink = async (plan: TPlan) => {
  const firebaseFolder = `${plan?.type === "Muscular" ? "Musculo" : "Grasa"}${capitalize(plan?.category)}`;
  const preference = await new Preference(mercadopago).create({
    body: {
      items: [
        {
          id: plan.title,
          unit_price: 10,
          quantity: 1,
          title: plan.title + " - " + plan.category?.toUpperCase(),
        },
      ],
      metadata: {
        firebaseFolder,
        title: plan.title,
        category: plan.category,
      },
      auto_return: "approved",
      back_urls: {
        success: `https://www.tomymedina.com/thank-you`,
      },
    },
  });

  return preference.init_point!;
};
