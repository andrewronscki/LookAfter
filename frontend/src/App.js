import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'
import Sobre from './Sobre'
import Produtos from './Produtos'
import logo from './assets/img/logo.png'
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
          <div className='container'>
            <div className='navbar-header'>
              <a href= '/' className='navbar-left'>
                <img src={logo} className='img-responsive' />
              </a>
            </div>
            <ul className='nav navbar-nav'>
              <li className='nav-item'><Link to='/' class="nav-link">Home</Link></li>
              <li className='nav-item'><Link to='/produtos' class="nav-link">Produtos</Link></li>
              <li className='nav-item'><Link to='/sobre' className="nav-link">Sobre</Link></li>
            </ul>
          </div>        
        </nav>
        <div className='container'>
          <Route exact path='/' component= {Home} />
          <Route exact path='/sobre' component= {Sobre} />
          <Route path='/produtos' component= {Produtos} />
        </div>
      </div>
      </Router>
    )
  }
}

export default App
