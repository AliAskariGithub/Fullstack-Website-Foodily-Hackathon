import Chiefs from "@/components/Chiefs";
import Feedback from "@/components/Feeback";
import FoodView from "@/components/FoodView";
import MainSection from "@/components/MainSection";
import Slider from "@/components/Slider";
import { fetchFoods } from "@/sanity/lib/fetchquires/food";
import { Chakra_Petch } from "next/font/google";

const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

export default async function Home() {
  const foods = await fetchFoods();

  return (
    <>
      <div className="flex flex-col max-h-full px-4 w-full pl-16">

        <MainSection />
        <div className="space-y-40 mt-10">
          <Slider />
          <div>
            <h1
              className={`text-6xl font-bold text-center mb-8 text-[#8f613c] relative z-10 ${chakra_petch.className}`}>
              Special Foods
            </h1>
            <FoodView foods={foods} />
          </div>
          <Feedback />
          <Chiefs />
        </div>
      </div>
    </>
  );
}
