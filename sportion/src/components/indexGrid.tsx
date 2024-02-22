import { Button, Grid, Link, Paper } from "@mui/material";
import { FC } from "react";
import { ReservationTile } from "./reservationTile";
import { PlaceTile } from "./placeTile";
import { ProfilesTile } from "./profilesTile";
import { useAuthContext } from "./auth-context-provider";
import { useMyProfileQuery } from "../../generated/graphql";
import { ToolsTile } from "./toolsTile";
import router from "next/router";
import { title } from "process";
import { CardTile } from "./cardTile";
type Props = {};

export const IndexGrid: FC<Props> = () => {
  const { user } = useAuthContext();
  const { data } = useMyProfileQuery({ skip: !user });
  const profileData = data?.myProfile.find((profile) => profile?.uid === user?.uid);

  return (
    // <Grid container spacing={3} justifyContent={"space-around"}>
    <>
      {user != undefined ? (
        <Grid className="indexGrid" container>
          <Grid item className="item1">
            <ReservationTile />
          </Grid>

          <Grid item className="item2">
            <PlaceTile />
          </Grid>

          <Grid item className="item3">
            <ToolsTile />
          </Grid>

          {profileData?.admin === true ? <Grid item className="item4"><ProfilesTile /></Grid> : null}

          {/* <Grid item className="item5">
          <ToolsTile/>
        </Grid> */}

        </Grid>) : (
          // router.push("/homePage")
        // <div className="wrapper">
        //   <div className="form-wrapper">
        //     <h1>Žádný uživatel není přihlášený</h1><div className="temp">
        //       <Link href={`./login`}><Button variant="contained">Přihlásit se</Button></Link></div>
        //   </div>
        // </div>

        <>
        
        <Grid className="homeGrid" container>
                <Grid item className="i_item1">
                    {/* <img className="i_item1" src="https://polanka.ostrava.cz/cs/o-polance/fotogalerie/ostatni/budovy/budova-a/fotbalove-hriste/image" alt="image" /> */}
                    <img className="i_item1" src="https://www.arealsportu.cz/cache/xart_thumbnails/89539c8f5bad07d4f68fcb15d27b0119.jpg" alt="image" />
                <h5 className="Title">Sportion</h5></Grid>

                <Grid item className="i_item2">
                    <CardTile/>
                </Grid>

                
                <div className="wrapper">
          <Paper className="form-wrapper2">
            <h1>Pro vstup se přihlaste</h1><div className="temp">
              <Link href={`./login`}><Button variant="contained">Přihlásit se</Button></Link></div>
          </Paper>
        </div>

                <Grid item className="i_item4">
                    <CardTile/>
                </Grid>

                <Grid item className="i_item5">
                    <img className="i_item5" src="https://www.arealsportu.cz/cache/xart_thumbnails/aceea97b35091c98dceeef7446821339.JPG" alt="image" />
                </Grid>



                <Grid item className="i_item2">
                    <CardTile/>
                </Grid>

                <Grid item className="i_item3">
                    <CardTile/>
                </Grid>

                {/* <div className="wrapper">
          <div className="form-wrapper2">
            <h1>Žádný uživatel není přihlášený</h1><div className="temp">
              <Link href={`./login`}><Button variant="contained">Přihlásit se</Button></Link></div>
          </div>
        </div> */}

                <Grid item className="i_item4">
                    <CardTile/>
                </Grid>

            </Grid></>
      )}</>

  );
};