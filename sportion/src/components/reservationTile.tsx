// import React from 'react';
// import { Typography } from '@mui/material';
// import { Reservation } from '../../types';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const reservationsData = [
//   { id: 1, name: "Trenink", place: "Hřiště", timeFrom: 8, timeTo: 10, charge: 10, paid: true },
//   { id: 2, name: "Zápas", place: "Hřiště", timeFrom: 11, timeTo: 12, charge: 15, paid: false },
//   { id: 3, name: "Tenisový zápas", place: "Kurty", timeFrom: 9, timeTo: 11, charge: 30, paid: true }
// ];

// const ReservationsTable = ({ reservations }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell align="center">Name</TableCell>
//             <TableCell align="center">Place</TableCell>
//             <TableCell align="center">From</TableCell>
//             <TableCell align="center">To</TableCell>
//             <TableCell align="center">Paid</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {reservations.map((reservation) => (
//             <TableRow key={reservation.id}>
//               <TableCell align="center" component="th" scope="row">
//                 {reservation.name}
//               </TableCell>
//               <TableCell align="center">{reservation.place}</TableCell>
//               <TableCell align="center">{reservation.timeFrom}</TableCell>
//               <TableCell align="center">{reservation.timeTo}</TableCell>
//               <TableCell align="center">{reservation.paid ? 'Yes' : 'No'}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// const Reservations = () => {
//   return (
//     <Paper sx={{ maxWidth: 500 }}>
//       <Typography align="center" variant="h4">Reservations</Typography>
//       <ReservationsTable reservations={reservationsData} />
//     </Paper>
//   );
// };

// export default Reservations;

import React from 'react';
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
//TODO: GraphQL napojení

const reservationsData = [
  { id: "a", name: "Trenink", place: "Hřiště", timeFrom: 8, timeTo: 10, charge: 10, paid: true },
  { id: "b", name: "Zápas", place: "Hřiště", timeFrom: 11, timeTo: 12, charge: 15, paid: false },
  { id: "c", name: "Tenisový zápas", place: "Kurty", timeFrom: 9, timeTo: 11, charge: 30, paid: true },
  { id: "d", name: "Fotbalový trénink", place: "Fotbalové hřiště", timeFrom: 7, timeTo: 11, charge: 30, paid: true }
];

const sortedReservations = reservationsData.slice().sort((a, b) => a.timeFrom - b.timeFrom);

const ReservationsTable = () => {
const { data } = useReservationQuery();
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Place</TableCell>
            <TableCell align="center">From</TableCell>
            <TableCell align="center">To</TableCell>
            <TableCell align="center">Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.reservation.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell align="center" component="th" scope="row">
                {reservation.name}
              </TableCell>
              <TableCell align="center">{reservation.place}</TableCell>
              <TableCell align="center">{reservation.timeFrom}</TableCell>
              <TableCell align="center">{reservation.timeTo}</TableCell>
              <TableCell align="center">{reservation.paid ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ReservationTile = () => {
  return (
    <Paper sx={{ maxWidth: 500 }}>
      <Typography align="center" variant="h4">Upcoming reservations</Typography>
      <ReservationsTable reservations={reservationsData} />
    </Paper>
  );
};

export default ReservationTile;
