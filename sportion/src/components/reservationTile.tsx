import React, { FC } from 'react';
import { Link, MenuItem, Typography, Button } from '@mui/material';
import { Reservation } from '../../types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useReservationQuery, useDeleteReservationMutation, usePlaceQuery, useProfileQuery } from '../../generated/graphql';
import { useAuthContext } from './auth-context-provider';

const ReservationsTable = () => {
  const { data: reservationData } = useReservationQuery();
  const { data: placeData } = usePlaceQuery();
  const {data: profileData} = useProfileQuery();
  const { user } = useAuthContext();
  const profile = profileData?.profile.find((profile) => profile?.uid === user?.uid);
  //todo: filtrovat už na serveru, query myReservation
  const filteredReservationData = reservationData?.reservation.filter(reservation => user?.uid === reservation.profile);

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
            <TableCell align="center">Místo</TableCell>
            <TableCell align="center">Od</TableCell>
            <TableCell align="center">Zaplaceno</TableCell>
            <TableCell align="center">Potrvzeno</TableCell>
            <TableCell align="center">Akce</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {filteredReservationData?.map((reservation) => {
            const place = placeData?.place.find((place) => place.id === reservation.place);

            return (
              <TableRow key={reservation.id}>
                <TableCell align="center" component="th" scope="row">
                  {reservation.name}
                </TableCell>
                <TableCell align="center">{place?.name}</TableCell>
                <TableCell align="center">{reservation.timeFrom} - {reservation.timeTo}</TableCell>
                <TableCell align="center">{reservation.paid ? 'Ano' : 'Ne'}</TableCell>
                <TableCell align="center">{reservation.confirmed ? 'Ano' : 'Nepotvrzeno'}</TableCell>
                <TableCell align="center">
                <Link href={`/reservation/pay/${reservation.id}`}>
                    <MenuItem>Zaplatit</MenuItem>
                  </Link>
                {profile?.admin == true ? (<Link href={`/reservation/confirm/${reservation.id}`}><MenuItem>Potvrdit</MenuItem></Link>) :null}
                  <Link href={`/reservation/update/${reservation.id}`}>
                    <MenuItem>Upravit</MenuItem>
                  </Link>
                  <Button color="error" onClick={() => handleDelete(reservation.id)}>
                    Smazat
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const ReservationTile = () => {
  return (
    // <Paper sx={{ maxWidth: 500 }}>
    <Paper>
      <Link href="/reservation/create">
        <MenuItem>Přidat</MenuItem>
      </Link>
      <Typography align="center" variant="h4">
        Rezervace
      </Typography>
      <ReservationsTable />
    </Paper>
  );
};