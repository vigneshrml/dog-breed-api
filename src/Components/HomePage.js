import React from 'react'
import { Link } from "react-router-dom"
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme)=>({
    root: {
        flexGrow: 1,
      maxWidth: 345,
      background  :"#2A2E35"
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
      }
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

export default function HomePage({data,loaded}) {

    const classes = useStyles();

    var dogList = data.slice(70,90);

 console.log(dogList)

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" className={classes.bodyContent}>
            <Typography className={classes.heading} variant="h5" component="h2">Dog Breed Listed</Typography>

            <Grid container spacing={3}>

            {loaded ? 
            
            <Backdrop className={classes.backdrop} open={loaded}>
                <CircularProgress color="inherit" />
            </Backdrop>

            : dogList.map((data)=>{
                return(

                <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.root}>
                <CardActionArea to={`/dog-breed/${data.id}`} component={Link}>
                <CardMedia
                        className={classes.media}
                        image={data.image.url}
                        title="Contemplative Reptile"
                        />
                    <CardContent>
                    <Typography gutterBottom variant="body1">
                       {data.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {data.temperament}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button to={`/dog-breed/${data.image.id}`} component={Link} size="small" color="primary" variant='contained'>
                    Learn More
                    </Button>
                    <Typography variant="caption" className={classes.react}>
                        {data.life_span}
                    </Typography>
                </CardActions>
                </Card>
                </Grid>

                )
            })}

            </Grid>


         </Container>
        </ThemeProvider>
    )
}
