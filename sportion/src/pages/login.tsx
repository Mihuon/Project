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
    <div>
      <div className="form-wrapper">
        <h1>Login</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <a href="../register">Create profile</a>
      </div>
    </div>
  );
}
export default Page;
