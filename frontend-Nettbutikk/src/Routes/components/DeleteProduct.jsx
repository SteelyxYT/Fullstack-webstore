import React, { useState, useEffect } from 'react';

export default function DeleteProduct() {

    const [products, setProducts] = useState([])

    const [status, setStatus] = useState('')

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:80/api/v1/products');
        const data = await response.json();
        setProducts(data);
    }

    useEffect(() => {
        
        fetchProducts();

        const refresh = setInterval(() => fetchProducts(), 1000 * 60 * 5);

        return () => clearInterval(refresh);

    }, []);

    const [product, setProduct] = useState({})

    async function Delete() {
        const userID = 2
        const response = await fetch(`http://localhost:80/api/v1/products/${product.ProductID}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'authorization': userID,
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            setStatus('Product deleted')
        } else {
            const data = await response.json()
            setStatus('Error deleting product:' + data.error)
        }

        fetchProducts();
    }

    return (
        <div className='productform'>
            <h1>Delete Product</h1>
            <select onChange={(event) => setProduct(products.find(product => product.ProductID == event.target.value))}>
                <option value={0}></option>
                {products.map(product => (
                    <option value={product.ProductID} key={product.ProductID}>{product.ProductID} - {product.ProductName}</option>
                ))}
            </select>
            <p>{status}</p>
            <button onClick={Delete}>Delete</button>
        </div>
    )
}