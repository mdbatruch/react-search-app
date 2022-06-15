import React, { Component } from 'react'

const IMAGE_PATH = '';
const PRODUCT_PATH = '';

class Suggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            isActive: this.props.isActive,
            results: this.props.results.data,
            products: this.props.products
        }
    }

    render() {
        console.log(this.props.products + 'test');
        return (
            <div id="container" className={this.props.isActive ? 'show' : 'hide'} >
                {this.props.products ? (
                    <ul id="results" className={this.props.isActive ? 'show' : 'hide'}>
                        <li><a href={PRODUCT_PATH + this.props.products.id}>{this.props.products.name}</a></li>
                        <li>{this.props.products.description}</li>
                        <li>{this.props.products.price}</li>
                        <li><img src={IMAGE_PATH + this.props.products.image} alt={this.props.products.name} /></li>
                    </ul>
                 ) : (
                    <div className={this.props.isActive ? 'show' : 'hide'}>
                        No Results!
                    </div>
                 ) }
            </div>
        )
      }
     
}

export default Suggestions