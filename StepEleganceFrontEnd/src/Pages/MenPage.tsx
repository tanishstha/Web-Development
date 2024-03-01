import React, { useEffect, useState } from "react";
import FooterComp from "../components/footerComp";
import axios from "axios";
import TopBar from "../components/topBar";

interface Product {
  id: number;
  productImage: string;
  productName: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="hello">
    <img
      src={`http://localhost:8087/${product.productImage}`}
      width={100}
      height={100}
      alt="productImg"
    />
    <h3 className="productheadername">{product.productName}</h3>
    <p className="priceofproduct">Price: Rs.{product.price}</p>
    {/* Add more product details as needed */}
    <div className="buttntobuy">
      <button className="addcartbttn">Buy Now</button>
      <button className="addcartbttn">Add to Cart</button>
    </div>
  </div>
);

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8087/product/getByCategory/MEN"
        );

        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TopBar />
      <div className="containeroftheproduct">
        {products &&
          products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      <FooterComp />
    </>
  );
};

export default Products;
