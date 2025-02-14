import { useEffect, useState } from "react"

export default function UpdateProduct() {

    const [productList, setProductList] = useState([])
    const [product, setProduct] = useState(0)
    const [categories, setCategories] = useState([])

    // Form fields
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState(0)
    const [image, setImage] = useState('')

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:80/api/v1/products');
            const data = await response.json();
            setProductList(data);
        }
        fetchProducts();

        const fetchCategories = async () => {
            const response = await fetch('http://localhost:80/api/v1/products/categories');
            const data = await response.json();
            setCategories(data);
        }
        fetchCategories();

        const refresh = setInterval(() => { fetchProducts(); fetchCategories()}, 1000 * 60 * 5);

        return () => clearInterval(refresh);

    }, []);

    function updateFormVariables(product) {
        setProductName(product ? product.ProductName : "")
        setDescription(product ? product.Description : "")
        setPrice(product ? product.Price : 0)
        setCategory(product ? product.CategoryID : 0)
    }

    async function updateSelectedProduct() {

        const response = await fetch(`http://localhost:80/api/v1/products/${product.ProductID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'authorization': 2,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ProductName: productName ? productName : product.ProductName, Description: description ? description : product.Description, Price: price ? price : product.Price, CategoryID: category ? category : product.CategoryID, Image: image ? image : product.Image })
        })

    }

    return (
        <div className="productform">
            <h1>Update Product</h1>
            <select onChange={(event) => {setProduct(productList.find(product => product.ProductID == event.target.value)); updateFormVariables(productList.find(product => product.ProductID == event.target.value))}} >
                <option value={0}></option>
                {productList.map(product => (
                    <option value={product.ProductID} key={product.ProductID}>{`${product.ProductID} - ${product.ProductName}`}</option>
                ))}
            </select>
                <input type="text" disabled={product ? false : true} value={product ? productName : ""} onChange={(event) => setProductName(event.target.value)} />
                <textarea name="description" disabled={product ? false : true} cols="30" rows="10" value={product ? description : ""} onChange={(event) => setDescription(event.target.value)}></textarea>
                <input type="number" disabled={product ? false : true} value={product ? price : ""} onChange={(event) => setPrice(event.target.value)} />
                <select name="category" disabled={product ? false : true} value={product ? category : ""} onChange={(event) => setCategory(event.target.value)} >
                    <option value={0}></option>
                    {categories.map(category => (
                        <option value={category.CategoryID} key={category.CategoryID}>{category.Category}</option>
                    ))}
                </select>
                <input type="text" disabled={product ? false : true} placeholder={product ? image : ""} onChange={(event) => setImage(event.target.value)} />
            <button onClick={updateSelectedProduct}>Update Product</button>
        </div>
    )
}