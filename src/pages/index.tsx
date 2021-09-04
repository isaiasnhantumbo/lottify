import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';
import { FormEvent, useState } from 'react';
import styles from '../styles/Home.module.scss';
import { supabase } from '../utils/supabaseClient';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
      Router.push('/user');
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login | Lottify</title>
      </Head>
      <main className={styles.main}>
        <Image src="/montanhas.png" height={634} width={600} alt="Montanhas" />
        <section className={styles.signIn}>
          <p>Welcome back</p>
          <h1>Login to your account</h1>
          <form>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="John.snow@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>Forgot password?</p>

            <button type="submit" onClick={handleLogin}>
              Login now
            </button>
          </form>
          <button>
            <Image
              height={20}
              width={20}
              src="/google-logo.svg"
              alt="Google Logo"
            />{' '}
            Or sign-in with google
          </button>
          <p>
            Dont have an account? <span>Join free today</span>
          </p>
        </section>
      </main>
    </>
  );
}
