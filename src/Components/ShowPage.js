import React , { useState, useEffect }from 'react'
import { useParams ,Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme)=>({
    root: {
        flexGrow: 1,
      maxWidth: "50%",
      margin : "auto",
      background  :"#2A2E35"
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: "50%",
      },
    media: {
      height: 200,
    },
    bodyContent : {
        marginTop : 30
    },
    heading : {
        color : 'white',
        marginBottom : 30
    },
    badge : {
        color : "#02CBEF"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
      react : {
          color : "#03D5F1",
          backgroundColor : '#222222',
          padding : "4px 10px",
          fontSize : 10,
          borderRadius : 4,
          textTransform : "uppercase"
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
  }));


  const theme = createMuiTheme({
    palette: {
        type: 'dark',
      primary: {
        // This is green.A700 as hex.
        main: '#FFCB2B',
      },
    },
  });

export default function ShowPage() {
    const classes = useStyles();

    let { name } = useParams();

 

    const [data , setData] = useState([]);
    const [loaded , setLoaded] = useState(true);
  
    useEffect(()=>{
        fetch("https://api.thedogapi.com/v1/breeds")
        .then((res)=>{
            if(res.ok){
               return res.json()
            }
        }).then((res)=>{
            setData(res);
            setLoaded(false);
        });
    },[]);
  
    var item = data.find(item => item.image.id === name);
    
    console.log(item)

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" className={classes.bodyContent}>


            {

                loaded ? 
                            
                <Backdrop className={classes.backdrop} open={loaded}>
                    <CircularProgress color="inherit" />
                </Backdrop>

                :

                <Grid container spacing={3}>
                    <Grid item lg={12}>
                    <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={item.image.url} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h6">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {item.temperament}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Breed for: {item.bred_for}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Breed group: {item.breed_group}
                                    </Typography>
                                    {item.origin ? <Typography variant="body2" color="textSecondary">Origin: {item.origin}</Typography> : <></>}
                                    <Typography variant="body2">
                                         Height
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Imperial: {item.height.imperial}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Metric: {item.height.metric}
                                    </Typography>
                                    <Typography variant="body2">
                                         Weight
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Imperial: {item.weight.imperial}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Metric: {item.weight.metric}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                <Button to="/" component={Link} size="small" color="primary" variant='contained'>
                                    GoTo Home
                                    </Button>
                                </Grid>
                                </Grid>
                                <Grid item>
                                <Typography variant="caption" className={classes.react}>{item.life_span}</Typography>
                                </Grid>
                            </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

            }

            </Container>
        </ThemeProvider>    
    )
}
