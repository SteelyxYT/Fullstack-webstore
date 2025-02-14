import { useEffect, useState } from "react";
import { Product } from "./Product";

export function ProductsList({ searchFilter }) {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:80/api/v1/products');
            const data = await response.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);

    return (
        <div className="products-list">
            <h1>Products</h1>
            <div className="productList">
                {products.map(product => (
                    <Product product={product} key={product.ProductID} />
                ))}
            </div>
        </div>
    )
}