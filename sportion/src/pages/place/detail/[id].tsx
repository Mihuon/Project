import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePlaceQuery } from '../../../../generated/graphql';

export default function UpdatePlace() {
  const router = useRouter();
  const { query } = router;
  const id = query.id;

  const { data } = usePlaceQuery();
  const currentPlace = data?.place.find((place) => place.id === id)

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="form">
          <h1>Detail sportoviště</h1>
          <p>Název: {currentPlace?.name}</p>
          <p>Cena: {currentPlace?.cost} Kč/h</p>
        </div>
      </div>
    </div>
  );
}