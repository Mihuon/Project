import { blue, red } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material/styles';

const style: ThemeOptions = {
    components:{
        MuiPaper:{
            styleOverrides:{
                root:{
                    borderRadius:25
                }
            }
        },      
        MuiButton:{
            styleOverrides:{
                root:{
                    background:red[500],
                    color:'white',
                    borderRadius:20,
                    ":hover" :{
                        background:red[900]
                    }
                }
            }
        }
    }
};

export default style;