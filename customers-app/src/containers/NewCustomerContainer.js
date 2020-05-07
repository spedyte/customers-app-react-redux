import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppFrame from '../components/AppFrame';
import CustomerEdit from '../components/CustomerEdit';
import {insertCustomer} from './../actions/insertCustomer';


class NewCustomerContainer extends Component {
    handleSubmit =(values)=>{
        return this.props.insertCustomer(values);//El siguiente codigo maneja el error recibido desde el SERVER
        // .then(r=>{
        //     if(r.error){//aqui es forzoso .error porque es sintaxis del Promiserejected
        //         throw new SubmissionError(r.payload);
        //     }
        // })
    }

    handleOnSubmitSuccess=()=>{
        this.props.history.goBack();
    }

    handleOnBack=()=>{
        this.props.history.goBack();
    }

    renderBody = () =>{
        const newCustomer={
            "id":"",
            "dni":"",
            "name":"",
            "age":0
        };

        return <CustomerEdit {...newCustomer} onSubmit={this.handleSubmit}
        onSubmitSuccess={this.handleOnSubmitSuccess}
        onBack={this.handleOnBack}></CustomerEdit>
    }
    render() {
        return (
            <div>
                <AppFrame header={`Creacion del cliente`}
                body={this.renderBody()}>

                </AppFrame>
            </div>
        );
    }
}

NewCustomerContainer.propTypes = {
    insertCustomer: PropTypes.func.isRequired,
};

export default withRouter(connect(null,{insertCustomer})(NewCustomerContainer));