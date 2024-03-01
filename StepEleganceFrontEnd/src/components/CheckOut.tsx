import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CheckOut.css";
import { toast } from "react-toastify";
import TopBar from "./topBar";
import FooterComp from "./footerComp";

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

interface Cart {
  cartId: number;
  product: Product;
  user: User;
  quantity: number;
  date: string;
  amount: number;
}

const CheckOut: React.FC = () => {
  const [cart, setAddToCart] = useState<Cart[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("cash");
  const [selectedOnlineMethod, setSelectedOnlineMethod] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8087/cart/getAll");
        setAddToCart(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalPrice = () => {
    const subtotal = cart.reduce(
      (total, cartItem) => total + cartItem.amount,
      0
    );
    const discountPercentage = discount / 100;
    const vat = 0.13;

    const discountedPrice = subtotal * (1 - discountPercentage);
    const totalVAT = discountedPrice * vat;

    return (discountedPrice + totalVAT).toFixed(2);
  };

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPaymentMethod(event.target.value);
    setSelectedOnlineMethod("");
    setShowSuccessMessage(false); // Hide success message when changing payment method
  };

  const handleOnlineMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedOnlineMethod(event.target.value);
  };

  const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const discountValue = parseFloat(event.target.value);
    setDiscount(isNaN(discountValue) ? 0 : discountValue);
  };

  const handlePaymentResult = (isSuccess: boolean) => {
    if (isSuccess) {
      setShowSuccessMessage(true);
      // Display toast notification for payment success
      toast.success("Payment Successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setShowSuccessMessage(false);
      // Display toast notification for payment failure
      toast.error("Payment Unsuccessful. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  function renderQRCode(): React.ReactNode {
    // Implement your QR code rendering logic here
    return <div>QR Code Placeholder</div>;
  }

  return (
    <>
      <TopBar />
      <div className="bodyforcart">
        <h2 className="headeroftheaddtocart">Check-Out List</h2>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem) => (
              <tr key={cartItem.product.productId}>
                <td>{cartItem.product.productId}</td>
                <td>
                  <img
                    src={`http://localhost:8087/${cartItem.product.productImage}`}
                    alt={cartItem.product.productName}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="calculateprice">
          <label htmlFor="">Price: </label>
          <input type="text" value={calculateTotalPrice()} readOnly />
          <label htmlFor="">Discount (%): </label>
          <input type="text" value={discount} onChange={handleDiscountChange} />
          <label htmlFor="">VAT: </label>
          <input
            type="text"
            value={(parseFloat(calculateTotalPrice()) * 0.13).toFixed(2)}
            readOnly
          />
          <label htmlFor="">Total Price: </label>
          <input type="text" value={calculateTotalPrice()} readOnly />
        </div>

        <div className="payment-method">
          <h3>Select Payment Method:</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={selectedPaymentMethod === "cash"}
              onChange={handlePaymentMethodChange}
            />
            Cash
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={selectedPaymentMethod === "online"}
              onChange={handlePaymentMethodChange}
            />
            Online
          </label>
        </div>

        {selectedPaymentMethod === "online" && (
          <div className="online-methods">
            <h3>Select Online Payment Method:</h3>
            <label>
              <input
                type="radio"
                name="onlineMethod"
                value="khalti"
                checked={selectedOnlineMethod === "khalti"}
                onChange={handleOnlineMethodChange}
              />
              Khalti
            </label>
            <label>
              <input
                type="radio"
                name="onlineMethod"
                value="eSewa"
                checked={selectedOnlineMethod === "eSewa"}
                onChange={handleOnlineMethodChange}
              />
              eSewa
            </label>
          </div>
        )}

        {selectedPaymentMethod === "online" && selectedOnlineMethod && (
          <div className="qr-code">{renderQRCode()}</div>
        )}

        <button
          className="checkoutbutton"
          onClick={() => handlePaymentResult(true)}
        >
          Payment Success
        </button>

        <a className="checkoutbttna" href="/">
          <button className="checkoutbutton">Home</button>
        </a>

        <a className="checkoutbttna" href="/addtocart">
          <button className="checkoutbutton">Back</button>
        </a>
      </div>
      <FooterComp />
    </>
  );
};

export default CheckOut;
