import React ,{useState} from 'react';
import YoLogo from './imgs/YOlogo.svg';
//import con from './connect';
//import BreadTop from './imgs/Asset 3.svg';
//import BreadBottom from './imgs/Asset 4.svg';
import './App.css';
import './CSS/other.css';

import LogIn from './components/LogIn';
import Menu from './components/Menu';
import {BrowserRouter as Router, Switch, Route, Link}from 'react-router-dom';
import About from './PageComponents/About';
import Home from './PageComponents/Home';
import Order from './PageComponents/Order';
function App() {
  
 //var orderData = 'ceva';
 const [OrderData, setOrderData] = useState([]);
 const getData = (data) =>{
    setOrderData(data);
 }
  return (
    <Router>
    <div className="App">
      <div className="Page-container">
          <header className="App-header">
            {/*<p style={{marginLeft: '50px'}}>menu</p>*/}
            <Menu />
            <Link to="/">
              <img src={YoLogo} style={{height: '80px',cursor:'pointer',paddingTop:'10px'}}alt="React Logo" />
            </Link>
            <LogIn />
          </header>
          <div>
            <Switch>
              {/*<Route path='/' exact component={Home}/>*/}
              <Route exact path="/" render={(props) => <Home {...props} />} />
              <Route path='/about' component={About}/>
              {/*<Route path='/order' component={Order} orderData={orderData}/>*/}
              <Route exact path="/order" render={(props) => <Order {...props} orderData={OrderData} />} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}
//deci in app js o sa avem toate componentele
//sendwich maker, menu-uri, etc.

export default App;
