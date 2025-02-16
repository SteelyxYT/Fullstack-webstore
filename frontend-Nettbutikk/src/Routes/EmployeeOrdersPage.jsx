
import React, { useEffect, useState } from 'react';
import Order from './components/Order';
import { Navigation } from './components/navigation';

export default function EmployeeOrdersPage() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('http://localhost:80/api/v1/orders');
            const data = await response.json();
            setOrders(data);
        }

        fetchOrders();

        const refresh = setInterval(() => fetchOrders(), 1000 * 30);
        return () => clearInterval(refresh);
    }, []);

    return (
        <div>
            <Navigation />
            <div>
            <h1>Employee Orders</h1>
            <div>
                { orders[0] ? orders.map(order => (
                    <Order order={order} key={order.OrderID} />
                )): <h2>There are no orders</h2>}
            </div>
                </div>
        </div>
    )
}