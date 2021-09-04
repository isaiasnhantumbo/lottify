import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { FormEvent, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

import styles from '../styles/Home.module.scss';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      Router.push('/');
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up | Lottify</title>
      </Head>
      <main className={styles.main}>
        <Image src="/montanhas.png" height={634} width={600} alt="Montanhas" />
        <section className={styles.signIn}>
          <p>Welcome!</p>
          <h1>Create your account</h1>
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

            <button
              type="submit"
              onClick={handleSignUp}
              style={{ marginTop: '1rems' }}
            >
              Sign up
            </button>
          </form>

          <p>
            Dont have an account? <Link href="/">Join free today</Link>
          </p>
        </section>
      </main>
    </>
  );
}
