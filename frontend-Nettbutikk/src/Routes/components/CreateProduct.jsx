import { useEffect, useState } from 'react';

export default function CreateProduct() {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('http://localhost:80/api/v1/products/categories');
            const data = await response.json();
            setCategories(data);
        }
        fetchCategories();

        const refresh = setInterval(() => fetchCategories(), 1000 * 60 * 5);

        return () => clearInterval(refresh);
    }, []);

    return (
        <div className="productform">
            <h1>Create Product</h1>
            <input type="text" placeholder="Product Name" />
            <textarea name="description" id="description" cols="30" rows="10" placeholder="description"></textarea>
            <input type="number" placeholder="Price" />
            <select name="category" >
                <option value={0}></option>
                {categories.map(category => (
                    <option value={category.CategoryID} key={category.CategoryID}>{category.CategoryID} - {category.Category}</option>
                ))}
            </select>
            <button>Create Product</button>
        </div>
    )
}