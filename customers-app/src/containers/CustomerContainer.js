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
import {deleteCustomer} from './../actions/deleteCustomer';
import { SubmissionError } from 'redux-form';

class CustomerContainer extends Component {
    //<p>Datos del Cliente {this.props.customer.name}</p>
    componentDidMount() {
        if(!this.props.customer){
            this.props.fetchCustomers();
        }
    }
    
    handleSubmit = (values) =>{
        const {id}=values;
        return this.props.updateCustomer(id,values);//El siguiente codigo maneja el error recibido desde el SERVER
        // .then(r=>{
        //     if(r.error){//aqui es forzoso .error porque es sintaxis del Promiserejected
        //         throw new SubmissionError(r.payload);
        //     }
        // })
    }

    handleOnSubmitSuccess =()=>{
        console.log("regresando de INSERT");
        this.props.history.goBack();
    }

    handleOnBack =()=>{
        this.props.history.goBack();
    }

    handleOnDelete=(id)=>{
        this.props.deleteCustomer(id).then(v=>{
            this.props.history.goBack();
        });
    }

    renderCustomerControl= (isEdit,isDelete) => {
        if(this.props.customer)
        {
            const CustomerControl = isEdit ? CustomerEdit : CustomerData; //Definicion dinamica de los componentes
            return <CustomerControl {...this.props.customer} 
                    onSubmit={this.handleSubmit}
                    onSubmitSuccess={this.handleOnSubmitSuccess}
                    onBack={this.handleOnBack} 
                    isDeleteAllow={!!isDelete}
                    onDelete={this.handleOnDelete}
                    />
        }
        return null;
    }
    renderBody =() =>(
        <Route path="/customers/:dni/edit" children={
            ({match:isEdit})=>
                (
                    <Route path="/customers/:dni/del" children={  
                        ({match:isDelete}) => (this.renderCustomerControl(isEdit,isDelete))
                    }/>)
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
    deleteCustomers:PropTypes.func,
};

const mapStateToProps = (state,props) =>({
    customer:  getCustomerByDni(state,props),
});

const mapDispatchToProps={
    fetchCustomers,
    updateCustomer,
    deleteCustomer,
}
export default withRouter(connect (mapStateToProps,mapDispatchToProps)(CustomerContainer));