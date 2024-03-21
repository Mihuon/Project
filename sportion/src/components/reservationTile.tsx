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
import { useDeleteReservationMutation, usePlaceQuery, useProfileQuery, useMyReservationQuery, useMyReservationLazyQuery, useMyProfileLazyQuery, useMyProfileQuery, useReservationQuery, DeleteReservationDocument, MyReservationDocument, ProfileDocument, ReservationDocument } from '../../generated/graphql';
import { useAuthContext } from './auth-context-provider';
import { profile, profileEnd } from 'console';

import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PaymentIcon from '@mui/icons-material/Payment';
const ReservationsTable = () => {
  // useMyProfileQuery().refetch();
  // useReservationQuery().refetch();
  // useMyReservationQuery().refetch();

  const { data: placeData } = usePlaceQuery();
  const { user } = useAuthContext();


  const { data: myProfileData } = useMyProfileQuery({ skip: !user })
  // const myProfileData = neco;
  const profileData = myProfileData?.myProfile.find((profile) => profile.uid === user?.uid);


  let reservationData;

  const { data: adminProfilesData } = useProfileQuery({ refetchQueries: [{ query: ProfileDocument }], awaitRefetchQueries: true });

  if (profileData?.admin === true) {
    const { data: adminReservationData } = useReservationQuery({ refetchQueries: [{ query: ReservationDocument }], awaitRefetchQueries: true });
    reservationData = adminReservationData?.reservation;
    // const { data: adminProfilesData } = useProfileQuery();
    // profilesData = adminProfilesData?.profile;
  } else {
    const { data: myReservationData } = useMyReservationQuery({ refetchQueries: [{ query: MyReservationDocument }], awaitRefetchQueries: true });
    reservationData = myReservationData?.myReservation;
  }

  const [deleteReservation] = useDeleteReservationMutation();
  const handleDelete = async (reservationId: string) => {
    // await deleteReservation({ variables: { id: reservationId }});
    await deleteReservation({
      variables: { id: reservationId },
      refetchQueries: [{ query: ReservationDocument, variables: { reservationId } }],
      awaitRefetchQueries: true
    });
  };




  const reservationData2 = reservationData ? [...reservationData].sort((a, b) => (new Date(a.timeFrom)).valueOf() - (new Date(b.timeFrom)).valueOf())
    : null;

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Název</TableCell>
            {profileData?.admin === true ? <TableCell align="center">Profil</TableCell> : null}
            <TableCell align="center">Sportoviště</TableCell>
            <TableCell align="center">Cena</TableCell>
            <TableCell align="center">Datum</TableCell>
            <TableCell align="center">Stav</TableCell>
            <TableCell align="center">Akce</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {reservationData2?.map((reservation) => {
            const place = placeData?.place.find((place) => place.id === reservation.place);

            return (
              <TableRow key={reservation.id}>
                <TableCell align="center" component="th" scope="row">
                  {reservation.name}
                </TableCell>

                {profileData?.admin ?
                  <TableCell align="center">{adminProfilesData?.profile?.find((profile) => profile?.uid === reservation.profile)?.name} {adminProfilesData?.profile?.find((profile) => profile?.uid === reservation.profile)?.surname}</TableCell>
                  : null}
                {/* <TableCell>prof</TableCell> */}

                <TableCell align="center">{place?.name}</TableCell>
                <TableCell align="center">{reservation?.charge} Kč</TableCell>

                {/* <TableCell align="center">{reservation.timeFrom} - {reservation.timeTo}</TableCell> */}
                <TableCell align="center">
                  {`${new Date(reservation.timeFrom).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(reservation.timeTo).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                  <br /> {new Date(reservation.timeFrom).toLocaleDateString([], { day: 'numeric', month: 'short' })}
                </TableCell>

                <TableCell align="center">
                  {(reservation.paid && reservation.confirmed) ? 'Zaplaceno' : null}
                  {(!reservation.paid && reservation.confirmed) ? 'Potvrzeno' : null}
                  {(!reservation.paid && !reservation.confirmed) ? 'Nepotvrzeno' : null}
                </TableCell>
                <TableCell align="center">
                  {/* <Link href={`/reservation/detail/${reservation.id}`}><Button>Detail</Button></Link>
                  {(!reservation.paid && reservation.confirmed && profileData?.admin) ? <Link href={`/reservation/localpay/${reservation.id}`}><Button>Doplatit</Button> </Link> : null}
                  {(!reservation.paid && reservation.confirmed && reservation.profile == profileData?.uid) ? <Link href={`/reservation/pay/${reservation.id}`}><Button>Zaplatit</Button></Link> : null}
                  {(profileData?.admin && !reservation.confirmed) ? <Link href={`/reservation/confirm/${reservation.id}`}><Button>Potvrdit</Button></Link> : null}
                  {(profileData?.admin) ? <Link href={`/reservation/update/${reservation.id}`}><Button>Upravit</Button></Link> : null}
                  {(!reservation.paid || profileData?.admin) ? <Button color="error" onClick={() => handleDelete(reservation.id)}>Smazat</Button> : null} */}

                  <Link href={`/reservation/detail/${reservation.id}`}><Button><InfoIcon fontSize='medium' className='temp' /></Button></Link>
                  {(!reservation.paid && reservation.confirmed && profileData?.admin) ? <Link href={`/reservation/localpay/${reservation.id}`}><Button><PointOfSaleIcon fontSize='medium' className='temp' /></Button></Link> : null}
                  {(!reservation.paid && reservation.confirmed && reservation.profile == profileData?.uid) ? <Link href={`/reservation/pay/${reservation.id}`}><Button><PaymentIcon fontSize='medium' className='temp' /></Button></Link> : null}
                  {(profileData?.admin && !reservation.confirmed) ? <Link href={`/reservation/confirm/${reservation.id}`}><Button><CheckCircleIcon fontSize='medium' className='temp' /></Button></Link> : null}
                  {(profileData?.admin) ? <Link href={`/reservation/update/${reservation.id}`}><Button><EditNoteIcon fontSize='medium' className='temp' /></Button></Link> : null}
                  {(!reservation.paid || profileData?.admin) ? <Button color="error" onClick={() => handleDelete(reservation.id)}><DeleteForeverIcon fontSize='medium' className='temp' /></Button> : null}
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
    <Paper>
      <Typography className="tileHead" align="center" variant="h4">
        Rezervace
      </Typography>
      <ReservationsTable />
    </Paper>
  );
};