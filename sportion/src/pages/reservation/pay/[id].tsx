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
  const [updateProfile] = useUpdateCreditProfileMutation();

  const handlePayment = async (event: FormEvent) => {
    event.preventDefault();

    const userProfile = myProfileData?.myProfile.find((profile) => profile.uid === user?.uid);

    if (userProfile && paid != true && confirmed == true && userProfile.credit!=null &&userProfile.credit >= parseFloat(charge)) {
      const updatedProfileCredit = userProfile.credit - parseFloat(charge);

      const result = await updateProfile({
        variables: {
          id: userProfile.id,
          credit: updatedProfileCredit,
        },
      });

      if (result.data?.updateCreditProfile) {
        if (typeof id === 'string') {
        const updatedReservationData = {
          id: id,
          name,
          timeFrom,
          timeTo,
          place,
          charge: parseFloat(charge),
          paid: true,
          confirmed,
        };

        await updateReservation({
          variables: updatedReservationData,
        });
      }
        router.push('/');
      }
    }
  };

  //box a typography
  const { data: placeData } = usePlaceQuery();
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="form">
          <h1>Zaplatit rezervaci</h1>
          <p>Název: {name}</p>
          <p>Čas: {`${new Date(timeFrom).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })} ${new Date(timeFrom).toLocaleDateString()} - ${new Date(timeTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', })} ${new Date(timeTo).toLocaleDateString()} `}
          </p>
          <p>Sportoviště: {placeData?.place.find((plc) => plc.id === place)?.name}</p>
          <p>Cena: {charge} Kč</p>
          <p>Kredit: {myProfileData?.myProfile.find((profile) => profile.uid === user?.uid)?.credit}</p>
          <button onClick={handlePayment} type="button">
            Zaplatit
          </button>
        </div>
      </div>
    </div>
  );
}