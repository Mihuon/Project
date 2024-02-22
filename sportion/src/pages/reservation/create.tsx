import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useCreateReservationMutation, usePlaceQuery, useReservationQuery } from '../../../generated/graphql';
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
          const reservationStart = r.timeFrom; const reservationEnd = r.timeTo; const newReservationStart = timeFrom; const newReservationEnd = timeTo
          return (
            //Novy start v Stare rezervaci || Novy konec v stare rezervaci || Nova rezervace pres starou rezervaci
            ((newReservationStart >= reservationStart && newReservationStart < reservationEnd) || (newReservationEnd > reservationStart && newReservationEnd <= reservationEnd) || (newReservationStart <= reservationStart && newReservationEnd >= reservationEnd) && reservationPlace==place)
          );
        });

        const placeCost = placeData.data?.place.find((plc) => plc.id === place)?.cost;


        const hours = Math.abs(Number(new Date(timeFrom)) - Number(new Date(timeTo))) / 3600000;


        console.log("tempo, placecost, hours", placeCost, hours);

        if (timeFrom > timeTo) {
          console.error("Bad Time");
        }
        else if (overlap) {
          console.error("Overlap");
        }
        else {
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
            },
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