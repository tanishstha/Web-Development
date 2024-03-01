import axios from "axios";
import "./productaddtable.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export interface Product {
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

function Editproducttable() {
  const { id } = useParams();
  const navigate = useNavigate()

  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImgPreview, setProductImgPreview] = useState("");
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [editValue, setEditValue] = useState<Product>({
    productId: 0,
    productImage: "",
    productName: "",
    description: "",
    price: 0,
    quantity: 0,
    size: "",
    type: "",
    category: "",
  });

  console.log("editValue",editValue.productImage)

  const {productId,productName,price,description,quantity,size,type,category} = editValue


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8087/product/getById/${id}`);
        setEditValue(res.data);
      } catch (error:any) {
        console.error(error);
        toast.error("An error occurred from the server", error);
      }
    };
  
    if (id) {
      fetchData();
    }
  
    setEditValue({
      productName: editValue.productName || "",
      description: editValue.description || "",
      price: editValue.price || 0,
      type: editValue.type || "",
      category: editValue.category || "",
      size: editValue.size || "",
      quantity: editValue.quantity || 0,
    });
  
    setProductImgPreview(`http://localhost:8087/${editValue?.productImage}`);

  }, [id]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValue({ ...editValue, [name]: value });
  };
  
  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
  
    const editData = new FormData();
    editData.append('productId', String(productId));
    editData.append('productName', productName);
    editData.append('description', description);
    editData.append('size', size);
    editData.append('quantity', String(quantity));
    editData.append('type', type);
    editData.append('category', category);
    editData.append('price', String(price));
    editData.append('productImage', productImage);
  
    try {
      const res = await axios.post(`http://localhost:8087/product/save`, editData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = res.data;
      console.log("data", data);
      toast.success("Product edited successfully!");
      navigate("/updateproduct");
    } catch (error: any) {
      console.error(error);
      toast.error("An error occurred from the server", error);
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <div className="form-container">
        <h2 className="add-product-header">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="insideformofaddproduct">
            <label className="productlabel">Product Image:</label>
            {productImgPreview && (
              <img src={productImgPreview} alt="productImgPreviewImg" />
            )}

            <input
              className="inputforproduct"
              id="img-box-size"
              name="productImage"
              type="file"
              accept="image/*"
              width="30%"
              height="50%"
              onChange={handleInputFileChange}
            />
            <label className="productlabel">Product Name:</label>
            <input
              className="inputforproduct"
              name="productName"
              type="text"
              value={productName}
              onChange={handleInputChange}
            />
            <label className="productlabel">Description:</label>
            <input
              className="inputforproduct"
              name="description"
              value={description}
              onChange={handleInputChange}
            />
            <label className="productlabel">Price:</label>
            <input
              className="inputforproduct"
              name="price"
              type="number"
              value={price}
              onChange={handleInputChange}
            />
            <label className="productlabel">Quantity:</label>
            <input
              className="inputforproduct"
              name="quantity"
              type="number"
              value={quantity}
              onChange={handleInputChange}
            />
            <label className="productlabel">Size:</label>
            <input
              className="inputforproduct"
              name="size"
              type="text"
              value={size}
              onChange={handleInputChange}
            />
            <label className="productlabel">Type:</label>
            <input
              className="inputforproduct"
              name="type"
              type="text"
              value={type}
              onChange={handleInputChange}
            />
            <label className="productlabel">Category:</label>
            <input
              className="inputforproduct"
              name="category"
              type="text"
              value={category}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="bttnaddproduct">
            {isLoading && <span>Loading....</span>}Edit
          </button>
        </form>
      </div>
    </>
  );
}

export default Editproducttable;
