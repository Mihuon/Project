import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useReservationQuery, useUpdateReservationMutation, usePlaceQuery } from '../../../../generated/graphql';
import Select from 'react-select';
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

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const updatedReservationData = {
      id: id,
      name,
      timeFrom: timeFrom.toString(),
      timeTo: timeTo.toString(),
      place,
      charge: parseFloat(charge),
      paid,
      confirmed,
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
              type="datetime-local"
              value={timeFrom}
            />
          </label>
          <label>
            <p>Time To</p>
            <input
              onChange={(e) => setTimeTo(e.target.value)}
              required
              type="datetime-local"
              value={timeTo}
            />
          </label>
          <label>
            {/* <p>Místo</p>
            <Select
              onChange={(SelectedOption: any) => setPlace(String(SelectedOption.value))}
              options={usePlaceQuery().data?.place.map((place) => (
                { value: place.id, label: place.name }
              ))}
              value={options?.find((option)=>option.value === place)}
              required
            /> */}
            <p>Místo</p>
            <Select
              onChange={(SelectedOption: any) => setPlace(String(SelectedOption.value))}
              options={usePlaceQuery().data?.place.map((place) => (
                { value: place.id, label: place.name }
              ))}
              value={usePlaceQuery().data?.place.find((option)=>option.value === place)}
              required
            />
            {/* <select
              onChange={(e) => setPlace(e.target.value)}
              required
              value={place}
            >
              {usePlaceQuery().data?.place.map((place) => (
              <option key={place.id} value={place.id?.toString()}>{place.name}</option>
              ))}
            </select> */}
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
            <Select
              onChange={(SelectedOption: any) => setPaid(SelectedOption.value)}
              options={[{ value: true, label: "Yes"},{ value: false, label: "No"}]}
              required
              // value={paid}
            />
          </label>
          <label>
            <p>Confirmed</p>
            <Select
              onChange={(SelectedOption: any) => setConfirmed(SelectedOption.value)}
              options={[{ value: true, label: "Yes"},{ value: false, label: "No"}]}
              required
              // value={confirmed}
            />
          </label>
          <button type="submit">Update Reservation</button>
        </form>
      </div>
    </div>
  );
}