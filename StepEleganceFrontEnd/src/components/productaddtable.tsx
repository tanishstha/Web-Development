import axios from "axios";
import './productaddtable.css';
import  { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export interface Product {
    productImage: string;
    productName: string;
    description: string;
    price: number;
    quantity: number;
    size: string;
    type: string;
    category: string;
}

function ProductAddTable() {

    const navigate = useNavigate()
    const [formValue, setFormValue] = useState<Product>({
        productImage: '',
        productName: '',
        description: '',
        price: 0,
        quantity: 0,
        size: '',
        type: '',
        category: ''
    });
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const { productName, quantity, size, type, category, description, price } = formValue;


    const [productImage, setProductImage] = useState<File | null>(null);
    const [productImgPreview, setProductImgPreview] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValue((prevFormValue) => ({ ...prevFormValue, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProductImgPreview(reader.result as string);
                setProductImage(file);
            };
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!productName || !quantity || !size || !type || !category || !description || !price || !productImage) {
            toast.error('Please enter all fields!');
            return;
        }

        setIsLoading(true)

    
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('size', size);
        formData.append('quantity', String(quantity));
        formData.append('type', type);
        formData.append('category', category);
        formData.append('price', String(price));
        formData.append('productImage', productImage);
    
        try {
            const res = await axios.post('http://localhost:8087/product/save', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('res', res);

            const data = res.data;
            console.log('data', data);
            toast.success('Product saved successfully!');
            navigate( "/")


        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while saving the product.');
        setIsLoading(false)

        }
    };
    
    

    return (
        <>
            

            <div className="form-container">
                <h2 className="add-product-header">Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="insideformofaddproduct">

                        <label className="productlabel">Product Image:</label>
                        {productImgPreview && (
                            <img src={productImgPreview} alt="productImg" />
                        )}
                        <input
                            className="inputforproduct" id="img-box-size" name="productImage" onChange={handleFileChange}
                            type="file" accept="image/*" width="30%" height="50%"
                        />
                        <label className='productlabel'>Product Name:</label>
                        <input className='inputforproduct' name="productName" value={productName} onChange={handleChange}
                            type="text"
                        />
                        <label className='productlabel'>Description:</label>
                        <input className='inputforproduct' name="description" value={description} onChange={handleChange}
                        />
                        <label className='productlabel'>Price:</label>
                        <input className='inputforproduct' name="price"  value={price} onChange={handleChange}
                            type="number"
                        />
                        <label className='productlabel'>Quantity:</label>
                        <input className='inputforproduct' name="quantity"  value={quantity} onChange={handleChange}
                            type="number"
                        />
                        <label className='productlabel'>Size:</label>
                        <input className='inputforproduct' name="size"  value={size} onChange={handleChange}
                            type="text"
                        />
                        <label className='productlabel'>Type:</label>
                        <input className='inputforproduct' name="type"  value={type} onChange={handleChange}
                            type="text"
                        />
                        <label className='productlabel'>Category:</label>
                        <input className='inputforproduct' name="category"  value={category} onChange={handleChange}
                            type="text"
                        />
                    </div>
                <button type="submit" className='bttnaddproduct' >{isLoading && <span>Loading....</span>}Add Product</button>

                </form>
            </div>
        </>
    );
}


export default ProductAddTable;
