

export default function Order({ order }) {
    return (
        <div>
            <p>{order.OrderID}</p>
            <p>{order.OrderDate}</p>
            <p>{order.OrderStatus}</p>
        </div>
    )
}