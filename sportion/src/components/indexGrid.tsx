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
import InfoIcon from '@mui/icons-material/Info';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StadiumIcon from '@mui/icons-material/Stadium';
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
              <img className="i_item1" src="teniscourt.png" alt="image" />
              <h5 className="Title">Sportion</h5></Grid>

            <Grid item className="i_item2">
              <CardTile icon={<InfoIcon fontSize='large' className='temp' />} text={"Sportion je webová aplikace sloužící pro rezervcace sportovních hřišť. Pro vytvoření takové rezervace se stačí přihlásit nebo zaregistrovat, vybrat čas a datum rezervace a sportoviště, o které máte zájem. Platbu můžete udělat ihned po schválení rezervace správcem pomocí kreditů u vašeho profilu nebo až při návštěvě sporotviště."} />
            </Grid>


            <div className="wrapper">
              <Paper className="form-wrapper2">
                <h1>Pro vstup se přihlaste</h1><div className="temp">
                  <Link href={`./login`}><Button variant="contained">Přihlásit se</Button></Link></div>
              </Paper>
            </div>
            <Grid item className="i_item4">
              <CardTile icon={<EventNoteIcon fontSize='large' className='temp' />} text={"Vaši rezervaci daného sportoviště zkontroluje správce a poté ji schválí. Následně se stačí v daný dostavit na sportoviště a rezervaci uhradit, pokud jste již tak neučinili. Poté vám již nic nebrání a můžete si jít užít vaší rezervaci."} />
            </Grid>
            <Grid item className="i_item5">
              <img className="i_item5" src="footballfield.png" alt="image" />
            </Grid>
          </Grid></>
      )}</>

  );
};