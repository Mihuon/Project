
import React, { FC } from 'react';
import { Link, Typography, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { usePlaceQuery, useDeletePlaceMutation, useMyProfileQuery } from '../generated/graphql';
import { useAuthContext } from './auth-context-provider';

import InfoIcon from '@mui/icons-material/Info';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type Props = {};
const PlaceTable: FC<Props> = () => {
  usePlaceQuery().refetch()

  const { data } = usePlaceQuery();
  const [deletePlace] = useDeletePlaceMutation();
  const handleDelete = (placeId: string) => {
    deletePlace({ variables: { id: placeId } });
    window.location.reload();
  };
  const { data: placeData } = usePlaceQuery();
  const { user } = useAuthContext();
  const { data: myProfileData } = useMyProfileQuery({ skip: !user })
  const profileData = myProfileData?.myProfile.find((profile) => profile.uid === user?.uid);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Název</TableCell>
            <TableCell align="center">Cena</TableCell>
            <TableCell align="center">Akce</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {placeData?.place.map((place) => (
            <TableRow key={place.id}>
              <TableCell align="center" component="th" scope="row">
                {place.name}
              </TableCell>
              <TableCell align="center">{place.cost} Kč</TableCell>

              <TableCell align="center">
                <Link href={`/place/detail/${place.id}`}><Button><InfoIcon fontSize='medium' className='temp' /></Button></Link>
                {(profileData?.admin == true) ? (<><Link href={`/place/update/${place.id}`}><Button><EditNoteIcon fontSize='medium' className='temp' /></Button></Link><Button color="error" onClick={() => place.id && handleDelete(place.id)}><DeleteForeverIcon fontSize='medium' className='temp' /></Button></>) : null}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export const PlaceTile: FC<Props> = () => {
  return (
    <Paper >
      <Typography className="tileHead" align="center" variant="h4">
        Sportoviště
      </Typography>
      <PlaceTable />
    </Paper>
  );
};