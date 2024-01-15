import React, { FC, useEffect } from 'react';
import { Link, MenuItem, Typography, Button } from '@mui/material';
import { Reservation } from '../../types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDeleteReservationMutation, usePlaceQuery, useProfileQuery, useMyReservationQuery, useMyReservationLazyQuery, useMyProfileLazyQuery, useMyProfileQuery, useReservationQuery } from '../../generated/graphql';
import { useAuthContext } from './auth-context-provider';
import { profile } from 'console';

const ReservationsTable = () => {
  const { data: placeData } = usePlaceQuery();
  const { user } = useAuthContext();

  const { data: myProfileData } = useMyProfileQuery({ skip: !user })
  const profileData = myProfileData?.myProfile.find((profile) => profile.uid === user?.uid);

  let reservationData;

  const { data: adminProfilesData } = useProfileQuery({ skip: !user });

  if (profileData?.admin === true) {
    const { data: adminReservationData } = useReservationQuery();
    reservationData = adminReservationData?.reservation;
    // const { data: adminProfilesData } = useProfileQuery();
    // profilesData = adminProfilesData?.profile;
  } else {
    const { data: myReservationData } = useMyReservationQuery({ skip: !user });
    reservationData = myReservationData?.myReservation;
  }

  const [deleteReservation] = useDeleteReservationMutation();
  const handleDelete = async (reservationId: string) => {
    await deleteReservation({ variables: { id: reservationId } });
    window.location.reload();
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Název</TableCell>
            {profileData?.admin === true ? <TableCell align="center">Profil</TableCell> : null}
            <TableCell align="center">Místo</TableCell>
            <TableCell align="center">Čas</TableCell>
            <TableCell align="center">Datum</TableCell>
            <TableCell align="center">Zaplaceno</TableCell>
            <TableCell align="center">Potrvzeno</TableCell>
            <TableCell align="center">Akce</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {reservationData?.map((reservation) => {
            const place = placeData?.place.find((place) => place.id === reservation.place);

            return (
              <TableRow key={reservation.id}>
                <TableCell align="center" component="th" scope="row">
                  {reservation.name}
                </TableCell>

                {profileData?.admin === true ?
                  <TableCell align="center">{adminProfilesData?.profile?.find((profile) => profile?.uid === reservation.profile)?.name} {adminProfilesData?.profile?.find((profile) => profile?.uid === reservation.profile)?.surname}</TableCell>
                  : null}
                {/* <TableCell>prof</TableCell> */}

                <TableCell align="center">{place?.name}</TableCell>

                {/* <TableCell align="center">{reservation.timeFrom} - {reservation.timeTo}</TableCell> */}
                <TableCell align="center">
                  {`${new Date(reservation.timeFrom).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(reservation.timeTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                </TableCell>
                <TableCell align="center">
                  {new Date(reservation.timeFrom).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{reservation.paid ? 'Ano' : 'Ne'}</TableCell>
                <TableCell align="center">{reservation.confirmed ? 'Ano' : 'Nepotvrzeno'}</TableCell>
                <TableCell align="center">
                  <Link href={`/reservation/localpay/${reservation.id}`}>
                    {(reservation.paid != true && reservation.confirmed == true) ? <MenuItem>Doplatiti</MenuItem> : null}
                  </Link>
                  <Link href={`/reservation/pay/${reservation.id}`}>
                    {(reservation.paid != true && reservation.confirmed == true) ? <MenuItem>Zaplatit</MenuItem> : null}
                  </Link>
                  {(profileData?.admin == true && reservation.confirmed != true) ? <Link href={`/reservation/confirm/${reservation.id}`}><MenuItem>Potvrdit</MenuItem></Link> : null}
                  <Link href={`/reservation/update/${reservation.id}`}>
                    {(profileData?.admin == true) ? <MenuItem>Upravit</MenuItem> : null}
                  </Link>
                  {(reservation.paid != true || profileData?.admin == true) ? <Button color="error" onClick={() => handleDelete(reservation.id)}>Smazat</Button> : null}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>);
};

export const ReservationTile = () => {
  return (
    // <Paper sx={{ maxWidth: 500 }}>
    <Paper>
      {/* <Link  href="/reservation/create">
        <MenuItem >Přidat</MenuItem>
      </Link> */}
      <Typography className="tileHead" align="center" variant="h4">
        Rezervace
      </Typography>
      <ReservationsTable />
    </Paper>
  );
};