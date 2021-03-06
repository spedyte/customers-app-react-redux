import React from 'react';
import PropTypes from 'prop-types';
import CustomersActions from './CustomersActions';
import {CUSTOMER_VIEW} from './../constants/permissions';
import {accessControl} from './../helpers/accessControl';

const CustomerData = ({name,dni,age,onBack,isDeleteAllow,onDelete,id}) => {
    return (
        <div>
            <div className="customer-data">
                <h2>Datos del cliente</h2>
                <div> <strong>Nombre : </strong><i>{name}</i></div>
                <div> <strong>DNI : </strong><i>{dni}</i></div>
                <div> <strong>Edad : </strong><i>{age}</i></div>

            </div>
            <CustomersActions>
                <button onClick={onBack}>Volver</button>
                {
                    isDeleteAllow && <button onClick={()=>onDelete(id)}>Eliminar</button>
                }
            </CustomersActions>
        </div>
    );
};

CustomerData.propTypes = {
    name:PropTypes.string.isRequired,
    dni:PropTypes.string.isRequired,
    age:PropTypes.number,
    onBack:PropTypes.func.isRequired,
    onDelete:PropTypes.func,
    isDeleteAllow:PropTypes.bool,
    id:PropTypes.string.isRequired,
};

export default accessControl([CUSTOMER_VIEW])(CustomerData);