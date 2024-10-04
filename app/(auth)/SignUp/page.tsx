'use client'
import { useState } from "react"
import styles from './page.module.css';
import { NextResponse } from "next/server";


const Page = () => {
  const [formData, setFormData] = useState({});
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [message, setMessage] = useState('');

  const handeleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  const handleMassageChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  }

  const handleZipcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.target.value);
  }





  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !phoneNumber || !password) {
      setMessage('Please enter all fields');
      return;
    }
    const formData = new FormData();
    formData.append('username', username);
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('zipcode', zipcode);
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setMessage(data.message);
      
    } catch (error) {
      console.error('Error:', error);
      return new NextResponse('مشکلی رخ داده لطفا با پشتیبانی تماس بگیرید ', { status: 500 });
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>لطفا برای دریافت خدمات بهتر ثبت نام کنید</h1>
      <input
        type="text"
        placeholder="نام کاربری "
        value={username}
        onChange={handeleUsernameChange}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="رمز عبور "
        value={password}
        onChange={handlePasswordChange}
        className={styles.input}
      />
      <input
        type="number"
        placeholder="شماره تماس "
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="ادرس دقیق پستی"
        value={address}
        onChange={handleAddressChange}
        className={styles.input}
      />
      <input
        type="number"
        placeholder="کد پستی"
        value={zipcode}
        onChange={handleZipcodeChange}
        className={styles.input}
      />
      
      <button type="submit" className={styles.button}>Upload</button>
      <p className={styles.message}>{message}</p>
    </form>
  );
}

export default Page;