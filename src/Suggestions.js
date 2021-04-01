import React, { Component } from 'react'
import axios from 'axios'
import { render } from '@testing-library/react';

const IMAGE_PATH = '';
const PRODUCT_PATH = '';

class Suggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            isActive: this.props.isActive,
            results: this.props.results.data
        }
    }

    render() {
        // if (this.state.results) {
        //     const results = this.state.results.data;
        //     // console.log(results);
        // }
        let bad = this.state.results;
        console.log(this.props.results + 'test');
        return (
            <div id="container" className={this.props.isActive ? 'show' : 'hide'} >
                {this.props.results ? (
                    <ul id="results" className={this.props.isActive ? 'show' : 'hide'}>
                        <li><a href={PRODUCT_PATH + this.props.results.id}>{this.props.results.name}</a></li>
                        <li>{this.props.results.description}</li>
                        <li>{this.props.results.price}</li>
                        <li><img src={IMAGE_PATH + this.props.results.image} /></li>
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

// const Suggestions = (props) => {
// //   const options = props.results.map(r => (
// //     <li key={r.id}>
// //       {r.name}
// //       {/* {r.description} */}
// //     </li>
// //   ))
//     // render() {
//     //     return (
            
//     //     )
//     // }
//   return <div id="container" className={props.isActive ? 'show' : 'hide'} >
        
//             <ul className="results">
//                 <li><a href={PRODUCT_PATH + props.results.id}>{props.results.name}</a></li>
//                 <li>{props.results.description}</li>
//                 <li>{props.results.price}</li>
//                 <li><img src={IMAGE_PATH + props.results.image} /></li>
//             </ul>
//          </div>
// }

export default Suggestions