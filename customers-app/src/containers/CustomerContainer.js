import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

import AppFrame from '../components/AppFrame';
import {getCustomerByDni} from './../selectors/customers';
import CustomerData from './../components/CustomerData';
import CustomerEdit from './../components/CustomerEdit';

class CustomerContainer extends Component {
    //<p>Datos del Cliente {this.props.customer.name}</p>

    renderBody =() =>(
        <Route path="/customers/:dni/edit" children={
            ({match})=>{
                const CustomerControl = match ? CustomerEdit : CustomerData; //Definicion dinamica de los componentes
                return <CustomerControl {...this.props.customer} />
            }
        }>
        </Route>
    )
    render() {
        return (
            <div>
                <AppFrame 
                    header={`Cliente : ${this.props.dni} `} 
                    body={this.renderBody()}>
                </AppFrame>
            </div>
        );
    }
}

CustomerContainer.propTypes = {
    dni:PropTypes.string.isRequired,
    customer: PropTypes.object.isRequired,
};

const mapStateToProps = (state,props) =>({
    customer:  getCustomerByDni(state,props),
});

export default connect (mapStateToProps,null)(CustomerContainer);