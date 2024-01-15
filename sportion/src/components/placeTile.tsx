
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
import { usePlaceQuery, useDeletePlaceMutation } from '../../generated/graphql';

type Props = {};
const PlaceTable: FC<Props> = () => {
  const { data } = usePlaceQuery();
  const [deletePlace] = useDeletePlaceMutation();
  const handleDelete = (placeId: string) => {
    deletePlace({ variables: { id: placeId } });
    window.location.reload();
  };
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
          {data?.place.map((place) => (
            <TableRow key={place.id}>
              <TableCell align="center" component="th" scope="row">
                {place.name}
              </TableCell>
              <TableCell align="center">{place.cost}</TableCell>
              <TableCell align="center">
                <Link href={`/place/update/${place.id}`}>
                  <MenuItem>Upravit</MenuItem>
                </Link>
                <Button  color="error" onClick={() => handleDelete(place.id)}>
                  Smazat
                </Button>
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
        Místa
      </Typography>
      <PlaceTable />
    </Paper>
  );
};