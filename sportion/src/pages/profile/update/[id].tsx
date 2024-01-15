import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useProfileQuery, useUpdateProfileMutation } from '../../../../generated/graphql';

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
        setUid(currentProfile.uid);
        setName(currentProfile.name);
        setSurname(currentProfile.surname);
        setCredit(currentProfile.credit);
        setAdmin(currentProfile.admin);
      }
    }
  }, [id, data]);

  const [updateProfile] = useUpdateProfileMutation();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

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

    router.push('/');
  };

  return (
    <div>
      <div className="form-wrapper">
        <h1>Update Profile</h1>
        <form onSubmit={handleForm} className="form">
          <label>
            <p>Uid</p>
            <input
              onChange={(e) => setUid(e.target.value)}
              required
              type="text"
              value={uid}
            />
          </label>
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
            <p>Surname</p>
            <input
              onChange={(e) => setSurname(e.target.value)}
              required
              type="text"
              value={surname}
            />
          </label>
          <label>
            <p>Credit</p>
            <input
              onChange={(e) => setCredit(e.target.value)}
              required
              type="number"
              value={credit}
            />
          </label>
          <label>
            <p>Admin</p>
            <select
              onChange={(e) => setAdmin(e.target.value === 'true')}
              required
              value={admin ? 'true' : 'false'}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <button type="submit">Update Place</button>
        </form>
      </div>
    </div>
  );
}