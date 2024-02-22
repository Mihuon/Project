import { Button, Grid, Link } from "@mui/material";
import { FC } from "react";
import { ReservationTile } from "./reservationTile";
import { PlaceTile } from "./placeTile";
import { ProfilesTile } from "./profilesTile";
import { useAuthContext } from "./auth-context-provider";
import { useMyProfileQuery } from "../../generated/graphql";
import { ToolsTile } from "./toolsTile";
import router from "next/router";
import { CardTile } from "./cardTile";
type Props = {};

export const HomeGrid: FC<Props> = () => {
    const { user } = useAuthContext();
    const { data } = useMyProfileQuery({ skip: !user });
    const profileData = data?.myProfile.find((profile) => profile?.uid === user?.uid);

    return (
        <>
            <Grid className="homeGrid" container>
                <Grid item className="i_item1">
                    <img className="i_item1" src="https://image.lexica.art/full_webp/54cd375b-5d72-480a-9471-59f73a000d21" alt="image" />
                </Grid>

                <Grid item className="i_item2">
                    <CardTile/>
                </Grid>

                <Grid item className="i_item3">
                    <CardTile/>
                </Grid>

                <Grid item className="i_item3">
                    <CardTile/>
                </Grid>

                <Grid item className="i_item4">
                    <CardTile/>
                </Grid>

                <Grid item className="i_item1">
                    <img className="i_item1" src="https://image.lexica.art/full_webp/54cd375b-5d72-480a-9471-59f73a000d21" alt="image" />
                </Grid>
            </Grid>
        </>
    );
};