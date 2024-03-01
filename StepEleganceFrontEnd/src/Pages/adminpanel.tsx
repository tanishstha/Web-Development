import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./adminpanel.css";

function AdminPanel() {
    enum ProductType {
        SHOE = "SHOE",
        ACCESSORIES = "ACCESSORIES"
    }
    enum ProductCategory {
        MEN = "MEN",
        WOMEN = "WOMEN",
        KIDS = "KIDS"
    }

    interface ProductData {
        productName: string;
        productImage: File | Blob;
        description: string;
        price: number;
        quantity: number;
        size: number;
        type: ProductType;
        category: ProductCategory;
    }

    const { data } = useQuery({
        queryKey: ["GET_DATA"],
        queryFn() {
            return axios.get("http://localhost:8087/product/getAll");
        },
    });

    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [productImage, setProductImage] = useState(''); // State for image URL

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product Information:", { productName, productImage, category, type, quantity, price, description });
    };
    console.log(data);

    return(
        <>
            <div className="topadmin">
                <header className="headadmin"> Admin Panel</header>
                <button className="MainDash" >
                    <a href="/">Dashboard</a>
                </button>
            </div>
            <div className="adminbox">
                <div className="buttonsleft">
                    <button className="product-bttn">Add Product</button>
                    <button className="product-bttn">Update Product</button>
                    <button className="product-bttn">Delete Product</button>
                </div>
                <form action="" className="adminform" onSubmit={handleSubmit} >
                    <div className="addproducts">
                        <input
                            className="detail-product-add"
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <input
                            className="detail-product-add"
                            type="text"
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <input
                            className="detail-product-add"
                            type="text"
                            placeholder="Type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <input
                            className="detail-product-add"
                            type="number"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <input
                            className="detail-product-add"
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="addimg-product">
                        <input
                            className="img-product-add"
                            type="file"
                            placeholder="Image"
                            onChange ={(e) => setProductImage(e.target.value)}
                        />
                        <input
                            className="description-product-add"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button className="add-bttn-submit" type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AdminPanel;
