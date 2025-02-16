
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function Cart() {

    const [cart, setCart] = React.useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        }

        const cart = localStorage.getItem('cart')
        setCart(JSON.parse(cart))
    }, [])

    function removeFromCart(id) {
        const newCart = cart.filter(item => item.id !== id)
        localStorage.setItem('cart', JSON.stringify(newCart))
        setCart(newCart)
    }

    function increaseQuantity(id) {
        const newCart = cart.map(item => {
            if (item.id === id) {
                item.quantity += 1
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(newCart))
        setCart(newCart)
    }

    function decreaseQuantity(id) {
        const newCart = cart.map(item => {
            if (item.id === id) {
                item.quantity -= 1
            }
            if (item.quantity === 0) {
                return
            } else {
                return item
            }
        })
        localStorage.setItem('cart', JSON.stringify(newCart))
        setCart(newCart)
    }

    return (
        <div>
            <h1>Cart</h1>
            <div>
                {cart[0] ? cart.map(item => (
                    <div>
                        <img src={item.image} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>{item.price} kr</p>
                        <button onClick={() => increaseQuantity(item.id)}>+</button>
                        <p>{item.quantity}</p>
                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                        <button onClick={() => removeFromCart(item.id)}>Fjern</button>
                    </div>
                )) : <p>Cart is empty</p>}
            </div>
            <button>Checkout</button>
            </div>
    
    )
}