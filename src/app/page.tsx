"use client";
import AdvicePage from "@/components/AdvicePage";
import Certifications from "@/components/Certifications";
import DividerReady from "@/components/DividerReady";
import Experience from "@/components/Experience";
import FAQ from "@/components/FAQ";
import ParagraphContainer from "@/components/ParagraphContainer";
import Plans from "@/components/Plans";
import Principal from "@/components/Principal";
import Whatsapp from "@/components/Whatsapp";

export default function Home() {
  const testPostRequest = async () => {
    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ testData: "Hello API" }),
      });

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button onClick={testPostRequest}>Test POST Request</button>

      <Principal />
      <Plans />
      <AdvicePage />
      <ParagraphContainer />
      <Experience />
      <FAQ />
      <DividerReady />
      <Certifications />
      <Whatsapp />
    </>
  );
}
