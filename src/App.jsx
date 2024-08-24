import HomeHero from './Components/homehero'
import Steps from './Components/steps'
import TrendingDistricts from './Components/trendingDistricts';

function App() {

  return (
    <>
      <HomeHero />
      <div className="h-[100px] bg-[#000]"></div>

      <section className="m-4 p-4">
        <p className="font-bold leading-[58px] text-[32px] md:text-[50px] font-syne py-2">
          Trending Districts
        </p>
        <TrendingDistricts />
      </section>
      
      <div className="h-[100px] bg-[#000]"></div>

      <Steps />
    </>
  );
}

export default App
