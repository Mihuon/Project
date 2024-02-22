import { FC } from "react";
import { useProfileQuery } from "../../generated/graphql";
import { Button, Card, CardActions, CardContent, Paper, Typography } from "@mui/material";

type Props = {};
export const CardTile: FC<Props> = () => {
  return (
    // <Paper>
    //   <Typography className="tileHead" align="center" variant="h4">
    //     Uživatelé
    //   </Typography>
    // </Paper>
    <Paper>
    <CardContent>
      <Typography variant="h4" align="center" className="tileHead">
        aaa
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quibusdam, blanditiis est recusandae modi doloremque temporibus voluptatum eos atque commodi qui voluptas molestiae? Repellendus, ipsum rerum voluptate nisi ipsa rem.
      </Typography>
    </CardContent>
  </Paper>
  );
};