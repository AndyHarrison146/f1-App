import { makeStyles } from '@material-ui/core/styles';
import theme from './theme';
import gradientImg from './img/backgroundColor.jpg';


export const useStyles = makeStyles(() => ({
  toolbar: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    alignItems: "center",
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    align: 'center',
    [theme.breakpoints.up('lg')]: {
      height: '5rem',
    },
    [theme.breakpoints.down('md')]: {
      height: '5rem',
    },
    [theme.breakpoints.down('sm')]: {
      height: '4rem',
    },
    [theme.breakpoints.down('xs')]: {
      height: '3rem',
    }
  },
  listItemText: {
    color: '#212121',
    padding: theme.spacing(1),
    [theme.breakpoints.up('lg')]: {
      fontSize: '1em'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '0.9em'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8em'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7em',
      padding: theme.spacing(1),
    }
  },
  circle: {
    marginTop: '5%'
  },
  formControl: {
    margin: '2%',
    [theme.breakpoints.up('lg')]: {
      width: '210px',
      height: '145px',
    },
    [theme.breakpoints.down('md')]: {
      width: '190px',
      height: '130px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '170px',
      height: '110px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '150px',
      height: '100px',
    },
  },
  formControlRace: {
    margin: '1.8%',
    [theme.breakpoints.up('lg')]: {
      width: '230px',
      height: '145px',
    },
    [theme.breakpoints.down('md')]: {
      width: '220px',
      height: '130px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '1.5%',
      width: '200px',
      height: '110px',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '1.3%',
      width: '170px',
      height: '100px',
    },
  },
  paperSelect: {
  marginTop: '8%',
  marginBottom: '1%',
  background: '#ffffff',
  borderRadius: '4px',
  },
  paperSelectRace: {
    marginTop: '8%',
    marginBottom: '1%',
    background: '#ffffff',
    borderRadius: '4px',
    },
  select: {
    [theme.breakpoints.up('lg')]: {
      width: '210px',
      height: '145px',
    },
    [theme.breakpoints.down('md')]: {
      width: '190px',
      height: '130px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '170px',
      height: '110px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '150px',
      height: '100px',
    },
  },
  selectRace: {
    [theme.breakpoints.up('lg')]: {
      width: '230px',
      height: '145px',
    },
    [theme.breakpoints.down('md')]: {
      width: '220px',
      height: '130px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '180px',
      height: '110px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '160px',
      height: '100px',
    },
  },
  container: {
    display: 'flex',
  },
  paper: {
    position: 'relative',
      width: "65%",
      overflowX: "auto",
      margin: theme.spacing(5),
      background: '#ffffff',
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
  },
  card: {
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(2),
      maxWidth: '35vw',
      maxHeight: '80vh',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(2),
      maxWidth: '40vw',
      maxHeight: '80vh',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      maxWidth: '50vw',
      maxHeight: '70vh',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      maxWidth: '80vw',
      maxHeight: '60vh',
    }
  },
  driverImg: {
    borderRadius: '50px',
    padding: '3%',
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('lg')]: {
      height: 330,
    },
    [theme.breakpoints.down('md')]: {
      height: 300,
    },
    [theme.breakpoints.down('sm')]: {
      height: 250,
    },
    [theme.breakpoints.down('xs')]: {
      height: 180,
    }
  },
  teamCard: {
    display: 'flex',
    float: 'left',
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      width: '45%',
    },
    [theme.breakpoints.down('md')]: {
      width: '45%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
  },
  teamImg: {
    width: '70%',
  },
  buttonGroup: {
    marginTop: theme.spacing(3),
    maxHeight: '90%',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.2em'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '1em'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9em'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8em',
      padding: theme.spacing(1),
    }
  },
  closeButton: {
    position: 'relative',
    display: 'block',
    width: '5%',
    float: 'right',
  },
  cardImg1: {
    textAlign: 'center',
    display: 'inline-block',
    height: '10rem',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(25),
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(20),
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(15),
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(1),
      height: '5rem',
    }
  },
  cardImg2: {
    float: 'right',
    textAlign: 'center',
    position: 'relative',
    display: 'inline-block',
    height: '10rem',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(25),   
    },
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(20), 
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(15), 
    },
    [theme.breakpoints.down('xs')]: {
      height: '5rem',
      marginRight: theme.spacing(1), 
    }
  },
  driverCardImg: {
    marginTop: theme.spacing(1),
    maxHeight: '100%',
    borderRadius: '40px',
    [theme.breakpoints.down('xs')]: {
      borderRadius: '20px',
    }
  },
  cardWins: {
    display: 'inline-block',
    width: '20%',
    position: 'relative',
    marginLeft: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      float: 'none',
      margin: 'auto',
      width: '50%',
      marginLeft: theme.spacing(9),
      marginBottom: theme.spacing(1),
    }
  },
  cardChampionships: {
    display: 'inline-block',
    width: '20%',
    textAlign: 'center',
    marginLeft: theme.spacing(13),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      width: '50%',
      float: 'none',
      margin: 'auto',
      marginLeft: theme.spacing(9),
      marginBottom: theme.spacing(1),
    }
  },
  cardDriverChamp: {
    float: 'right',
    width: '20%',
    marginRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
    },
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      width: '50%',
      float: 'none',
      margin: 'auto',
      marginLeft: theme.spacing(9),
      marginBottom: theme.spacing(1),
    }
  },
  cardInfo: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(1),
  },
  about: {
    margin: theme.spacing(3)
  },
  aboutText: {
    width: '70%',
    margin: theme.spacing(2)
  
  }
}))