import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePlaceQuery, useReservationQuery } from '../../../../generated/graphql';

export default function UpdatePlace() {
  const router = useRouter();
  const { query } = router;
  const id = query.id;

  const { data: placeData } = usePlaceQuery();
  const { data } = useReservationQuery();
  const currentReservation = data?.reservation.find((reservation) => reservation.id === id)

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="form">
          <h1>Detail rezervace</h1>
        <p>Název: {currentReservation?.name}</p>
        {/* <p>Čas: {`${new Date(timeFrom).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(timeTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</p> */}
        <p>
          Čas: {`${new Date(currentReservation?.timeFrom).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })} ${new Date(currentReservation?.timeFrom).toLocaleDateString()} - ${new Date(currentReservation?.timeTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', })} ${new Date(currentReservation?.timeTo).toLocaleDateString()} `}
        </p>
        <p>Sportoviště: {placeData?.place.find((plc) => plc.id === currentReservation?.place)?.name}</p>
        <p>Stav: 
                  {(currentReservation?.paid == true && currentReservation?.confirmed == true) ? ' Zaplaceno' : null}
                  {(currentReservation?.paid == false && currentReservation?.confirmed == true) ? ' Potvrzeno' : null}
                  {(currentReservation?.paid == false && currentReservation?.confirmed == false) ? ' Nepotvrzeno' : null}
                  </p>
        <p>Cena: {currentReservation?.charge} Kč</p>
        </div>
      </div>
    </div>
  );
}