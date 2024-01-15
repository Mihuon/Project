import { Grid } from "@mui/material";
import { FC } from "react";
import { ReservationTile } from "./reservationTile";
import { PlaceTile } from "./placeTile";
import { ProfilesTile } from "./profilesTile";
import { useAuthContext } from "./auth-context-provider";
import { useMyProfileQuery } from "../../generated/graphql";
import { ToolsTile } from "./toolsTile";
type Props = {};

export const IndexGrid: FC<Props> = () => {
  const { user } = useAuthContext();
  const { data } = useMyProfileQuery({skip:!user});
  const profileData = data?.myProfile.find((profile) => profile?.uid === user?.uid);

  return (
    // <Grid container spacing={3} justifyContent={"space-around"}>
    <Grid className="indexGrid" container>
        <Grid  item>
          <ReservationTile/>
        </Grid>
        
        <Grid item>
          <PlaceTile/>
        </Grid>
        
        {profileData?.admin ===true ? <Grid item><ProfilesTile/></Grid>:null}
        
        <Grid item>
          <ToolsTile/>
        </Grid>
    </Grid>
    
  );
};