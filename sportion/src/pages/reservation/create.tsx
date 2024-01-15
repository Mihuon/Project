import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useCreateReservationMutation, usePlaceQuery } from '../../../generated/graphql';
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

  const router = useRouter();
  const [createReservation] = useCreateReservationMutation();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const createReservationHandler = async () => {
      try {
        
  // const placeCost = usePlaceQuery().data.place.find((plc) => plc.id === place)?.cost;
  // const hours = Math.abs(new Date(timeFrom) - new Date(timeTo)) / 3600000;

        const result = await createReservation({
          variables: {
            name: name,
            timeFrom: timeFrom.toString(),
            timeTo: timeTo.toString(),
            place: place,
            charge: parseInt(charge),
            paid: paid,
            confirmed: confirmed,
            profile: profile
          },
        });

      } catch (error) {
        console.error(error);
      }
    };
    await createReservationHandler();
    router.push('/');
  };

  return (
    <div>
      <div className="form-wrapper">
        <h1>Create Reservation</h1>
        <form onSubmit={handleForm} className="form">
          <label>
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
            />
          </label>
          <label>
            <p>Time From</p>
            <input
              onChange={(e) => setTimeFrom(e.target.value)}
              required
              type="datetime-local"
            />
          </label>
          <label>
            <p>Time To</p>
            <input
              onChange={(e) => setTimeTo(e.target.value)}
              required
              type="datetime-local"
            />
          </label>
          <label>
            <p>Místo</p>
            <Select
              onChange={(SelectedOption: any) => setPlace(String(SelectedOption.value))}
              options={usePlaceQuery().data?.place.map((place) => (
                { value: place.id, label: place.name }
              ))}
              required
            />

            {/* <select
              onChange={(e) => setPlace(e.target.value)}
              required
            >
              <option selected disabled>Select Place</option>
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
            />
          </label>
          {/* <label>
            <p>Paid</p>
            <select
              onChange={(e) => setPaid(e.target.value === 'true')}
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>

          <label>
            <p>Confirmed</p>
            <select
              onChange={(e) => setConfirmed(e.target.value === 'true')}
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label> */}
          <label>
            <p>Paid</p>
            <Select
              onChange={(SelectedOption: any) => setPaid(SelectedOption.value)}
              options={[{ value: true, label: "Yes"},{ value: false, label: "No"}]}
              required
            />
          </label>
          <label>
            <p>Confirmed</p>
            <Select
              onChange={(SelectedOption: any) => setConfirmed(SelectedOption.value)}
              options={[{ value: true, label: "Yes"},{ value: false, label: "No"}]}
              required
            />
          </label>
          <button type="submit">Create Reservation</button>
        </form>
      </div>
    </div>
  );
}