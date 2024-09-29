import FormSection from "@/components/FormSection";
import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import ServicesSection from "@/components/ServicesSection";
import WorksCarousel from "@/components/WorksCarousel";
import getServices from "../../actions/getServices";
import FooterSection from "@/components/FooterSection";

export default async function Home() {
  const ServicesWithMasters = await getServices();

  return (
    <div>
      <Header />
      <IntroSection />
      <WorksCarousel />
      <ServicesSection />
      <FormSection services={ServicesWithMasters} />
      <FooterSection />
    </div>
  );
}
