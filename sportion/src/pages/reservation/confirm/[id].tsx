import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useReservationQuery, useUpdateReservationMutation, usePlaceQuery } from '../../../../generated/graphql';

export default function UpdateReservation() {
  const router = useRouter();
  const { query } = router;
  const id = query.id;

  const { data } = useReservationQuery();

  const { data: placeData } = usePlaceQuery();
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
        if (currentReservation.name) { setName(currentReservation.name); }
        if (currentReservation.timeFrom) { setTimeFrom(currentReservation.timeFrom.toString()); }
        if (currentReservation.timeTo) { setTimeTo(currentReservation.timeTo.toString()); }
        if (currentReservation.place) { setPlace(currentReservation.place); }
        if (currentReservation.charge) { setCharge(currentReservation.charge.toString()); }
        if (currentReservation.paid) { setPaid(!!currentReservation.paid); }
        if (currentReservation.confirmed) { setConfirmed(!!currentReservation.confirmed); }
      }
    }
  }, [id, data]);

  const [updateReservation] = useUpdateReservationMutation();

  const handleConfirmation = async (event: FormEvent) => {
    event.preventDefault();


    if (typeof id == 'string') {

      const updatedReservationData = {
        id: id,
        name,
        timeFrom,
        timeTo,
        place,
        charge: parseFloat(charge),
        paid,
        confirmed: true
      };

      const result = await updateReservation({
        variables: updatedReservationData,
      });

    }
    router.push('/');
  };

  return (
    <div className='wrapper'>

      <div className="form-wrapper">
        <div className='form'>
          <h1>Potvrdit rezervaci</h1>
          <p>Název: {name}</p>
          <p>
            Čas: {`${new Date(timeFrom).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })} ${new Date(timeFrom).toLocaleDateString()} - ${new Date(timeTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', })} ${new Date(timeTo).toLocaleDateString()} `}
          </p>
          <p>Místo: {placeData?.place.find((plc) => plc.id === place)?.name}</p>
          <p>Cena: {charge} Kč</p>

          <button onClick={handleConfirmation} type="button">
            Potvrdit
          </button>
        </div>
      </div>
    </div>
  );
}