import React, { Component } from 'react';
import {Link,BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import HomeContainer from './containers/HomeContainer';

class  App extends Component{
  renderHome=() => <h1>Home</h1>

  renderCustomerContainer = () =><h1>Customer Container</h1>

  renderCustomerListContainer = () => <h1>Customer List container</h1>

  renderCustomerNewContainer = () =><h1>Customer New Container</h1>
  
  render(){
    return (
      <Router>
      <div className="App">
        {/* <Link to="/customers">Customers</Link>
        <Link to="/customers/300000">Customers 3000000</Link> */}
        <Route exact path="/" component={HomeContainer}></Route>
        <Route exact path="/customers" component={this.renderCustomerContainer}></Route>
        <Switch>
         <Route path="/customers/new" component={this.renderCustomerNewContainer}></Route>
         <Route path="/customers/:dni" component={this.renderCustomerContainer}></Route>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
