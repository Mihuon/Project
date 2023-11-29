import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useReservationQuery, useUpdateReservationMutation, usePlaceQuery } from '../../../../generated/graphql';

export default function UpdateReservation() {
  const router = useRouter();
  const { query } = router;
  const id = query.id;

  const { data } = useReservationQuery();
console.log(data);

  const [name, setName] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [place, setPlace] = useState('');
  const [charge, setCharge] = useState('');
  const [paid, setPaid] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

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
        setConfirmed(!!currentReservation.confirmed);
      }
    }
  }, [id, data]);

  const [updateReservation] = useUpdateReservationMutation();

  const handlePayment = async (event: FormEvent) => {
    event.preventDefault();

    const updatedReservationData = {
      id: id,
      name,
      timeFrom: parseInt(timeFrom),
      timeTo: parseInt(timeTo),
      place,
      charge: parseFloat(charge),
      paid: true,
      confirmed
    };

    const result = await updateReservation({
      variables: updatedReservationData,
    });

    router.push('/');
  };

  return (
    <div>
    <div className="form-wrapper">
      <h1>Confirm Reservation</h1>
      <p>Name: {name}</p>
      <p>Time From: {timeFrom}</p>
      <p>Time To: {timeTo}</p>
      <p>Place: {place}</p>
      <p>Charge: {charge}</p>

      <button onClick={handlePayment} type="button">
        Confirm Payment
      </button>
    </div>
    </div>
  );
}