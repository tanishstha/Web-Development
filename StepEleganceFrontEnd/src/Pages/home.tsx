
import "./home.css";
import TopBar from "../components/topBar";
import FooterComp from "../components/footerComp";
import Products from "../components/card";
import Slideshow from "../components/slideshow";

function Home() {
  return (
    <><div className="homepagetopbar">
        <TopBar />
    </div>

    <div className="ads">
      
      <Slideshow/>
      <p className="ourproducts">
        Our Products
      </p>
    </div>
      

      <div className="bodysec">
        <div className="productdisplay">
          <Products/>
        </div>
      </div>

      <div className="homepagefooter">
      <FooterComp />
      </div>
      
    </>
  );
}
export default Home;
