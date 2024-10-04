"use client"
import React, { useState, useEffect } from 'react';
import styles from './ProductsUploadForm.module.css';

const ProductsUploadForm = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [colors, setColors] = useState<string[]>([]);
    const [sizes, setSizes] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [paymentLink, setPaymentLink] = useState('');
    const [message, setMessage] = useState('');
    const [availableColors, setAvailableColors] = useState<Array<{ _id: string; name: string }>>([]);
    const [availableSizes, setAvailableSizes] = useState<Array<{ _id: string; name: string }>>([]);
    const [availableCategories, setAvailableCategories] = useState<Array<{ _id: string; name: string }>>([]);

    useEffect(() => {
        // Fetch available colors, sizes, and categories from the API
        async function fetchOptions() {
            const colorsRes = await fetch('/api/colors'); // Adjust endpoint as needed
            const sizesRes = await fetch('/api/sizes'); // Adjust endpoint as needed
            const categoriesRes = await fetch('/api/categories'); // Adjust endpoint as needed

            const colorsData = await colorsRes.json();
            const sizesData = await sizesRes.json();
            const categoriesData = await categoriesRes.json();

            setAvailableColors(colorsData);
            setAvailableSizes(sizesData);
            setAvailableCategories(categoriesData);
        }

        fetchOptions();
    }, []);

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (files.length === 0) {
            setMessage('Please select at least one file.');
            return;
        }

        const formData = new FormData();
        files.forEach(file => formData.append('files', file)); // Append all files
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('colors', colors.join(',')); // Send selected color IDs as a comma-separated string
        formData.append('sizes', sizes.join(','));
        formData.append('categories', categories.join(','));
        formData.append('paymentLink', paymentLink);

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                body: formData,
            });

            if (res.status === 201) {
                setMessage('Product uploaded successfully');
            } else {
                setMessage('Error uploading product');
            }
        } catch (err) {
            setMessage('Error uploading product');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1>Product Uploads</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.input}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={styles.input}
                required
            />
            <select
                multiple
                value={colors}
                onChange={(e) => setColors(Array.from(e.target.selectedOptions, option => option.value))}
                className={styles.select}
                required
            >
                {availableColors.map(color => (
                    <option key={color._id} value={color._id}>{color.name}</option>
                ))}
            </select>
            <select
                multiple
                value={sizes}
                onChange={(e) => setSizes(Array.from(e.target.selectedOptions, option => option.value))}
                className={styles.select}
                required
            >
                {availableSizes.map(size => (
                    <option key={size._id} value={size._id}>{size.name}</option>
                ))}
            </select>
            <select
                multiple
                value={categories}
                onChange={(e) => setCategories(Array.from(e.target.selectedOptions, option => option.value))}
                className={styles.select}
                required
            >
                {availableCategories.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Payment Link"
                value={paymentLink}
                onChange={(e) => setPaymentLink(e.target.value)}
                className={styles.input}
            />
            <input
                type="file"
                multiple
                onChange={handleFilesChange}
                className={styles.input}
                required
            />
            <button type="submit" className={styles.button}>Upload</button>
            <p className={styles.message}>{message}</p>
        </form>
    );
};

export default ProductsUploadForm;
