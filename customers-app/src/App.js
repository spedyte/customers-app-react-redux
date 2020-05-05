import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer';
import CustomerContainer from './containers/CustomerContainer';

class  App extends Component{
renderHome = () => <HomeContainer/>;

  renderCustomerContainer = () =><h1>Customer Container</h1>;

  renderCustomerListContainer = () => <CustomersContainer/>;
  
  render(){
    return (
      <Router>
      <div className="App">
        {/* <Link to="/customers">Customers</Link>
        <Link to="/customers/300000">Customers 3000000</Link> */}
        <Route exact path="/" component={this.renderHome}></Route>
        <Route exact path="/customers" component={this.renderCustomerListContainer}></Route>
        <Switch>
         <Route path="/customers/new" component={this.renderCustomerNewContainer}></Route>
         <Route path="/customers/:dni" render={props=><CustomerContainer dni={props.match.params.dni}/>}></Route>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
