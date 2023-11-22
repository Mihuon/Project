import { FC } from "react";
import { Profile } from "../../types";
import { Avatar, CardHeader, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";

type Props = {
  profile: Profile;
};
export const ProfileTail: FC<Props> = (props) => {
  const {
    profile: { uid, name, surname, credit, admin },
  } = props;
    return (
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
    );
  };