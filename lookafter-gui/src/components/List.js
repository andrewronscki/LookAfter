import React, { Component } from 'react'
import ModalEditProduct from './ModalEditProduct'
import FontAwesome from 'react-fontawesome'
import axios from 'axios'
import swal from 'sweetalert'


class List extends Component {
  
  constructor(props) {
    super(props)
    this.replaceModalItem = this.replaceModalItem.bind(this)
    this.saveModalDetails = this.saveModalDetails.bind(this)
    this.state = {
      requiredItem: 0,
      brochure: []
    }
  }

  componentDidMount = () => {
    this.loadProducts()
  }

  loadProducts = () => {
    axios.get('http://localhost:3000/get')
      .then(({data}) => this.setState({
        brochure: data
      }))      
  }

  replaceModalItem(index) {
    this.setState({
      requiredItem: index
    })
  }

  saveModalDetails(item) {
    const requiredItem = this.state.requiredItem
    let tempbrochure = this.state.brochure
    tempbrochure[requiredItem] = item
    this.setState({ brochure: tempbrochure })
  }
  
  deleteItem = async (item, index) => {
    const deleteProduct = {
      disabled: true,
      _id: this.state.brochure[item]._id
    }

    await axios.put('http://localhost:3000/delete', deleteProduct)
      .then(res => swal('Isso aí!', 'Produto deletado com sucesso.', 'success'))
      .catch(swal('Erro!', 'Não foi possível deletar produto.', 'error' ))
    let tempBrochure = this.state.brochure
    tempBrochure.splice(index, 1)
    this.setState({ brochure: tempBrochure })
  }

  buyItem = async (item, index) => {
    const buyProduct = {
      amount: this.state.brochure[item].amount,
      bought: this.state.brochure[item].bought,
      _id: this.state.brochure[item]._id
    }
    await axios.put('http://localhost:3000/buy', buyProduct)
      .then(res => swal('Isso aí!', 'Produto comprado com sucesso.', 'success'))
      .catch(swal('Erro!', 'Não foi possível comprar produto.', 'error' ))
  }

  render() {    
    const brochure = this.state.brochure.map((item, index) => {
      return (
        <tr key={index}>
          <td><button className='btn btn-success' onClick={() => this.buyItem(index)}><FontAwesome name='money' /> Comprar</button></td>
          <td>{item.model}</td>
          <td>{item.description}</td>
          <td>{item.size}</td>
          <td>{item.amount}</td>
          <td>
            <button className='btn btn-primary' onClick={() => this.loadProducts()}><FontAwesome name='retweet' /></button> {' '}
            <button className='btn btn-warning' data-toggle='modal' data-target='#editModal'
              onClick={() => this.replaceModalItem(index)}><FontAwesome name='edit' /></button> {' '}
            <button className='btn btn-danger' onClick={() => this.deleteItem(index)}><FontAwesome name='trash' /></button>
          </td>
        </tr>
      )
    })

    const requiredItem = this.state.requiredItem
    let modalData = this.state.brochure[requiredItem]
    return (
      <div>
        <table className='table table-striped'>
            <thead>
              <tr>
                <th>Comprar</th>
                <th>Modelo</th>
                <th>Descrição</th>
                <th>Tamanho</th>
                <th>Quantidade</th>
                <th>Editar/Deletar</th>
              </tr>
            </thead>
          <tbody>
            {brochure}
          </tbody>
        </table>
        {modalData && 
          <ModalEditProduct
            model={modalData.model}
            description={modalData.description}
            size={modalData.size}
            amount={modalData.amount}
            _id={modalData._id}
            saveModalDetails={this.saveModalDetails}
          />
        }
      </div>
    )
  }
}

export default List