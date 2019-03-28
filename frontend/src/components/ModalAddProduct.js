import React, { Component } from 'react'

class ModalAddProduct extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            model: '',
            description: '',
            size: '',
            amount: '',
            bought: ''
        }
    }

    modelHandler(e) {
        this.setState({ model: e.target.value })
    }
    
    sizeHandler(e) {
        this.setState({ size: e.target.value })
    }

    amountHandler(e) {
        this.setState({ price: e.target.value })
    }

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item)
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
                            <p><span className="modal-lable">Modelo: </span><input value={this.state.model} onChange={(e) => this.modelHandler(e)} /></p>
                            <p><span className="modal-lable">Tamanho: </span><input value={this.state.size} onChange={(e) => this.sizeHandler(e)} /></p>
                            <p><span className="modal-lable">Quantidade: </span><input  type='number' value={this.state.price} onChange={(e) => this.amountHandler(e)} /></p>
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