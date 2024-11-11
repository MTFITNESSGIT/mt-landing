import { MercadoPagoConfig, Preference } from "mercadopago";
import { TPlan } from "../types";

export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export const MercadoPagoLink = async (plan: TPlan) => {
  const preference = await new Preference(mercadopago).create({
    body: {
      items: [
        {
          id: plan.title,
          unit_price: 10,
          quantity: 1,
          title: plan.title,
        },
      ],
      metadata: {
        plan,
      },
      auto_return: "approved",
      back_urls: {
        success: `https://www.tomymedina.com/thank-you?type=${plan.type}&category=${plan.category}`,
      },
    },
  });

  return preference.init_point!;
};
