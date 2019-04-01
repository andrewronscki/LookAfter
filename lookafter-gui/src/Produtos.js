import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import List from './components/List'
import AddProduct from './components/AddProduct'
import axios from 'axios'

class Produtos extends Component {
    
    render(){
        const { match } = this.props
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div style={{ textAlign: "center" }}>
                            <h1>Controle de Fraldas</h1>
                        </div>
                        <AddProduct />
                        <List />
                    </div>
                </div>
            </div>
        )
    }
}

export default Produtos