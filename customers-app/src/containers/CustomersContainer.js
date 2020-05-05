import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import CustomerList from './../components/CustomerList';
import CustomersActions from './../components/CustomersActions';
import AppFrame from './../components/AppFrame';
import {fetchCustomers} from './../actions/fetchCustomers';

const customers=[
    {
        "dni":"2700",
        "name":"Juan Perez",
        "age":37
    },
    {
        "dni":"2701",
        "name":"Luis Gomez",
        "age":38
    },
    {
        "dni":"2702",
        "name":"Alma Perez",
        "age":39
    }
];
class CustomersContainer extends Component {

    handleAddNew=()=>{
        this.props.history.push("/customers/new");
    }

    renderBody =customers =>(
        <div>
            <CustomerList 
                customers={customers} 
                urlPath={'/customers/'}>
            </CustomerList>
            <CustomersActions>
                <button onClick={this.handleAddNew}>Agregar Cliente</button>
            </CustomersActions>
        </div>
    );

    render() {
        return (
            <div>
                <AppFrame header={'Listado de clientes'}
                body={this.renderBody(customers)}>

                </AppFrame>
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchCustomers();
    }
}



CustomersContainer.propTypes = {
    fetchCustomers:PropTypes.func.isRequired,
};

const mapDispatchToProps= {fetchCustomers};

export default withRouter(connect(null,mapDispatchToProps)(CustomersContainer));