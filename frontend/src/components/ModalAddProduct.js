import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

class ModalAddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            model: '',
            description: '',
            size: '',
            amount: ''
        }
    }

    handlerInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSave = async () => {
        const newProduct = {
            model: this.state.model, 
            description: this.state.description, 
            size: this.state.size, 
            amount: parseInt(this.state.amount), 
            bought: 0, 
            disabled: false
        }       
              
        await axios.post('http://localhost:3000/add', newProduct)
            .then( res => swal('Isso aí!', 'Produto adicionado com sucesso.', 'success'))
            .catch(swal('Erro!', 'Não foi possível adicionar produto.', 'error' ))
    }    

    render() {
        return (
            <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Adicionar produto</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><span className="modal-lable">Modelo: </span><input name='model' value={this.state.model} onChange={(e) => this.handlerInput(e)} /></p>
                            <p><span className="modal-lable">Descrição: </span><input name='description' value={this.state.description} onChange={(e) => this.handlerInput(e)} /></p>
                            <p><span className="modal-lable">Tamanho: </span><input name='size' value={this.state.size} onChange={(e) => this.handlerInput(e)} /></p>
                            <p><span className="modal-lable">Quantidade: </span><input  name='amount' type='number' value={this.state.price} onChange={(e) => this.handlerInput(e)} /></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => { this.handleSave() }}>Salvar Produto</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalAddProduct