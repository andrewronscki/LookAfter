import React, { Component } from 'react'
import ModalAddProduct from './ModalAddProduct.js'
import FontAwesome from 'react-fontawesome'


class AddProduct extends Component {
    constructor(props) {
        super(props)
    
        this.replaceModalItem = this.replaceModalItem.bind(this)
        this.saveModalDetails = this.saveModalDetails.bind(this)
        this.state = {
            requiredItem: 0,
            brochure: [
              {
                  model: '',
                  description: '',
                  size: '',
                  price: '',
              }
            ]
        }
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

    render() {

        const brochure = this.state.brochure.map((item, index) => {
            return (
                <div>
                    <button className="btn btn-primary" data-toggle="modal" data-target="#addModal"
                    onClick={() => this.replaceModalItem(index)}><FontAwesome name='plus' /> Adicionar produto</button> {" "}
                </div>
            )
          })
        const requiredItem = this.state.requiredItem
        let modalData = this.state.brochure[requiredItem]
        return (
            <div>
                {brochure}
                <ModalAddProduct
                    model={modalData.model}
                    description={modalData.description}
                    size={modalData.size}
                    price={modalData.price}
                    saveModalDetails={this.saveModalDetails}
                />
            </div>
        )

    }
}

export default AddProduct