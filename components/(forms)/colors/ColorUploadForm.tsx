"use client";

import { useState } from 'react';
import styles from './ColorUploadForm.module.css';

const ColorUploadForm = () => {
  const [name, setName] = useState('');
  const [hexCode, setHexCode] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleHexCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHexCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !hexCode) {
      setMessage('Please enter a title and hexcode');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('hexCode', hexCode);

    try {
      const res = await fetch('/api/colors', {
        method: 'POST',
        body: formData,
      });

      if (res.status === 201) {
        setMessage('File uploaded successfully');
      } else {
        setMessage('Error uploading file');
      }
    } catch (err) {
      setMessage('Error uploading file');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>color upload form</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={handleNameChange}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Hexcode"
        value={hexCode}
        onChange={handleHexCodeChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Upload</button>
      <p className={styles.message}>{message}</p>
    </form>
  );
};

export default ColorUploadForm;