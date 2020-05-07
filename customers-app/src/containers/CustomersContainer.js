import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import CustomerList from './../components/CustomerList';
import CustomersActions from './../components/CustomersActions';
import AppFrame from './../components/AppFrame';
import {fetchCustomers} from './../actions/fetchCustomers';
import {getCustomers} from './../selectors/customers';

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
                body={this.renderBody(this.props.customers)}>

                </AppFrame>
            </div>
        );
    }

    componentDidMount() {
        if(this.props.customers.length===0){
            this.props.fetchCustomers();
        }
        
    }
}



CustomersContainer.propTypes = {
    fetchCustomers:PropTypes.func.isRequired,
    customers:PropTypes.array.isRequired,
};

CustomersContainer.defaultProps={
    customers:[]
}

const mapDispatchToProps= {fetchCustomers};

const mapStateToProps = state =>({
    customers:getCustomers(state),
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CustomersContainer));