import { FC, ReactNode } from "react";
import { CardContent, Paper, Typography } from "@mui/material";

type Props = {
  icon: ReactNode;
  text: String;
};
export const CardTile: FC<Props> = ({ text, icon }) => {
  return (
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