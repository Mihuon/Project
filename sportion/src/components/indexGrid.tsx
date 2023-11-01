import { Grid } from "@mui/material";
import { FC } from "react";
import { ReservationTile } from "./reservationTile";

type Props = {};

export const IndexGrid: FC<Props> = () => {
  return (
    <Grid container spacing={3} justifyContent={"space-around"}>
        <Grid item>
          <ReservationTile/>
        </Grid>
        
        <Grid item>
          <ReservationTile/>
        </Grid>
        
        <Grid item>
          <ReservationTile/>
        </Grid>
        
        <Grid item>
          <ReservationTile/>
        </Grid>
    </Grid>
    
  );
};