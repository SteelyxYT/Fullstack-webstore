import CreateProduct from "./components/CreateProduct";
import DeleteProduct from "./components/DeleteProduct";
import UpdateProduct from "./components/UpdateProduct";
import './assets/Admin.css'
import './assets/ProductForms.css'
import { Navigation } from "./components/navigation";

export default function Admin() {
    return (
        <div>
            <Navigation />
            <h1>Admin</h1>
        <div className="ProductPanel">
            <CreateProduct />
            <DeleteProduct />
            <UpdateProduct />
        </div>
        </div>
    )
}