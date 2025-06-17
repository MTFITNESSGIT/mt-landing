// utils/sendPlanRequest.ts
export const sendPlanRequest = async (paymentId: string) => {
  console.log(paymentId, "paymentId sendPlan");

  const response = await fetch(`/api/resend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentId }),
  });

  if (!response.ok) {
    throw new Error("Error al enviar el plan");
  }

  return response.json();
};
