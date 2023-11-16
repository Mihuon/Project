import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePlaceQuery, useUpdatePlaceMutation } from '../../../../generated/graphql';

export default function UpdatePlace() {
  const router = useRouter();
  const { query } = router;
  const id = query.id;

  const { data } = usePlaceQuery();

  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  useEffect(() => {
    if (id && data && data.place) {
      const currentPlace = data.place.find(place => place.id === id);

      if (currentPlace) {
        setName(currentPlace.name);
        setCost(currentPlace.cost.toString());
      }
    }
  }, [id, data]);

  const [updatePlace] = useUpdatePlaceMutation();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const updatedPlaceData = {
      id: id,
      name,
      cost: parseInt(cost),
    };
    const result = await updatePlace({
      variables: updatedPlaceData,
    });

    router.push('/');
  };

  return (
    <div>
      <div className="form-wrapper">
        <h1>Update Place</h1>
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
            <p>Cost</p>
            <input
              onChange={(e) => setCost(e.target.value)}
              required
              type="number"
              value={cost}
            />
          </label>
          <button type="submit">Update Place</button>
        </form>
      </div>
    </div>
  );
}