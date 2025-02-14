import CreateProduct from "./components/CreateProduct";
import DeleteProduct from "./components/DeleteProduct";
import UpdateProduct from "./components/UpdateProduct";
import './assets/Admin.css'
import './assets/ProductForms.css'

export default function Admin() {
    return (
        <div>
            <h1>Admin</h1>
        <div className="ProductPanel">
            <CreateProduct />
            <DeleteProduct />
            <UpdateProduct />
        </div>
        </div>
    )
}