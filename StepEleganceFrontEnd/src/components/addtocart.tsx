import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {DeleteOutlined} from '@ant-design/icons';
import "./addtocart.css"
import TopBar from './topBar';
import FooterComp from './footerComp';


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

interface User {
  userId: number;
  firstName: string;
  lastName: string; 
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  role: string;
}

interface Cart{
  cartId: number;
  product: Product;
  user: User;
  quantity: number;
  date: string;
  amount: number;
}

const AddToCart: React.FC = () => {
  const [product, setAddToProduct] = useState<Product[]>([]);
  const [cart, setAddToCart] = useState<Cart[]>([]);

  const [editableCart, setEditableCart] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8087/cart/getAll');
        setAddToCart(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleDeleteTableCart = async (cartId: number) => {
    // Implement logic to delete the product
    // const updatedData = cartId.filter((product: { cartId: number; }) => product.cartId !== cartId);
    // setAddToCart(updatedData);
    const response = await axios.delete(`http://localhost:8087/cart/deleteById/${cartId}`)
    toast.done(response.statusText)
  };


  return (
    <>
    <TopBar/>
    <div className="bodyforcart">
      <h2 className='headeroftheaddtocart'>Cart List</h2>

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
          {cart.map((cart) => (
            <tr key={cart.product.productId}>
              <td>{cart.product.productId}</td>
              <td>
              <img src={`http://localhost:8087/${cart.product.productImage}`} alt={cart.product.productName} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{cart.product.productName}</td>
              <td>{cart.product.description}</td>
              <td>{cart.product.price}</td>
              <td>{cart.product.quantity}</td>
              <td>{cart.product.size}</td>
              <td>{cart.product.type}</td>
              <td>{cart.product.category}</td>
              <td>
                <Link to={`/cart/delete/${cart.product.productId}`}>
                <button><DeleteOutlined/></button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <a className='checkoutbttna' href="/checkout">
      <button className="checkoutbutton">Check-Out</button> </a>

      </div>
      <FooterComp/>
    </>
  );
};

export default AddToCart;