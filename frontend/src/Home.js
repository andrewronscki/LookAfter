import React, { Component } from 'react'
import logo from './assets/img/logo_.png'

class Home extends Component {
    render(){
        return (
            <div className='container'>
                <h1>Bem vindo ao Gerenciador de Produtos LookAfter!</h1>
                <img src={logo} className='img-responsive'></img>
            </div>
        )
    }
}

export default Home