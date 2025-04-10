import { useEffect, useState } from "react"

export default function UpdateProduct() {

    const [productList, setProductList] = useState([])
    const [product, setProduct] = useState(0)
    const [categories, setCategories] = useState([])
    const [status, setStatus] = useState('')

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

        const refresh = setInterval(() => { fetchProducts(); fetchCategories() }, 1000 * 60 * 5);

        return () => clearInterval(refresh);

    }, []);

    function updateFormVariables(product) {
        setProductName(product ? product.ProductName : "")
        setDescription(product ? product.Description : "")
        setPrice(product ? product.Price : 0)
        setCategory(product ? product.CategoryID : 0)
        setImage(product ? product.Image : "")
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

        if (response.status === 200) {
            setStatus('Product updated')
        } else {
            const data = await response.json()
            setStatus('Error updating product:' + data.error)
        }
    }

    return (
        <div className="productform">
            <h1>Update Product</h1>
            <select onChange={(event) => { setProduct(productList.find(product => product.ProductID == event.target.value)); updateFormVariables(productList.find(product => product.ProductID == event.target.value)) }} >
                <option value={0}>Choose a product</option>
                {productList.map(product => (
                    <option value={product.ProductID} key={product.ProductID}>{`${product.ProductID} - ${product.ProductName}`}</option>
                ))}
            </select>
            <label htmlFor="productName">Product Name*</label>
            <input type="text" name="productName" disabled={product ? false : true} placeholder={product ? productName : ""} onChange={(event) => setProductName(event.target.value)} />
            <label htmlFor="description">Description*</label>
            <textarea name="description" disabled={product ? false : true} cols="30" rows="10" placeholder={product ? description : ""} onChange={(event) => setDescription(event.target.value)}></textarea>
            <label htmlFor="price">Price*</label>
            <input type="number" name="price" disabled={product ? false : true} placeholder={product ? price : ""} onChange={(event) => setPrice(event.target.value)} />
            <label htmlFor="category">Category*</label>
            <select name="category" disabled={product ? false : true} value={product ? category : ""} onChange={(event) => setCategory(event.target.value)} >
                <option value={0}></option>
                {categories.map(category => (
                    <option value={category.CategoryID} key={category.CategoryID}>{category.Category}</option>
                ))}
            </select>
            <label htmlFor="image">image</label>
            <input type="text" name="image" disabled={product ? false : true} placeholder={product ? image : ""} onChange={(event) => setImage(event.target.value)} />
            <p>{status}</p>
            <button onClick={updateSelectedProduct}>Update Product</button>
        </div>
    )
}