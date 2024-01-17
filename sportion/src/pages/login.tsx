'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';

import { authUtils } from '../firebase/authUtils';

function Page() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();
  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    await authUtils.login(email, password);
    return router.push('/');
  };
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Přihlášení</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="priklad@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Heslo</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="Heslo"
            />
          </label>
          <button type="submit">Přihlásit se</button>
        </form>
        <a className='register' href="../register">Registrovat se</a>
      </div>
    </div>
  );
}
export default Page;
