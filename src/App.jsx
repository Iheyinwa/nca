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
      <section className=" bg-slate-200 px-4 pt-10 py-[6rem] h-full">
        <div className="mx-4 lg:mx-auto lg:w-[85%]">
          <p className="font-bold text-5xl md:text-6xl leading-[60px] md:leading-[70px] font-dmSerif tracking-wider mb-6 lg:mb-10">
            Trending Districts
          </p>
          <TrendingDistricts
            dataAos="zoom-in"
            dataAosDuration="700"
            dataAosDelay="50"
          />
        </div>
      </section>

      <div className="h-[100px]"></div>

      <Steps />

      <div className="h-[200px]"></div>

      <Footer />
    </>
  );
}

export default App
