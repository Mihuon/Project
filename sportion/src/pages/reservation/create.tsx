import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { ReservationDocument, useCreateReservationMutation, usePlaceQuery, useReservationQuery } from '../../../generated/graphql';
import { authUtils } from '../../firebase/authUtils';
import { useAuthContext } from '@/components/auth-context-provider';
import Select from 'react-select';

export default function Page() {
  const { user } = useAuthContext()
  const [name, setName] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [place, setPlace] = useState('');
  const [charge, setCharge] = useState('');
  const [paid, setPaid] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [profile, setUser] = useState(user?.uid);
  const placeData = usePlaceQuery();
  const { data: ReservationData } = useReservationQuery();
  const router = useRouter();
  const [createReservation] = useCreateReservationMutation();
  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    const createReservationHandler = async () => {
      try {
        const overlap = ReservationData?.reservation?.find((r) => {
          const reservationPlace = r.place;
          const reservationStart = r.timeFrom;
          const reservationEnd = r.timeTo;
          const newReservationStart = timeFrom;
          const newReservationEnd = timeTo

          if (reservationStart != null && reservationEnd != null) {
            return (
              //Pouze na stejném místě && 
              // (Novy start v Stare rezervaci || 
              //   Novy konec v stare rezervaci || S
              //   Nova rezervace pres starou rezervaci)

              (reservationPlace == place &&
                (newReservationStart >= reservationStart && newReservationStart < reservationEnd) ||
                (newReservationEnd > reservationStart && newReservationEnd <= reservationEnd) ||
                (newReservationStart <= reservationStart && newReservationEnd >= reservationEnd))

            );
          }
        });
        const placeCost = placeData.data?.place.find((plc) => plc.id === place)?.cost;
        const hours = Math.abs(Number(new Date(timeFrom)) - Number(new Date(timeTo))) / 3600000;
        if (timeFrom > timeTo) {
          console.error("Bad Time");
        }
        else if (overlap) {
          console.error("Overlap");
        }
        else if (placeCost != null) {
          const result = await createReservation({
            variables: {
              name: name,
              timeFrom: timeFrom.toString(),
              timeTo: timeTo.toString(),
              place: place,
              charge: Math.floor(placeCost * hours),
              paid: false,
              confirmed: false,
              profile: profile
            }, refetchQueries: [{ query: ReservationDocument }], awaitRefetchQueries: true
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    await createReservationHandler();
    router.push('/');
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1>Vytvořit rezervaci</h1>
        <form onSubmit={handleForm} className="form">
          <label>
            <p>Název</p>
            <input
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
            />
          </label>
          <label>
            <p>Začátek</p>
            <input
              onChange={(e) => setTimeFrom(e.target.value)}
              required
              min={new Date().toString()}
              type="datetime-local"
            />
          </label>
          <label>
            <p>Konec</p>
            <input
              onChange={(e) => setTimeTo(e.target.value)}
              min={timeFrom}
              required
              type="datetime-local"
            />
          </label>
          <label>
            <p>Sportoviště</p>
            <Select
              onChange={(SelectedOption: any) => setPlace(String(SelectedOption.value))}
              options={usePlaceQuery().data?.place.map((place) => (
                { value: place.id, label: place.name }
              ))}
              required
            />
          </label>
          <button type="submit">Vytvořit</button>
        </form>
      </div>
    </div>
  );
}