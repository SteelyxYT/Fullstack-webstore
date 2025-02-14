import { useEffect, useState } from "react"
import { useParams } from "react-router"
import './assets/ProductPage.css'
import { Navigation } from "./components/navigation"



export default function ProductPage() {

    const id = useParams().id

    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:80/api/v1/products/${id}`);
            const data = await response.json();
            setProduct(data[0]);
        }
        fetchProduct();
    }, [id]);

    return (
        <div className="productPage">
            <Navigation />
            <div className="productHeader">
            <img src={"https://picsum.photos/700/750"} alt={product.ProductName} />
            <div>
            <h1>{product.ProductName}</h1>
            <p>{product.Description}</p>

            </div>
        </div>
        </div>
        
    )
}