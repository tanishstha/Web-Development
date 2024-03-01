import { useRef, useState } from "react";
import "./about.css";
import Logo from "../assets/logo.png";
import imp from "../assets/imp.png";
import D2D from "../assets/D2D.png";
import Quality from "../assets/quality.png";
import FooterComp from "../components/footerComp";
import TopBar from "../components/topBar";

function about() {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleDropdown = (State: boolean) => {
    setOpen(!State);
  };
  const handleClickoutsideDropdown = (e: any) => {
    if (open && !dropdownRef.current?.contains(e.target as Node)) {
      console.log("Clicked active");
    }
  };
  window.addEventListener("click", handleClickoutsideDropdown);
  console.log(open);

  return (
    <>
      <TopBar />

      <div className="about">
        <h2>About Page</h2>
        <div className="box1">
          <div className="description">
            <p>
              Welcome to Shoe Elegance, where fashion meets comfort! At Shoe
              Elegance, we believe that the right pair of shoes can elevate your
              style and keep you comfortable throughout the day.
              <br />
              Our mission is to provide a wide range of high-quality footwear
              for every occasion. Whether you're looking for trendy sneakers,
              running shoes for your active lifestyle, or stylish sandals for
              casual outings, we have it all.
              <br />
            </p>
          </div>
          <div className="img">
            <img src={Logo} alt="" />
          </div>
        </div>
      </div>
      <div className="ourservices">
        <h2 className="services">Our Services</h2>
        <p>
          Embrace the experience and let us elevate your journey towards
          fashion.
        </p>
        <div className="gridbox">
          <div className="d2d">
            <img src={D2D} alt="door2door" width="500" />
          </div>
          <div className="import">
            <img src={imp} alt="import" width="500" />
          </div>
          <div className="quality-product"></div>
          <img src={Quality} alt="quality" width="500" />
        </div>
      </div>
      <FooterComp />
    </>
  );
}
export default about;
