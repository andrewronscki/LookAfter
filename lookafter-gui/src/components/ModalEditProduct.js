import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

class ModalEditProduct extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            model: '',
            description: '',
            size: '',
            amount: '',
            _id: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            model: nextProps.model,
            description: nextProps.description,
            size: nextProps.size,
            amount: nextProps.amount,
            _id: nextProps._id
        })
    }

    handlerInput(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSave = async () => {
        const updateProduct = {
            model: this.state.model,
            description: this.state.description,
            size: this.state.size,
            amount: this.state.amount,
            _id: this.state._id 
        }
        await axios.put('http://localhost:3000/update', updateProduct)
        .then(res => {
            Swal.fire('Isso aí','Produto atualizado com sucesso!','success')
            const item = this.state
            this.props.saveModalDetails(item)
        })
        .catch(err => Swal.fire('Erro!', 'Não foi possível atualizar produto.', 'error' ))          
    }   
    

    render() {
        return (
            <div className='modal fade' id='editModal' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='exampleModalLabel'>Editar produto</h5>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <p><span className='modal-lable'>Modelo: </span><input name='model' value={this.state.model} onChange={(e) => this.handlerInput(e)} /></p>
                            <p><span className='modal-lable'>Descrição: </span><input name='description' value={this.state.description} onChange={(e) => this.handlerInput(e)} /></p>
                            <p><span className='modal-lable'>Tamanho: </span><input name='size' value={this.state.size} onChange={(e) => this.handlerInput(e)} /></p>
                            <p><span className='modal-lable'>Quantidade: </span><input name='amount' type='number' value={this.state.amount} onChange={(e) => this.handlerInput(e)} /></p>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal'>Fechar</button>
                            <button type='button' className='btn btn-primary' data-dismiss='modal' onClick={() => { this.handleSave() }}>Salvar alterações</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalEditProduct