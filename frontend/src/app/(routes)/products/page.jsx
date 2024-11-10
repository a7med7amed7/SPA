"use client";
import Navbar from '@/app/components/Navbar';
import styles from './page.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CardImage from '../../../../public/laptop.jpg';
import Image from 'next/image';
export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/v1/products`);
                const data = await res.json();
                setProducts(data.data);
            } catch (err) {
                console.log(err)
                // console.error('Fetch error:', err);
            }
            setLoaded(true);
        };

        getAllProducts();
    }, []);

    if (!hasMounted) return null;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Product List</h1>
            {loaded ? (
                <ul className={styles.productList}>
                    {products.map((product) => (
                        <li key={product.id} className={styles.productItem}>
                            <Link href={`/products/${product.id}`}>
                                <div className={styles.imageContainer}>
                                    <Image src={CardImage} alt='Card Image' fill={true} />
                                </div>
                                <h2>{product.name}</h2>
                                <p className={styles.desc}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident voluptas neque culpa quam at magnam, nostrum maxime aspernatur dolorum sequi atque ipsa eligendi quibusdam explicabo alias hic beatae iste in?
                                </p>
                                <p style={{ fontWeight: "bold" }}>Price: ${product.price}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
