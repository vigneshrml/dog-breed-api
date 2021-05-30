import React , { useEffect , useState} from "react";
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Show from "./Components/ShowPage";
import Home from "./Components/HomePage";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
      type: 'dark',
  },
});


function App() {


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


  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/">
          <Home data={data} loaded={loaded} />
        </Route>
        <Route exact path="/dog-breed/:name">
          <Show />
        </Route>
      </Switch>
    </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
