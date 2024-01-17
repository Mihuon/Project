import { Button, Grid, Link } from "@mui/material";
import { FC } from "react";
import { ReservationTile } from "./reservationTile";
import { PlaceTile } from "./placeTile";
import { ProfilesTile } from "./profilesTile";
import { useAuthContext } from "./auth-context-provider";
import { useMyProfileQuery } from "../../generated/graphql";
import { ToolsTile } from "./toolsTile";
import router from "next/router";
type Props = {};

export const IndexGrid: FC<Props> = () => {
  const { user } = useAuthContext();
  const { data } = useMyProfileQuery({skip:!user});
  const profileData = data?.myProfile.find((profile) => profile?.uid === user?.uid);

  return (
    // <Grid container spacing={3} justifyContent={"space-around"}>
    <>
    {user != undefined ?(
    <Grid className="indexGrid" container>
        <Grid item className="item1">
          <ReservationTile/>
        </Grid>
        
        <Grid item className="item2">
          <PlaceTile/>
        </Grid>
        
        {profileData?.admin ===true ? <Grid item className="item3"><ProfilesTile/></Grid>:null}
        
        <Grid item className="item4">
          <ToolsTile/>
        </Grid>
        <Grid item className="item5">
          <ToolsTile/>
        </Grid>
        
    </Grid>):(
    <div className="wrapper">
      <div className="form-wrapper">
        <Button variant="outlined"><Link href={`./login`}>Přihlásit se</Link></Button>
      </div>
    </div>
    )}</>
    
  );
};