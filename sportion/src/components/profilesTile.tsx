import React, { FC } from 'react';
import { Link, MenuItem, Typography, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useProfileQuery } from '../../generated/graphql';

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
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Akce</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.profile.map((profile) => (
            <TableRow key={profile.id}>
              <TableCell align="center">{`${profile?.name} ${profile?.surname}`}</TableCell>
              <TableCell align="center">{profile?.credit} Kč</TableCell>
              <TableCell align="center">{(profile.admin == true) ? "Administrátor" : "Uživatel"}</TableCell>
              <TableCell align="center"><Link href={`/profile/addcredit/${profile.id}`}><Button>Přidat kredit</Button></Link>
                <Link href={`/profile/update/${profile.id}`}><Button>Upravit</Button></Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export const ProfilesTile: FC<Props> = () => {
  return (
    <Paper>
      <Typography className="tileHead" align="center" variant="h4">
        Uživatelé
      </Typography>
      <ProfilesTable />
    </Paper>
  );
};