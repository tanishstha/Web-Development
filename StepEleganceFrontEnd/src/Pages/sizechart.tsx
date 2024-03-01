
import TopBar from "../components/topBar"; 
import sizechart from "../assets/Shoe/sizechart2.png";
import "./sizechart.css"
import sizechart0 from "../assets/shoe/sizechart1.png";

function Sizechart() {
  return (
    <>
        <TopBar/>
      <img src={sizechart} alt="Sizechart" className="sizechart" height={400}/>
      <img src={sizechart0} alt="Sizechart" className="sizechart0" height={400}/>
      <button className="add-to-bag">Add to bag</button>
      <button className="favourite">Favourite</button>
      
     



      

    
    </>
  );
}
export default Sizechart;
