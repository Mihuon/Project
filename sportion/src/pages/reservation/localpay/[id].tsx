import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  useReservationQuery,
  useUpdateReservationMutation,
  useUpdateCreditProfileMutation,
  usePlaceQuery,
  useMyProfileLazyQuery,
  useMyProfileQuery
} from '../../../../generated/graphql';
import { useAuthContext } from '@/components/auth-context-provider';

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

  const { user } = useAuthContext();

  const { data: myProfileData } = useMyProfileQuery()

  useEffect(() => {
    if (id && data && data.reservation) {
      const currentReservation = data.reservation.find(reservation => reservation.id === id);

      if (currentReservation) {
        setName(currentReservation.name);
        setTimeFrom(currentReservation.timeFrom.toString());
        setTimeTo(currentReservation.timeTo.toString());
        setPlace(currentReservation.place);
        setCharge(currentReservation.charge);
        setPaid(!!currentReservation.paid);
        setConfirmed(!!currentReservation.confirmed);
      }
    }
  }, [id, data]);

  const [updateReservation] = useUpdateReservationMutation();

  const handlePayment = async () => {
    // event.preventDefault();

    const updatedReservationData = {
      id: id,
      name,
      timeFrom,
      timeTo,
      place,
      charge,
      paid:true,
      confirmed,
    };

    const result = await updateReservation({
      variables: updatedReservationData,
    });

    router.push('/');
      
    
  };

  //box a typography
  const { data: placeData } = usePlaceQuery();
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="form">
          <h1>Doplatit rezervaci</h1>
          <p>Název: {name}</p>
          <p>Čas: {`${new Date(timeFrom).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })} ${new Date(timeFrom).toLocaleDateString()} - ${new Date(timeTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', })} ${new Date(timeTo).toLocaleDateString()} `}
          </p>
          <p>Sportoviště: {placeData?.place.find((plc) => plc.id === place)?.name}</p>
          <p>Cena: {charge} Kč</p>
          <button onClick={handlePayment} type="button">
            Doplatit
          </button>
        </div>
      </div>
    </div>
  );
}