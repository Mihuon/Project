
import React, { FC } from 'react';
import { Link, MenuItem, Typography, Button } from '@mui/material';
import { Place } from '../../types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { usePlaceQuery, useDeletePlaceMutation, useMyProfileQuery } from '../../generated/graphql';
import { useAuthContext } from './auth-context-provider';

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
              <TableCell align="center">{place.cost}</TableCell>
              <TableCell align="center">
              <Button><Link href={`/place/detail/${place.id}`}>Detail</Link></Button>
              {(profileData?.admin == true) ? (<><Button><Link href={`/place/update/${place.id}`}>Upravit</Link></Button><Button color="error" onClick={() => handleDelete(place.id)}>Smazat</Button></>):null}
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
    <Paper sx={{ maxWidth: 500 }}>
      {/* <Link href="/place/create">
        <MenuItem>Přidat</MenuItem>
      </Link> */}
      <Typography className="tileHead" align="center" variant="h4">
        Sportoviště
      </Typography>
      <PlaceTable />
    </Paper>
  );
};