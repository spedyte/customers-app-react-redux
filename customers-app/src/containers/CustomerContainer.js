import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route,withRouter} from 'react-router-dom';

import AppFrame from '../components/AppFrame';
import {getCustomerByDni} from './../selectors/customers';
import CustomerData from './../components/CustomerData';
import CustomerEdit from './../components/CustomerEdit';
import {fetchCustomers} from './../actions/fetchCustomers';
import {updateCustomer} from './../actions/updateCustomer';

class CustomerContainer extends Component {
    //<p>Datos del Cliente {this.props.customer.name}</p>
    componentDidMount() {
        if(!this.props.customer){
            this.props.fetchCustomers();
        }
    }
    
    handleSubmit = (values) =>{
        const {id}=values;
        return this.props.updateCustomer(id,values);
    }

    handleOnBack =()=>{
        this.props.history.goBack();
    }

    renderBody =() =>(
        <Route path="/customers/:dni/edit" children={
            ({match})=>{
                const CustomerControl = match ? CustomerEdit : CustomerData; //Definicion dinamica de los componentes
                return <CustomerControl {...this.props.customer} onSubmit={this.handleSubmit}
                onBack={this.handleOnBack} />
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
    customer: PropTypes.object,
    updateCustomer:PropTypes.func.isRequired,
    fetchCustomers:PropTypes.func.isRequired,
};

const mapStateToProps = (state,props) =>({
    customer:  getCustomerByDni(state,props),
});

const mapDispatchToProps={
    fetchCustomers,
    updateCustomer
}
export default withRouter(connect (mapStateToProps,mapDispatchToProps)(CustomerContainer));