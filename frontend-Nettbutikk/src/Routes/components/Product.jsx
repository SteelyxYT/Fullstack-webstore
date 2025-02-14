import { useNavigate } from "react-router"


export function Product(props) {

    const navigate = useNavigate()

    return (
        <div className="product" key={props.product.ProductID} id={props.product.ProductID} onClick={(event) => navigate(`/products/${props.product.ProductID}`)}>
            <div className="productCard">
                <div>
                    <img src={"https://picsum.photos/200"} alt={props.product.ProductName} />
                    <h2>{props.product.ProductName}</h2>
                </div>
                <p>{props.product.Price} kr</p>
            </div>

        </div>
    )
}