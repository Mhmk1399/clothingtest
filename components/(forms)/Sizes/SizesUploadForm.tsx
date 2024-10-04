"use client";

import { useState } from 'react';
import styles from './SizesUploadForm.module.css';

const SizesUploadForm = () => {
  const [name, setName] = useState('');
  const [shoulderWidth,setShoulderWidth]= useState('');
  const [chestWidth,setChestWidth]= useState('');
  const [topLength,setTopLength]= useState('');
  const [bottomLength,setBottomLength]= useState('');
  const [waistWidth,setWaistWidth]= useState('');
  const [shoesWidth,setShoesWidth]= useState('');
  const [shoesLength,setShoesLength]= useState('');
 
  const [message, setMessage] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleShoulderWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShoulderWidth(e.target.value);
  };

  const handleChestWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChestWidth(e.target.value);
  };

  const handleTopLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopLength(e.target.value);
  };

  const handleBottomLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBottomLength(e.target.value);
  };

  const handleWaistWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaistWidth(e.target.value);
  };

  const handleShoesWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShoesWidth(e.target.value);
  };

  const handleShoesLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShoesLength(e.target.value);
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      setMessage('Please enter a name ');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('shoulderWidth', shoulderWidth);
    formData.append('chestWidth', chestWidth);
    formData.append('topLength', topLength);
    formData.append('bottomLength', bottomLength);
    formData.append('waistWidth', waistWidth);
    formData.append('shoesWidth', shoesWidth);
    formData.append('shoesLength', shoesLength);
    

    try {
      const res = await fetch('/api/sizes', {
        method: 'POST',
        body: formData,
      });

      if (res.status === 201) {
        setMessage('sizes uploaded successfully');
      } else {
        setMessage('Error uploading sizes');
      }
    } catch (err) {
      setMessage('Error uploading sizes');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>size upload form</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={handleNameChange}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="shoulderWidth"
        value={shoulderWidth}
        onChange={handleShoulderWidthChange}
        className={styles.input}
      />
      
      <input
        type="text"
        placeholder="chestWidth"
        value={chestWidth}
        onChange={handleChestWidthChange}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="topLength"
        value={topLength}
        onChange={handleTopLengthChange}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="bottomLength"
        value={bottomLength}
        onChange={handleBottomLengthChange}
        className={styles.input}/>

      <input
        type="text"
        placeholder="waistWidth"
        value={waistWidth}
        onChange={handleWaistWidthChange}
        className={styles.input}/>

      <input
        type="text"
        placeholder="shoesWidth"
        value={shoesWidth}
        onChange={handleShoesWidthChange}
        className={styles.input}/>

      <input
        type="text"
        placeholder="shoesLength"
        value={shoesLength}
        onChange={handleShoesLengthChange}
        className={styles.input}/>

      
      <button type="submit" className={styles.button}>Upload</button>
      <p className={styles.message}>{message}</p>
    </form>
  );
};

export default SizesUploadForm;