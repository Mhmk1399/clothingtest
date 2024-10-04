"use client"
import { SetStateAction, useState } from 'react';
import styles from './FileUploadForm.module.css';


const FileUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('link', link);

    try {
      const res = await fetch('/api/Story', {
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
      <h1>story uploads</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Link"
        value={link}
        onChange={handleLinkChange}
        className={styles.input}
      />
      <input
        type="file"
        onChange={handleFileChange}
        className={styles.input}
        required
      />
      <button type="submit" className={styles.button}>Upload</button>
      <p className={styles.message}>{message}</p>
    </form>
  );
};
export default FileUploadForm;