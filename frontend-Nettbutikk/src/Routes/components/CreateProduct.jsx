import { useEffect, useState } from 'react';

export default function CreateProduct() {

    const [categories, setCategories] = useState([])

    const [status, setStatus] = useState('')

    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState(0)

    const fetchCategories = async () => {
        const response = await fetch('http://localhost:80/api/v1/products/categories');
        const data = await response.json();
        setCategories(data);
    }

    useEffect(() => {

        fetchCategories();

        const refresh = setInterval(() => fetchCategories(), 1000 * 60 * 5);

        return () => clearInterval(refresh);
    }, []);

    async function createProduct() {

        const response = await fetch('http://localhost:80/api/v1/products', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'authorization': 5,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ProductName: productName, Description: description, Price: price, CategoryID: category })
        })

        if (response.status === 201) {
            setStatus('Product created')
        } else {
            const data = await response.json()
            console.log(data);
            setStatus('Error creating product:' + data.error)
        }
    }


    return (
        <div className="productform">
            <h1>Create Product</h1>
            <input type="text" placeholder="Product Name" value={productName}  onChange={(e) => setProductName(e.target.value)}/>
            <textarea name="description" id="description" cols="30" rows="10" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value={0}></option>
                {categories.map(category => (
                    <option value={category.CategoryID} key={category.CategoryID}>{category.CategoryID} - {category.Category}</option>
                ))}
            </select>
            <p>{status}</p>
            <button onClick={createProduct}>Create Product</button>
        </div>
    )
}