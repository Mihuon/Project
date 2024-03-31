import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useReservationQuery, useUpdateReservationMutation, usePlaceQuery } from '../../../../generated/graphql';
import Select from 'react-select';
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
  const [confirmed, setConfirmed] = useState(false);

  const places = usePlaceQuery().data?.place.map((place) => (
    { value: place.id, label: place.name }
  ))

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

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    if (typeof id === 'string') {
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
    }
    router.push('/');
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Upravit rezervaci</h1>
        <form onSubmit={handleForm} className="form">
          <label>
            <p>Název</p>
            <input
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              value={name}
            />
          </label>
          <label>
            <p>Začátek</p>
            <input
              onChange={(e) => setTimeFrom(e.target.value)}
              required
              type="datetime-local"
              value={timeFrom}
            />
          </label>
          <label>
            <p>Konec</p>
            <input
              onChange={(e) => setTimeTo(e.target.value)}
              required
              type="datetime-local"
              value={timeTo}
            />
          </label>
          <label>
            <p>Sportoviště</p>
            <Select
              onChange={(SelectedOption: any) => setPlace(String(SelectedOption.value))}
              options={places}
              value={places?.find((e) => e.value === place)}
              required
            />
          </label>

          <label>
            <p>Cena</p>
            <input
              onChange={(e) => setCharge(e.target.value)}
              required
              type="number"
              value={charge}
            />
          </label>
          <label>
            <p>Zaplaceno</p>
            <Select
              onChange={(SelectedOption: any) => setPaid(SelectedOption.value)}
              options={[{ value: true, label: "Ano" }, { value: false, label: "Ne" }]}
              required
              value={[{ value: true, label: "Ano" }, { value: false, label: "Ne" }].find((p) => p.value === paid)}
            />
          </label>
          <label>
            <p>Potvrzeno</p>
            <Select
              onChange={(SelectedOption: any) => setConfirmed(SelectedOption.value)}
              options={[{ value: true, label: "Ano" }, { value: false, label: "Ne" }]}
              required
              value={[{ value: true, label: "Ano" }, { value: false, label: "Ne" }].find((c) => c.value === confirmed)}
            />
          </label>
          <button type="submit">Upravit</button>
        </form>
      </div>
    </div>
  );
}