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
import { useProfileQuery} from '../../generated/graphql';

type Props = {};
const ProfilesTable: FC<Props> = () => {
  const { data } = useProfileQuery();
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Jméno</TableCell>
            <TableCell align="center">Kredit</TableCell>
            <TableCell align="center">Admin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.profile.map((profile) => (
            <TableRow key={profile.id}>
              <TableCell align="center" component="th" scope="row">
                {profile.name}
              </TableCell>
              <TableCell align="center">{`${profile?.name} ${profile?.surname}`}</TableCell>
              <TableCell align="center">{(profile.admin ==true)? "Ano" : "Ne"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export const ProfilesTile: FC<Props> = () => {
  return (
    <Paper sx={{ maxWidth: 500 }}>
      <Typography className="tileHead" align="center" variant="h4">
        Profily
      </Typography>
      <ProfilesTable />
    </Paper>
  );
};