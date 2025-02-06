import React from "react";
import "./ui/banner.css";
import Image from "next/image";
import { Chakra_Petch } from "next/font/google";

const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

const MainSection = () => {
  return (
    <div className="banner">
      <div className="slider" style={{ "--quantity": 10 } as React.CSSProperties}>
        <div className="item" style={{ "--position": 1 } as React.CSSProperties}>
          <Image src="/images/showcase1.png" alt="" width={1000} height={1000} />
        </div>
        <div className="item" style={{ "--position": 2 } as React.CSSProperties}>
          <Image src="/images/showcase2.png" alt="" width={1000} height={1000} />
        </div>
        <div className="item" style={{ "--position": 3 } as React.CSSProperties}>
          <Image src="/images/showcase3.png" alt="" width={1000} height={1000} />
        </div>
        <div className="item" style={{ "--position": 4 } as React.CSSProperties}>
          <Image src="/images/showcase4.png" alt="" width={1000} height={1000} />
        </div>
        <div className="item" style={{ "--position": 5 } as React.CSSProperties}>
          <Image src="/images/showcase5.png" alt="" width={1000} height={1000} />
        </div>
        <div className="item" style={{ "--position": 6 } as React.CSSProperties}>
          <Image src="/images/showcase6.png" alt="" width={1000} height={1000} />
        </div>
        <div className="item" style={{ "--position": 7 } as React.CSSProperties}>
          <Image src="/images/showcase7.png" alt="" width={1000} height={1000} />
        </div>
        <div className="item" style={{ "--position": 8 } as React.CSSProperties}>
          <Image src="/images/showcase8.png" alt="" width={1000} height={1000} />
        </div>
        <div className="item" style={{ "--position": 9 } as React.CSSProperties}>
          <Image src="/images/showcase9.png" alt="" width={1000} height={1000} />
        </div>
        <div className="item" style={{ "--position": 10 } as React.CSSProperties}>
          <Image src="/images/showcase10.png" alt="" width={1000} height={1000} />
        </div>
      </div>

      <div className="content">
        <h1 className="relative z-20" data-content="Welcome">Welcome</h1>
        <h3 className={`relative z-2 right-40 text-[35em] text-[#8f613c] ${chakra_petch.className}`}>T
        <span className="relative z-2 left-96">O</span></h3>
        <div className="main-content">
          <h2 className="relative z-20">Foodily</h2>
          <p>
            <b className="relative z-20 text-[#e9b966]">Start to Eat healthy food from now.</b>
          </p>
        </div>
        <div className="model"></div>
      </div>
    </div>
  );
};

export default MainSection;
