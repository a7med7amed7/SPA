"use client";
import Navbar from '@/app/components/Navbar';
import styles from './page.module.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function Page() {

    const [product, setProduct] = useState(null); // Initial state set to `null` instead of `{}`.
    const [loaded, setLoaded] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const params = useParams();
    const { id } = params;
    const [message, setMessage] = useState(null);
    // Track if the component has mounted on the client-side.
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Fetch product data after the component mounts on the client.
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/v1/cartItems/${id}`);
                const data = await res.json();
                setProduct(data.data[0]); // Assuming `data.data` contains the product details
                console.log(data.data);
            } catch (err) {
                console.error('Fetch error:', err);
            }
            setLoaded(true);
        };

        if (id) {
            getProduct();
        }
    }, [id]);

    if (!hasMounted) return null; // Return nothing until mounted to avoid SSR mismatch

    const handleAddToCart = async (e) => {
        console.log(product);
        const data = { quantity };
        try {
            const res = await fetch(`http://localhost:3000/api/v1/cartItems/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log(res);

            setMessage("Quantity Updated")
        } catch (error) {
            console.error('Error adding to cart:', error);
            setMessage("Failed to update")

        }
    };
    return (
        <div className={styles.container}>
            {message ? <div style={{ padding: "3px", backgroundColor: "green", color: "white", textAlign: "center" }}>{message}</div> : ""}
            <h1 className={styles.title}>Product</h1>
            {loaded ? (
                product ? (
                    <div className={styles.productDetails}>
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price}</p>
                        <p>Available: {product.stock + product.quantity} pieces</p>
                    </div>
                ) : (
                    <p>Product not found</p>
                )
            ) : (
                <div>Loading...</div>
            )}
            <hr />
            <h4 style={{ marginTop: "15px" }}>Add The Quantity</h4>
            <input type='number' className={styles.quantityInput} placeholder='1' value={quantity} onChange={(e) => setQuantity(Math.min(product.stock + product.quantity, Math.max(1, e.target.value)))} />
            <div onClick={handleAddToCart} className={styles.addToCart}>Update</div>
        </div>
    );
}

export default Page;
