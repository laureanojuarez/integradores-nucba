import {FilmsBanner} from "../../components/Carousel/FilmsBanner";
import {FilmsSection} from "../../components/Films/FilmsSection";
import Layout from "../../components/Layout/Layout";

export default function Home() {
  return (
    <Layout>
      <FilmsBanner />
      <FilmsSection />
      <FilmsSection />
    </Layout>
  );
}
