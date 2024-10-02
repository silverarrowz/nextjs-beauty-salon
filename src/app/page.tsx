import FormSection from "@/components/FormSection";
import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import ServicesSection from "@/components/ServicesSection";
import WorksCarousel from "@/components/WorksCarousel";
import getServices from "../../actions/getServices";
import FooterSection from "@/components/FooterSection";
import ContactsSection from "@/components/ContactsSection";
import Container from "@/components/Container";

export default async function Home() {
  const ServicesWithMasters = await getServices();

  return (
    <div className="grainy-light">
      <Container>
        <Header />
        <IntroSection />
        <WorksCarousel />
        <ServicesSection />
        <FormSection services={ServicesWithMasters} />
        <ContactsSection />
      </Container>

      <FooterSection />
    </div>
  );
}
