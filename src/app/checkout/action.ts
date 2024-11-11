"use server";

import { TPlan } from "../../types";
import { MercadoPagoLink } from "../api";

export async function handleCheckout(selectedPlan: TPlan): Promise<string> {
  return await MercadoPagoLink(selectedPlan);
}
