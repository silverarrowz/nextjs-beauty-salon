import FormSection from "@/components/FormSection";
import Header from "@/components/Header";
import IntroSection from "@/components/IntroSection";
import ServicesSection from "@/components/ServicesSection";
import WorksCarousel from "@/components/WorksCarousel";
import getServices from "../../actions/getServices";
import FooterSection from "@/components/FooterSection";
import ContactsSection from "@/components/ContactsSection";
import Container from "@/components/Container";
import ScrollButton from "@/components/ScrollButton";

export default async function Home() {
  const ServicesWithMasters = await getServices();

  return (
    <div className="bg-background-bright">
      <Container>
        <Header />
      </Container>
      <IntroSection />
      <WorksCarousel />
      <Container>
        <ServicesSection />
        <FormSection services={ServicesWithMasters} />
      </Container>
      <ContactsSection />
      <FooterSection />
      <ScrollButton />
    </div>
  );
}
