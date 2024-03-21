import { FC, ReactNode } from "react";
import { useProfileQuery } from "../../generated/graphql";
import { Button, Card, CardActions, CardContent, Paper, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

type Props = {
  icon: ReactNode;
  text: String;
};
export const CardTile: FC<Props> = ({ text, icon }) => {
  return (
    // <Paper>
    //   <Typography className="tileHead" align="center" variant="h4">
    //     Uživatelé
    //   </Typography>
    // </Paper>
    <Paper>
      <CardContent>
        <Typography variant="h4" align="center" className="tileHead">
          {icon}
        </Typography>
        <Typography variant="body2">
          {text}
        </Typography>
      </CardContent>
    </Paper>
  );
};