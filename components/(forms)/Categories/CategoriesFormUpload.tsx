"use client";

import { useState } from 'react';
import styles from './CategoriesFormUpload.module.css';

const CategoriesFormUpload = () => {
  const [name, setName] = useState('');

  const [message, setMessage] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      setMessage('Please enter a title and hexcode');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);


    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        body: formData,
      });

      if (res.status === 201) {
        setMessage('categories uploaded successfully');
      } else {
        setMessage('Error uploading categories');
      }
    } catch (err) {
      setMessage('Error uploading categories');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>categoires upload form</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={handleNameChange}
        className={styles.input}
      />

      <button type="submit" className={styles.button}>Upload</button>
      <p className={styles.message}>{message}</p>
    </form>
  );
};

export default CategoriesFormUpload;