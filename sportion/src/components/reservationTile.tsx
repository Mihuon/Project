import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { Reservation } from '../../types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useReservationQuery } from '../../generated/graphql';

type Props = {};

const ReservationsTable = () => {
  const { data } = useReservationQuery();
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Název</TableCell>
            <TableCell align="center">Místo</TableCell>
            <TableCell align="center">Od</TableCell>
            <TableCell align="center">Zaplaceno</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.reservation.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell align="center" component="th" scope="row">
                {reservation.name}
              </TableCell>
              <TableCell align="center">{reservation.place}</TableCell>
              <TableCell align="center">{reservation.timeFrom} - {reservation.timeTo}</TableCell>
              <TableCell align="center">{reservation.paid ? 'Ano' : 'Ne'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const ReservationTile: FC<Props> = () => {
  return (
    <Paper sx={{ maxWidth: 500 }}>
      <Typography align="center" variant="h4">Rezervace</Typography>
      <ReservationsTable/>
    </Paper>
  );
};

