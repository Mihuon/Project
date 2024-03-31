import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useCreateProfileMutation } from '../../../generated/graphql';
import { authUtils } from '../../firebase/authUtils';
import { useAuthContext } from '../../../components/auth-context-provider';

export default function Page() {

  const { user } = useAuthContext();

  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [credit, setCredit] = useState(0);
  const [admin, setAdmin] = useState(false);

  const router = useRouter();
  const [createProfile] = useCreateProfileMutation();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const createProfileHandler = async () => {
      try {
        const result = await createProfile({
          variables: {
            uid: user?.uid,
            name: name,
            surname: surname,
            credit: 0,
            admin: false,
          },
        });

      } catch (error) {
        console.error(error);
      }
    };
    await createProfileHandler();
    router.push('/');
  };

  return (
    <div className='wrapper'>
      <div className="form-wrapper">
        <div className='form'>
          <h1>Vytvořit profil</h1>
          <form onSubmit={handleForm} className="form">
            <label>
              <p>Jméno</p>
              <input
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
              />
            </label>
            <label>
              <p>Příjmení</p>
              <input
                onChange={(e) => setSurname(e.target.value)}
                required
                type="text"
              />
            </label>
            <button type="submit">Vytvořit</button>
          </form>
        </div>
      </div>
    </div>
  );
}