"use client";
import Navbar from '@/app/components/Navbar';
import styles from './page.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CardImage from '../../../../public/laptop.jpg';
import Image from 'next/image';
export default function page() {
    const [products, setProducts] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [CVV, setCVV] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        const getCartItems = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/v1/cartItems/cart`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cartId: "1" })
                });
                const data = await res.json();
                console.log(data)
                setProducts(data.data);
            } catch (err) {
                console.error('Fetch error:', err);
            }
            setLoaded(true);
        };

        getCartItems();
    }, []);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        if (products) {
            let cnt = 0;
            console.log(products)
            for (let i = 0; i < products.length; i++) {
                let p = products[i];
                cnt += (p.price * p.quantity);
            }
            setTotalPrice(cnt);
        }
    }, [products])
    if (!hasMounted) return null;
    const handleClick = async () => {
        let myProducts = [];
        for (let i = 0; i < products.length; i++) {
            myProducts.push({
                productId: products[i].product_id,
                quantity: products[i].quantity
            })
        }
        const data = {
            userId: "1",
            // cardNumber,
            // expiryDate,
            // CVV,
            firstName,
            lastName,
            country,
            city,
            address,
            zipCode,
            phone: phoneNumber,
            email,
            products: myProducts
        }
        console.log(data);
        const res = await fetch(`http://localhost:3000/api/v1/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            setHasError(true);
            setMessage("Something went wrong, double check your data!");
            return;
        }

        const d = await res.json();  // Parse the response to JSON
        console.log(d);

        if (d.status === 1) {
            setHasError(false);
            setMessage("Your order is done, please check your email (+spam)");
        } else {
            setMessage(d.message);
            setHasError(true);
        }
        console.log(message);

    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cart</h1>
            {loaded ? (
                <ul className={styles.productList}>
                    {products ? products.map((product) => (
                        <li key={product.id} className={styles.productItem}>
                            <div className={styles.productItemLink}>
                                <div className={styles.productX}>X</div>
                                <div className={styles.imageContainer}>
                                    <Image src={CardImage} alt='Card Image' fill={true} />
                                </div>
                                <div className={styles.productData}>
                                    <h2>{product.name}</h2>
                                    <p className={styles.productColor}>White</p>
                                </div>
                                <div className={styles.productQuantity}>
                                    <Link href={`/cart/${product.product_id}`} style={{ color: "black", background: "#ddcaca", fontSize: "40px", padding: "8px 25px", margin: "0 6px" }}>-</Link>
                                    <div style={{ fontSize: "20px", margin: "0 8px" }}>
                                        {product.quantity}
                                    </div>
                                    <Link href={`/cart/${product.product_id}`} style={{ color: "black", background: "#ddcaca", fontSize: "40px", padding: "8px 20px", margin: "0 6px" }}>+</Link>
                                </div>
                                <p style={{ fontWeight: "bold" }}> {product.price}$</p>

                            </div>
                        </li>
                    )) : (
                        <div>Empty Cart</div>
                    )}
                </ul>
            ) : (
                <div>Loading...</div>
            )}
            <h3 style={{ margin: "30px 0", textAlign: "center" }}>Total Cost <span style={{ color: "red" }}>{totalPrice}$</span></h3>
            <hr />
            <form>
                <section className={styles.credit}>
                    <h2>Credit Card</h2>
                    <input type="text" placeholder='Card Number' className={styles.formInput} onChange={(e) => setCardNumber(e.target.value)} />
                    <input type="text" placeholder='Expiry Date' className={styles.formInput} onChange={(e) => setExpiryDate(e.target.value)} />
                    <input type="number" placeholder='CVV' className={styles.formInput} onChange={(e) => setCVV(e.target.value)} />
                </section>
                <section className={styles.address}>
                    <h2>Your Billing Address</h2>
                    <input type="text" placeholder='First Name' className={styles.formInput} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder='Last Name' className={styles.formInput} onChange={(e) => setLastName(e.target.value)} />
                    <input type="text" placeholder='Country' className={styles.formInput} onChange={(e) => setCountry(e.target.value)} />
                    <input type="text" placeholder='City' className={styles.formInput} onChange={(e) => setCity(e.target.value)} />
                    <input type="text" placeholder='Address' className={styles.formInput} onChange={(e) => setAddress(e.target.value)} />
                    <input type="text" placeholder='Zip Code' className={styles.formInput} onChange={(e) => setZipCode(e.target.value)} />
                    <input type="text" placeholder='Phone Number' className={styles.formInput} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <input type="email" placeholder='Email' className={styles.formInput} onChange={(e) => setEmail(e.target.value)} />
                </section>
                <input type="button" value="Submit Your Order" className={styles.formButton} onClick={handleClick} />
                {message ? <div style={{ padding: "3px", backgroundColor: hasError ? "red" : "green", color: "white", textAlign: "center" }}>{message}</div> : ""}
            </form>
        </div>
    );
}
