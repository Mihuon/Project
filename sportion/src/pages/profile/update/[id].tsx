import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useProfileQuery, useUpdateProfileMutation } from '../../../../generated/graphql';
import Select from 'react-select';

export default function UpdateProfile() {
  const router = useRouter();
  const { query } = router;
  const id = query.id;

  const { data } = useProfileQuery();

  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [credit, setCredit] = useState('');
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (id && data && data.profile) {
      const currentProfile = data.profile.find(profile => profile.id === id);

      if (currentProfile) {
        if (currentProfile.uid) { setUid(currentProfile.uid); }
        if (currentProfile.name) { setName(currentProfile.name); }
        if (currentProfile.surname) { setSurname(currentProfile.surname); }
        if (currentProfile.credit) { setCredit(currentProfile.credit.toString()); }
        if (currentProfile.admin) { setAdmin(currentProfile.admin); }
      }
    }
  }, [id, data]);

  const [updateProfile] = useUpdateProfileMutation();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    if (typeof id == 'string') {


      const updatedProfileData = {
        id: id,
        uid,
        name,
        surname,
        credit: parseInt(credit),
        admin
      };
      const result = await updateProfile({
        variables: updatedProfileData,
      });
    }
    router.push('/');
  };

  return (
    <div className='wrapper'>
      <div className="form-wrapper">
        <div className='form'>
          <h1>Upravit profil</h1>
          <form onSubmit={handleForm} className="form">

            <label>
              <p>Jméno</p>
              <input
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                value={name}
              />
            </label>
            <label>
              <p>Příjmení</p>
              <input
                onChange={(e) => setSurname(e.target.value)}
                required
                type="text"
                value={surname}
              />
            </label>
            <label>
              <p>Kredit</p>
              <input
                onChange={(e) => setCredit(e.target.value)}
                required
                type="number"
                value={credit}
              />
            </label>

            <label>
              <p>Administrátor</p>
              <Select
                onChange={(SelectedOption: any) => setAdmin(SelectedOption.value)}
                options={[{ value: true, label: "Ano" }, { value: false, label: "Ne" }]}
                required
                value={[{ value: true, label: "Ano" }, { value: false, label: "Ne" }].find((p) => p.value === admin)}
              />
            </label>


            <button type="submit">Upravit profil</button>
          </form>
        </div>
      </div>
    </div>
  );
}