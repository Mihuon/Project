import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useCreatePlaceMutation } from '../../../generated/graphql';
import { authUtils } from '../../firebase/authUtils';

export default function Page() {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  const router = useRouter();
  const [createPlace] = useCreatePlaceMutation();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const createPlaceHandler = async () => {
      try {
        const result = await createPlace({
          variables: {
            name: name,
            cost: parseFloat(cost),
          },
        });

      } catch (error) {
        console.error(error);
      }
    };
    await createPlaceHandler();
    router.push('/');
  };

  return (
    <div className='wrapper'>
      <div className="form-wrapper">
        <div className="form">
          <h1>Vytvořit sportoviště</h1>
          <form onSubmit={handleForm} className="form">
            <label>
              <p>Název</p>
              <input
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
              />
            </label>
            <label>
              <p>Cena</p>
              <input
                onChange={(e) => setCost(e.target.value)}
                required
                type="number"
              />
            </label>
            <button type="submit">Vytvořit</button>
          </form>
        </div>
      </div>
    </div>
  );
}