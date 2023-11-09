import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useCreateReservationMutation } from '../../../generated/graphql';
import { authUtils } from '../../firebase/authUtils';

export default function Page() {
  const [name, setName] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [place, setPlace] = useState('');
  const [charge, setCharge] = useState('');
  const [paid, setPaid] = useState(false);

  const router = useRouter();
  const [createReservation] = useCreateReservationMutation();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const createReservationHandler = async () => {
      try {
        const result = await createReservation({
          variables: {
            name: name,
            timeFrom: parseInt(timeFrom),
            timeTo: parseInt(timeTo),
            place: place,
            charge: parseFloat(charge),
            paid: paid,
          },
        });

      } catch (error) {
        console.error(error);
      }
    };
    await createReservationHandler();
    router.push('/');
  };

  return (
    <div>
      <div className="form-wrapper">
        <h1>Create Reservation</h1>
        <form onSubmit={handleForm} className="form">
          <label>
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
            />
          </label>
          <label>
            <p>Time From</p>
            <input
              onChange={(e) => setTimeFrom(e.target.value)}
              required
              type="number"
            />
          </label>
          <label>
            <p>Time To</p>
            <input
              onChange={(e) => setTimeTo(e.target.value)}
              required
              type="number"
            />
          </label>
          <label>
            <p>Place</p>
            <input
              onChange={(e) => setPlace(e.target.value)}
              required
              type="text"
            />
          </label>
          <label>
            <p>Charge</p>
            <input
              onChange={(e) => setCharge(e.target.value)}
              required
              type="number"
            />
          </label>
          <label>
            <p>Paid</p>
            <select
              onChange={(e) => setPaid(e.target.value === 'true')}
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <button type="submit">Create Reservation</button>
        </form>
      </div>
    </div>
  );
}