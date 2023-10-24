import { Grid } from "@mui/material";
import ReservationTile from "./reservationTile";

const IndexGrid = () => {
  return (
    <Grid container spacing={{ xs: 4, m: 4 }} columns={{ xs: 1, sm: 8, md: 12}}>
      
        <Grid item xs={2} sm={4} md={4}>
          <ReservationTile/>
        </Grid>
        
        <Grid item xs={2} sm={4} md={4}>
          <ReservationTile/>
        </Grid>
        
        <Grid item xs={2} sm={4} md={4}>
          <ReservationTile/>
        </Grid>
        
        <Grid item xs={2} sm={4} md={4}>
          <ReservationTile/>
        </Grid>
      
    </Grid>
  );
};

export default IndexGrid;