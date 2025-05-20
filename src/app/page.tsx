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
  console.log(process.env.RESEND_API_KEY, "RESEND_API_KEY");
  return (
    <>
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
