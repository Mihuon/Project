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
import { useMyProfileQuery, useProfileQuery } from '../../generated/graphql';
import { useAuthContext } from './auth-context-provider';

// import "../styles/soubor.css;"
type Props = {};

export const ToolsTile: FC<Props> = () => {
  const { user } = useAuthContext();
  const { data: myProfileData } = useMyProfileQuery({ skip: !user })
  const profileData = myProfileData?.myProfile.find((profile) => profile.uid === user?.uid);
  return (
    <Paper >
      <Typography className="tileHead" align="center" variant="h4">
        Nástroje
      </Typography>
      <div className='tools'>
      {profileData != undefined ? <Button color='primary' variant="contained" href="/reservation/create">Nová rezervace</Button>:null}
        {profileData?.admin === true ? <Button variant="contained" href="/place/create">Nové sportoviště</Button> : null}
      </div>
    </Paper>
  );
};