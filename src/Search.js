import React, { useState, useEffect } from 'react'
import { FaSpinner, FaSearch } from 'react-icons/fa'
import Drawer from '@mui/material/Drawer';

require("dotenv").config();

      function Search() {

        // console.log(process.env);

        const URL = process.env.REACT_APP_URL;

        const IMAGE_PATH = process.env.REACT_APP_IMAGE_PATH;
        const PRODUCT_PATH = process.env.REACT_APP_PRODUCT_PATH;

        const [error, setError] = useState(null);
        const [active, setIsActive] = useState(false);
        const [icon, setIcon] = useState(false);
        const [searchIcon, setSearchIcon] = useState(true);
        const [isLoaded, setIsLoaded] = useState(false);
        const [products, setProducts] = useState([]);

        const [hasFocus, setFocus] = useState(false);

        const [open, setOpen] = useState(false);

        const [q, setQ] = useState("");

        const [searchParam] = useState(["name"]);


        useEffect(() => {
            fetch(`${URL}/api/read.php`)
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setProducts(result.records);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                );

        }, [icon]);
        

      function search(items) {

          return items.filter((item) => {
              return searchParam.some((newItem) => {

                  return (
                      item[newItem]
                          .toString()
                          .toLowerCase()
                          .indexOf(q.toLowerCase()) > -1
                  );

              });
          });
      }

      function handleChange(e) {
        setQ(e.target.value);
        setIsActive(true);
        setIcon(true);
        setSearchIcon(false);

        if (e.target.value.length < 1) {
          setIsActive(false);
          setIcon(false);
          setSearchIcon(true);
        }

        const hideIcon = setTimeout(() => {
          setIcon(false);
          setSearchIcon(true);
        }, 1500)
      }

      if (error) {
          return <>{error.message}</>;
      } else if (!isLoaded) {
          return <>loading...</>;
      } else {
        // console.log(products)
          return (
            <form>
              <Drawer open={open} anchor={"top"} onClose={() => {setOpen(false); setQ(''); setIsActive(false); } }>
                <div className="input-container popup">
                  <h3>Search for a product</h3>
                  <div className="relative">
                    <input
                        type="text"
                        placeholder="Enter keyword to search..."
                        value={q}
                        onChange={handleChange}
                      />
                    { searchIcon ? <FaSearch className="search-icon" /> : '' }
                    { icon ? <FaSpinner icon="spinner" className="spinner" /> : '' }
                  </div>
                </div>
                <div id="container">
                  <ul id="results" className={active ? 'show' : 'hide'} >
                    {search(products).length > 0 ? search(products).map((item, index) => (
                      <div key={index} className="product" id={item.id}>
                        <li>
                            <div className="img-container">
                              <div className="image">
                                  <img src={IMAGE_PATH + item.image} className="img-fluid" alt={item.name}/>
                              </div>
                            </div>
                            <div className="item-meta">
                              <a href={PRODUCT_PATH + item.id} className='product-link title'>
                                <h2>{item.name}</h2>
                              </a>
                              <div className='mb-1 price'>
                                  ${item.price}
                              </div>
                          </div>
                        </li>
                      </div>
                    )) : <div className="no-results"><h3>Your search for: <b>{q}</b> did not match any products.</h3></div>}
                  </ul>
                </div>
              </Drawer>
                <div className="input-container">
                    <input
                    style={{
                          position: hasFocus ? "absolute" : "relative"
                        }}
                        type="text"
                        placeholder="Enter keyword to search..."
                        onClick={() => setOpen(true)}
                        onChange={handleChange}
                    />
                    <FaSearch className="search-icon" />
                </div>
            </form>
          );
      }

  }

export default Search