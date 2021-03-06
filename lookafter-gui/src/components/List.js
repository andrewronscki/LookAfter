import React, { Component } from 'react'
import ModalEditProduct from './ModalEditProduct'
import FontAwesome from 'react-fontawesome'
import axios from 'axios'
import Swal from 'sweetalert2'


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
  callDelete = (index) => {
    Swal.fire({
      title: 'Atenção!',
      text: "Você tem certeza que quer deletar este produto?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Sim, deletar produto'
    }).then((result) => {
      if (result.value) {
        this.deleteItem(index)
      }
    })
  }
  deleteItem = async (item, index) => {
    const deleteProduct = {
      disabled: true,
      _id: this.state.brochure[item]._id
    }

    await axios.put('http://localhost:3000/delete', deleteProduct)
      .then(res => {
        Swal.fire('Isso aí!', 'Produto deletado com sucesso.', 'success')
        this.loadProducts()
      })
      .catch(err => Swal.fire('Erro!', 'Não foi possível deletar produto.', 'error' ))
  }

  buyItem = async (item, index) => {
    const buyProduct = {
      amount: this.state.brochure[item].amount,
      bought: this.state.brochure[item].bought,
      _id: this.state.brochure[item]._id
    }
    await axios.put('http://localhost:3000/buy', buyProduct)
      .then(res => {
        Swal.fire('Isso aí!', 'Produto comprado com sucesso.', 'success')
        this.loadProducts()          
        })
      .catch(err => Swal.fire('Erro!', 'Não foi possível comprar produto.', 'error' ))
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
          <td>{item.resetStock >= 1 ? `${item.resetStock} minutos`  : 'Sem parâmetros para cálculo'}</td>
          <td>
            <button className='btn btn-warning' data-toggle='modal' data-target='#editModal'
              onClick={() => this.replaceModalItem(index)}><FontAwesome name='edit' /></button> {' '}
            <button className='btn btn-danger' onClick={() => this.callDelete(index)}><FontAwesome name='trash' /></button>
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
                <th>Estoque zera em</th>
                <th>Editar/Deletar</th>
              </tr>
            </thead>
          <tbody>
            {brochure}
          </tbody>
        </table>
        <div>
          <button className='btn btn-primary float-right' onClick={() => this.loadProducts()}><FontAwesome name='retweet'/> Atualizar Lista</button>
        </div>
        {modalData && 
          <ModalEditProduct
            model={modalData.model}
            description={modalData.description}
            size={modalData.size}
            amount={modalData.amount}
            _id={modalData._id}
            resetStock={modalData.resetStock}
            saveModalDetails={this.saveModalDetails}
          />
        }
      </div>
    )
  }
}

export default List