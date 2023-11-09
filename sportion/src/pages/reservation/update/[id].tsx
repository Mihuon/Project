import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useReservationQuery,useUpdateReservationMutation } from '../../../../generated/graphql';

export default function UpdateReservation() {
  const { data } = useReservationQuery();
  const router = useRouter();
  const { query } = router;
  const id = query.id;

  const [name, setName] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [place, setPlace] = useState('');
  const [charge, setCharge] = useState('');
  const [paid, setPaid] = useState(false);

  const [updateReservation] = useUpdateReservationMutation();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    router.push('/');
  };

  return (
    <div>
      <div className="form-wrapper">
        <h1>Update Reservation</h1>
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
          <button type="submit">Update Reservation</button>
        </form>
      </div>
    </div>
  );
}