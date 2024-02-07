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
    const [credit2, setCredit2] = useState('');
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
            credit: parseInt(credit) + parseInt(credit2),
            admin
        };
        const result = await updateProfile({
            variables: updatedProfileData,
        });

        router.push('/');
    };

    return (
        <div className='wrapper'>
            <div className="form-wrapper">
                <div className='form'>
                    <h1>Přidat kredit</h1>
                    <form onSubmit={handleForm} className="form">

                        <p>Jméno a příjmení: {name} {surname}</p>
                        <p>Role: {admin ? "Administrátor" : "Uživatel"}</p>
                        <p>Aktuální kredit: {credit} Kč</p>
                        <label>
                            <p>Přidaný kredit</p>
                            <input
                                onChange={(e) => setCredit2(e.target.value)}
                                required
                                type="number"
                            />
                        </label>
                        <button type="submit">Přidat</button>
                    </form>
                </div>
            </div>
        </div>
    );
}