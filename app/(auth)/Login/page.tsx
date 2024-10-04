"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';
const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  // const router = useRouter();

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleMassageChange=(e: React.ChangeEvent<HTMLInputElement>) => {
    setError(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);

    const res = await fetch('/api/login', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('token', token);
      console.log(token);
      setMessage('ورود با موفقیت انجام شد');
      window.location.href = '/vipcustomer'; // Redirect to a protected page
    } else {
      const { message } = await res.json();
      setError(message);
    }
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit} className={styles.form} dir="rtl">
        <h1>لطفا اطلاعات کاربری خود را وارد نمایید</h1>
          <label>شماره تماس:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className={styles.input}
          />
        
        
          <label>رمز عبور:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        
        
        <button type="submit" className={styles.button}>ورود</button>
        <Link href="/SignUp ">اگر اکانت فعالی ندارید ثبت نام کنید</Link>
        <p className={styles.message}>{message}</p>
      </form>
    </div>
  );
};

export default LoginPage;
