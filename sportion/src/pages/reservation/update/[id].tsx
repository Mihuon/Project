import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useReservationQuery, useUpdateReservationMutation } from '../../../../generated/graphql';

export default function UpdateReservation() {
  const router = useRouter();
  const { query } = router;
  const id = query.id;

  const { data } = useReservationQuery();

  const [name, setName] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [place, setPlace] = useState('');
  const [charge, setCharge] = useState('');
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (id && data && data.reservation) {
      const currentReservation = data.reservation.find(reservation => reservation.id === id);

      if (currentReservation) {
        setName(currentReservation.name);
        setTimeFrom(currentReservation.timeFrom.toString());
        setTimeTo(currentReservation.timeTo.toString());
        setPlace(currentReservation.place);
        setCharge(currentReservation.charge.toString());
        setPaid(!!currentReservation.paid);
      }
    }
  }, [id, data]);

  const [updateReservation] = useUpdateReservationMutation();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const updatedReservationData = {
      id: id,
      name,
      timeFrom: parseInt(timeFrom),
      timeTo: parseInt(timeTo),
      place,
      charge: parseFloat(charge),
      paid,
    };

    const result = await updateReservation({
      variables: updatedReservationData,
    });

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
              value={name}
            />
          </label>
          <label>
            <p>Time From</p>
            <input
              onChange={(e) => setTimeFrom(e.target.value)}
              required
              type="number"
              value={timeFrom}
            />
          </label>
          <label>
            <p>Time To</p>
            <input
              onChange={(e) => setTimeTo(e.target.value)}
              required
              type="number"
              value={timeTo}
            />
          </label>
          <label>
            <p>Place</p>
            <input
              onChange={(e) => setPlace(e.target.value)}
              required
              type="text"
              value={place}
            />
          </label>
          <label>
            <p>Charge</p>
            <input
              onChange={(e) => setCharge(e.target.value)}
              required
              type="number"
              value={charge}
            />
          </label>
          <label>
            <p>Paid</p>
            <select
              onChange={(e) => setPaid(e.target.value === 'true')}
              required
              value={paid ? 'true' : 'false'}
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