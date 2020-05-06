import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm,Field, isSubmitting, submitSucceeded,pristine} from 'redux-form'; 
import {connect} from 'react-redux';
import { setPropsAsInitial } from '../helpers/setPropsAsInitial';
import CustomersActions from './../components/CustomersActions';
import { Prompt } from 'react-router-dom';

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

//Estas validaciones a nivel de Field tiene prioridad sobre las validaciones a nivel global
const isNumber = value =>(
    isNaN(Number(value)) && "El campo debe ser un numero"
);

const validate = values =>{
    const error ={};

    //si el campo nombre es requerido
    if(!values.name) {
        error.name="El campo nombre es requerido";
    }
    if(!values.dni){
        error.dni ="El Dni es un campo obligatorio";
    }

    return error;
};
// const isRequired = value => (
//     !value && "Este campo es requerido"
// );

const toNumber =value=> value && Number(value);
const toUpper =value=> value && value.toUpperCase();
const toCamelCaseM = value => value && value.toLowerCase();
const onlyGrow = (value,previousValue,values) => 
    value && previousValue && (value>previousValue? value:previousValue);

const CustomerEdit = ({name,dni,age,handleSubmit,submitting,onBack,pristine,submitSucceeded}) => {
    return (
        <div>
            <h2>Edicion del cliente</h2>
            <form onSubmit={handleSubmit}>
                    <Field name="name" component={MyField} type="text"
                             label="Nombre" parse={toUpper} format={toCamelCaseM}></Field>

                    <Field name="dni" component={MyField} type="text"
                            validate={[isNumber]} label="Dni"></Field>

                    <Field name="age" component={MyField} type="number" 
                    validate={isNumber} label="Edad" parse={toNumber} normalize={onlyGrow}></Field>
                    
                    <CustomersActions>
                        <button type="submit" disabled={pristine || submitting}>Aceptar</button>
                        <button type="button"  disabled={submitting} onClick={onBack}>Cancelar</button>
                    </CustomersActions>
                    {/* pristine es una propiedad de react routing para saber si se cambio el formulario */}
                    <Prompt when={!pristine && !submitSucceeded}
                    message="Se perderán los datos si continua"></Prompt>
            </form>
        </div>
    );
};

CustomerEdit.propTypes = {
    name:PropTypes.string,
    dni:PropTypes.string,
    age:PropTypes.number,
    onBack:PropTypes.func.isRequired,
};

const mapStateToProps=(state,props)=>({
    initialValues:props
})

const CustomerEditForm= reduxForm(
    {
        form:'CustomerEdit',
        validate //validacion a nivel global
    })(CustomerEdit);

export default setPropsAsInitial(CustomerEditForm);