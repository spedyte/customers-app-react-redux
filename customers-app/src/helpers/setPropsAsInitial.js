//este es un high order component
//es una funcion que retorna un nuevo componente en vase al componente inicial
import React,{Component } from "react";

export const setPropsAsInitial = WrappedComponent =>(
    class extends Component{
        render(){
            return <WrappedComponent {...this.props} initialValues={this.props}></WrappedComponent>
        }
    }
);