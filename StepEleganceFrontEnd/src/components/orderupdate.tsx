import React, { useState, useEffect } from 'react';
import './orderupdate.css';

interface OrderUpdateFormProps {
    order: {
        id: number;
        productName: string;
        quantity: number;
        size: string;
        category: string;
        customerName: string;
        status: string;
    } | null;
    onUpdateOrder: (updatedOrder: any) => void;
}

const OrderUpdate: React.FC<OrderUpdateFormProps> = ({ order, onUpdateOrder }) => {
    const [updatedOrder, setUpdatedOrder] = useState(order);

    useEffect(() => {
        // Update the component state when the order prop changes
        setUpdatedOrder(order);
    }, [order]);

    const handleUpdateOrder = () => {
        // Validate the updated order data if needed
        if (updatedOrder) {
            onUpdateOrder(updatedOrder);
        }
    };

    return (
        <div className='oderupdate'>
            <h2 className='headerforupdate'>Update Order</h2>
            {updatedOrder && (
                <>
                    <label className='labelforupdate'>Quantity:</label>
                    <input className='inputforlabel'
                        type="number"
                        value={updatedOrder.quantity}
                        onChange={(e) => setUpdatedOrder({ ...updatedOrder, quantity: parseInt(e.target.value, 10) })}
                    />
                    <label className='labelforupdate'>Size:</label>
                    <input className='inputforlabel'
                        type="text"
                        value={updatedOrder.size}
                        onChange={(e) => setUpdatedOrder({ ...updatedOrder, size: e.target.value })}
                    />
                    <label className='labelforupdate'>Category:</label>
                    <input className='inputforlabel'
                        type="text"
                        value={updatedOrder.category}
                        onChange={(e) => setUpdatedOrder({ ...updatedOrder, category: e.target.value })}
                    />
                    <button className='buttonforupdate'onClick={handleUpdateOrder}>Update Order</button>
                </>
            )}
        </div>
    );
};

export default OrderUpdate;
