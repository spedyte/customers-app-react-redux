import React, { Component } from 'react';
import {Link,BrowserRouter as Router,Route,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';

import AppFrame from './../components/AppFrame';
import AppHeader from './../components/AppHeader';
import CustomersActions from './../components/CustomersActions';


class HomeContainer extends Component {
    handleOnClick=()=>{
        console.log("handle OnClick");
        this.props.history.push('/customers');
    }

    render() {
        return (
            <div>
                <AppFrame header="Home" body={
                    <div>
                        Esta es la pantalla inicial
                        <CustomersActions>
                            <button onClick={this.handleOnClick}>Listado Clientes</button>
                        </CustomersActions>
                    </div>
                }>

                </AppFrame>
            </div>
        );
    }
}

HomeContainer.propTypes = {

};

//withRouter decora el componente para inyectarle las props de Router, por ejempo el props.history
export default withRouter(HomeContainer);