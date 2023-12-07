// import React, { FormEvent, useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { useReservationQuery, useUpdateReservationMutation, useUpdateProfileMutation, usePlaceQuery, useMyProfileLazyQuery } from '../../../../generated/graphql';
// import { useAuthContext } from '@/components/auth-context-provider';
// import { Console } from 'console';

// export default function UpdateReservation() {
//   const router = useRouter();
//   const { query } = router;
//   const id = query.id;

//   const { data } = useReservationQuery();
//   console.log(data);

//   const [name, setName] = useState('');
//   const [timeFrom, setTimeFrom] = useState('');
//   const [timeTo, setTimeTo] = useState('');
//   const [place, setPlace] = useState('');
//   const [charge, setCharge] = useState('');
//   const [paid, setPaid] = useState(false);
//   const [confirmed, setConfirmed] = useState(false);

//   const { user } = useAuthContext();
//   const [profile, { data: myProfileData }] = useMyProfileLazyQuery();
//   useEffect(() => {
//     if (user != null) {
//       profile({ variables: { userUid: user?.uid } });
//     }
//   }, [profile, user]
//   )

//   useEffect(() => {
//     if (id && data && data.reservation) {
//       const currentReservation = data.reservation.find(reservation => reservation.id === id);

//       if (currentReservation) {
//         setName(currentReservation.name);
//         setTimeFrom(currentReservation.timeFrom.toString());
//         setTimeTo(currentReservation.timeTo.toString());
//         setPlace(currentReservation.place);
//         setCharge(currentReservation.charge.toString());
//         setPaid(!!currentReservation.paid);
//         setConfirmed(!!currentReservation.confirmed);
//       }
//     }
//   }, [id, data]);

//   const [updateReservation] = useUpdateReservationMutation();
//   const [updateProfile] = useUpdateProfileMutation();

//   const handlePayment = async (event: FormEvent) => {
//     if (myProfileData?.myProfile.find((profile) => profile.uid === user?.uid)?.credit > charge) {

//       event.preventDefault();
//       const updatedReservationData = {
//         id: id,
//         name,
//         timeFrom: parseInt(timeFrom),
//         timeTo: parseInt(timeTo),
//         place,
//         charge: parseFloat(charge),
//         paid: true,
//         confirmed
//       };

//       const result = await updateReservation({
//         variables: updatedReservationData,
//       });

//       router.push('/');
//     }
//   };

//   return (
//     <div>
//       {myProfileData?.myProfile.find((profile) => profile.uid === user?.uid)?.credit}
//       <div className="form-wrapper">
//         <h1>Confirm Reservation</h1>
//         <p>Name: {name}</p>
//         <p>Time From: {timeFrom}</p>
//         <p>Time To: {timeTo}</p>
//         <p>Place: {place}</p>
//         <p>Charge: {charge}</p>

//         <button onClick={handlePayment} type="button">
//           Confirm Payment
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  useReservationQuery,
  useUpdateReservationMutation,
  useUpdateProfileMutation,
  usePlaceQuery,
  useMyProfileLazyQuery
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
  const [profile, { data: myProfileData }] = useMyProfileLazyQuery();
  useEffect(() => {
    if (user != null) {
      profile({ variables: { userUid: user?.uid } });
    }
  }, [profile, user]);

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
  const [updateProfile] = useUpdateProfileMutation();

  const handlePayment = async (event: FormEvent) => {
    event.preventDefault();

    const userUid = user?.uid;
    const userProfile = myProfileData?.myProfile.find((profile) => profile.uid === userUid);

    if (userProfile && userProfile.credit >= parseFloat(charge)) {
      const updatedProfileCredit = userProfile.credit - parseFloat(charge);

      const result = await updateProfile({
        variables: {
          uid: userUid,
          credit: updatedProfileCredit,
        },
      });

      if (result.data?.updateProfile) {
        const updatedReservationData = {
          id: id,
          name,
          timeFrom: parseInt(timeFrom),
          timeTo: parseInt(timeTo),
          place,
          charge: parseFloat(charge),
          paid: true,
          confirmed,
        };

        await updateReservation({
          variables: updatedReservationData,
        });

        router.push('/');
      }
    } else {
      console.error("Insufficient credits to confirm reservation.");
    }
  };

  return (
    <div>
      {myProfileData?.myProfile.find((profile) => profile.uid === user?.uid)?.credit}
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