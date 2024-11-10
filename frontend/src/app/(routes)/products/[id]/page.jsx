"use client";
import Navbar from '@/app/components/Navbar';
import styles from './page.module.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function Page() {
    const [product, setProduct] = useState(null); // Initial state set to `null` instead of `{}`.
    const [loaded, setLoaded] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const params = useParams();
    const { id } = params;
    const [message, setMessage] = useState(null);
    const [hasError, setHasError] = useState(false);

    // Track if the component has mounted on the client-side.
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Fetch product data after the component mounts on the client.
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/v1/products/${id}`);
                const data = await res.json();
                setProduct(data.data[0]); // Assuming `data.data` contains the product details
                console.log(data.data);
            } catch (err) {
                console.error('Fetch error:', err);
            }
            setLoaded(true);
        };

        // Only fetch if `id` is available (important for SSR pages with dynamic routes)
        if (id) {
            getProduct();
        }
    }, [id]);

    // Prevent rendering during SSR until the component has mounted on the client
    if (!hasMounted) return null; // Return nothing until mounted to avoid SSR mismatch
    const handleAddToCart = async (e) => {
        const data = {
            userId: "1",
            productId: id,
            quantity: 1
        }
        const res = await fetch(`http://localhost:3000/api/v1/cartItems`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log(res, res.status);
        if (res.status === 200) {
            setHasError(false);
            setMessage("Added to cart")
        }
        else {
            setHasError(true);
            setMessage("Already in the cart")
        }

        console.log(res);
    }
    return (
        <div className={styles.container}>
            {message ? <div style={{ padding: "3px", backgroundColor: hasError ? "red" : "green", color: "white", textAlign: "center" }}>{message}</div> : ""}
            <h1 className={styles.title}>Product</h1>
            {loaded ? (
                product ? (
                    <div className={styles.productDetails}>
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price}</p>
                        <p>Available: {product.stock} pieces</p>
                    </div>
                ) : (
                    <p>Product not found</p>
                )
            ) : (
                <div>Loading...</div>
            )}
            <div onClick={handleAddToCart} className={styles.addToCart}>Add To Cart</div>
        </div>
    );
}

export default Page;
