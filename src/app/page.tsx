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
      <div className="blob top-left"></div>
      <Principal />
      <Plans />
      <AdvicePage />
      <div className="blob middle-left"></div>
      <ParagraphContainer />
      <Experience />
      <div className="blob middle-right"></div>
      <FAQ />
      <DividerReady />
      <Certifications />
      <div className="blob bottom-right"></div>
    </>
  );
}
