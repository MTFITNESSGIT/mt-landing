import AdvicePage from "@/components/AdvicePage";
import Certifications from "@/components/Certifications";
import DividerReady from "@/components/DividerReady";
import Experience from "@/components/Experience";
import FAQ from "@/components/FAQ";
import ParagraphContainer from "@/components/ParagraphContainer";
import Plans from "@/components/Plans";
import Principal from "@/components/Principal";

export default function Home() {
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
    </>
  );
}
