import { useEffect } from 'react';
import HomeHero from './Components/homehero'
import Steps from './Components/steps'
import TrendingDistricts from './Components/trendingDistricts';
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from './Components/footer';

function App() {

  useEffect(()=>{
     AOS.init({
       duration: 200,
     });
  })

  return (
    <>
      <HomeHero />
      <div className="h-[100px]"></div>

      <section className="mx-4 md:mx-10">
        <p className="font-bold leading-[58px] text-3xl md:text-6xl font-barlow py-2">
          Trending Districts
        </p>
        <TrendingDistricts
          dataAos="zoom-in"
          dataAosDuration="700"
          dataAosDelay="50"
        />
      </section>

      <div className="h-[200px]"></div>

      <Steps />
      <Footer />
    </>
  );
}

export default App
