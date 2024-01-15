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
import { useProfileQuery } from '../../generated/graphql';
// import "../styles/soubor.css;"
type Props = {};

export const ToolsTile: FC<Props> = () => {
  return (
    <Paper sx={{ maxWidth: 500 }}>
      <Typography className="tileHead" align="center" variant="h4">
        Nástroje
      </Typography>
      <Button variant="outlined" href="/reservation/create">Nová rezervace</Button>
      <Button variant="outlined" href="/place/create">Nové sportoviště</Button>
      <Button variant="outlined" href="">Platba</Button>
    </Paper>
  );
};