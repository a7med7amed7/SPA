import Link from 'next/link'
import React from 'react'

function Navbar() {
    return (
        <div style={{ margin: "10px 2px" }}>
            <ul style={{ color: "navy" }}>
                <Link href={'/products'} style={{ padding: "5px", margin: "6px 6px" }}>/products</Link>
                <Link href={'/cart'}>/cart</Link>
            </ul>
        </div>
    )
}

export default Navbar