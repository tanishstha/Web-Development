import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Editproducttable from './Editproducttable';

interface Product {
  productId: number;
  productImage: string;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  size: string;
  type: string;
  category: string;
}

const ProductListTable: React.FC = () => {
  const [product, setProductList] = useState<Product[]>([]);
  const [editableProduct, setEditableProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8087/product/getAll');
        setProductList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleDeleteTableProduct = async (productId: number) => {
    // Implement logic to delete the product
    // const updatedData = productId.filter((product: { productId: number; }) => product.productId !== productId);
    // setProductList(updatedData);
    const response = await axios.delete(`http://localhost:8087/product/deleteById/${productId}`)
  };

  const handleSaveProduct = () => {
    // Implement logic to save edited product details to the backend or update state
    setEditableProduct(null);
  };
  return (
    <>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Size</th>
            <th>Type</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {product.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>
              <img src={`http://localhost:8087/${product.productImage}`} alt={product.productName} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{product.productName}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.size}</td>
              <td>{product.type}</td>
              <td>{product.category}</td>
              <td>
                <Link to={`/edit/product/${product.productId}`}>
                <button>Edit</button>
                </Link>
                <button onClick={() => handleDeleteTableProduct(product.productId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </>
  );
};

export default ProductListTable;

