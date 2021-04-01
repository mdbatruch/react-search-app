import React, { Component } from 'react'
import axios from 'axios'
import Suggestions from './Suggestions'
import { FaSpinner } from 'react-icons/fa'

const API_URL = 'http://localhost:8888/oop_site/api/read.php';

class Search extends Component {
 state = {
   query: '',
   isActive: null,
   icon: false,
   results: []
}

 getInfo = () => {
    (async() => {
        let data = null;
        try {
          data = await axios.get(`http://localhost:8888/oop_site/api/read_one.php?name=${this.state.query}`);
        //   data = await axios.get(`http://localhost:8888/oop_site/api/read.php`);
        } catch (err) {
          console.error("Error response:");
          console.error(err.response.data);    // ***
          console.error(err.response.status);  // ***
          console.error(err.response.headers); // ***
          this.setState({results: []})
        } finally {
        //   console.log(apiRes);
        if (data) {
            this.setState({
                    results: data.data,
                    isLoading: false,
                    icon: false
                })
            } else {
                this.setState({
                    results: null,
                    icon: true,
                })
            }
        }
      })();
  }

 
  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query) {
        this.setState({
            isActive: 1,
            icon: true
        })
          this.getInfo()
      } else if (!this.state.query || this.state.query == "") {
        this.setState({
            isActive: null,
            icon: false
        })
      }
    })
  }


 render() {
    console.log(this.state.results);
   return (
     <form>
         <div className="input-container">
            <input
                type="text"
                placeholder="Search for..."
                ref={input => this.search = input}
                onChange={this.handleInputChange}
            />
            <FaSpinner icon="spinner" className={this.state.icon ? 'show spinner' : 'hide spinner'} />
         </div>
       <Suggestions results={this.state.results} isActive={this.state.isActive}/>
     </form>
   )
 }
}

export default Search