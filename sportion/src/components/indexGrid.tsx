import { Grid } from "@mui/material";
import { FC } from "react";
import { ReservationTile } from "./reservationTile";
import { PlaceTile } from "./placeTile";
import { ProfilesTile } from "./profilesTile";
type Props = {};

export const IndexGrid: FC<Props> = () => {
  return (
    <Grid container spacing={3} justifyContent={"space-around"}>
        <Grid item>
          <ReservationTile/>
        </Grid>
        
        <Grid item>
          <PlaceTile/>
        </Grid>
        
        <Grid item>
          <ProfilesTile/>
        </Grid>
        
        {/* <Grid item>
          <ReservationTile/>
        </Grid>
        
        <Grid item>
          <ReservationTile/>
        </Grid>
        
        <Grid item>
          <ReservationTile/>
        </Grid> */}
    </Grid>
    
  );
};