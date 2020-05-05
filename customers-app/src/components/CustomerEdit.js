import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm,Field} from 'redux-form'; 
import {connect} from 'react-redux';
import { setPropsAsInitial } from '../helpers/setPropsAsInitial';
//validaciones a nivel local
const MyField = ({type,input,meta,label,name})=>(
    <div>
        <label htmlFor={name}>{label} :</label>
        <input {...input} type={!type ? "text":type}></input>
        {
            meta.touched && meta.error && <span>{meta.error}</span>
        }
    </div>
);

const isNumber = value =>(
    isNaN(Number(value)) && "El campo debe ser un numero"
);

const isRequired = value => (
    !value && "Este campo es requerido"
);

const CustomerEdit = ({name,dni,age}) => {
    return (
        <div>
            <h2>Edicion del cliente</h2>
            <form action="">
                    <Field name="name" component={MyField} type="text"
                            validate={isRequired} label="Nombre"></Field>

                    <Field name="dni" component={MyField} type="text"
                            validate={[isRequired,isNumber]} label="Dni"></Field>

                    <Field name="age" component={MyField} type="number" 
                    validate={isNumber} label="Edad"></Field>
            </form>
        </div>
    );
};

CustomerEdit.propTypes = {
    name:PropTypes.string,
    dni:PropTypes.string,
    age:PropTypes.number,
};

const mapStateToProps=(state,props)=>({
    initialValues:props
})

const CustomerEditForm= reduxForm({form:'CustomerEdit'})(CustomerEdit);
export default setPropsAsInitial(CustomerEditForm);