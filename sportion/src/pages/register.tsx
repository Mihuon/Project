'use client';

import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { authUtils } from '../firebase/authUtils';
import { useCreateProfileMutation } from '../../generated/graphql';

function Page() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [credit, setCredit] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [uid, setUid] = useState('');
  const [paid, setPaid] = useState(false);

  const [createProfile] = useCreateProfileMutation();

  const router = useRouter();
  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    await authUtils.register(email, password);

    // const createProfileHandler = async () => {
    //   try {
    //     const result = await createProfile({
    //       variables: {
    //         name: name,
    //         timeFrom: parseInt(timeFrom),
    //         timeTo: parseInt(timeTo),
    //         place: place,
    //         charge: parseFloat(charge),
    //         paid: paid,
    //         profile: profile
    //       },
    //     });

    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    return router.push('/profile/create');
  };
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Register</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="email"
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
export default Page;
