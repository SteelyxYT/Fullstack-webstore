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

    async function Buy() {
        const checkUser = localStorage.getItem('token')
        if (!checkUser) {
            alert('Du må være logget inn for å kjøpe en produkt!')
        } else {
            const localCart = localStorage.getItem('cart')
            const cartData = localCart ? JSON.parse(localCart) : []
            console.log(cartData)
            const productInCart = cartData.find((product) => product.id === Number.parseInt(id))
            console.log(productInCart)
            if (productInCart === undefined) {
                cartData.push({id: product.ProductID, name: product.ProductName, price: product.Price, image: product.Image, quantity: 1})
                localStorage.setItem('cart', JSON.stringify(cartData))
                alert('Produktet er lagt til i handlekurven')
                return
            } else {
                const index = cartData.findIndex(product => product.id === Number.parseInt(id))
                cartData[index].quantity += 1
                localStorage.setItem('cart', JSON.stringify(cartData))
                alert('Produktet er lagt til i handlekurven')
                return
            }
        }
    }

    return (
        <div className="productPage">
            <Navigation />
            <div className="productHeader">
            <img src={"https://picsum.photos/700/750"} alt={product.ProductName} />
            <div>
            <h1>{product.ProductName}</h1>
            <p>{product.Description}</p>
            <button onClick={Buy}>Kjøp</button>
            </div>
        </div>
        </div>
        
    )
}