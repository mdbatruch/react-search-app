import React, { useState, useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'

      function Search() {

        const URL = 'https://castlegames.mike-batruch.ca';

        const IMAGE_PATH = 'https://castlegames.mike-batruch.ca/images/';
        const PRODUCT_PATH = 'https://castlegames.mike-batruch.ca/product?id=';

        const [error, setError] = useState(null);
        const [active, setIsActive] = useState(false);
        const [icon, setIcon] = useState(false);
        const [isLoaded, setIsLoaded] = useState(false);
        const [products, setProducts] = useState([]);

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
        }, []);

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

        if (e.target.value.length < 1) {
          setIsActive(false);
          setIcon(false);
        }
      }

      if (error) {
          return <>{error.message}</>;
      } else if (!isLoaded) {
          return <>loading...</>;
      } else {
        console.log(products)
          return (
            <form>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Search for..."
                        value={q}
                        onChange={handleChange}
                    />
                    <FaSpinner icon="spinner" className={icon ? 'show spinner' : 'hide spinner'} />
                    <div id="container">
                      <ul id="results" className={active ? 'show' : 'hide'} >
                        {search(products).length > 0 ? search(products).map((item) => (
                            <li>
                              <span>{item.name}</span>
                              <div class="img-container">
                                <div class="image">
                                    <img src={IMAGE_PATH + item.image} class="img-fluid" alt={item.name}/>
                                </div>
                            </div>
                              <div class="item-meta">
                                <a href={PRODUCT_PATH + item.id} class='product-link title'>
                                    <div class='name mb-1'>
                                      {item.name}
                                    </div>
                                </a>
                                <div class='mb-1 price'>
                                    {item.price}
                                </div>
                            </div>
                            </li>
                        )) : <div>No Results!</div>}
                      </ul>
                    </div>
                </div>
            </form>
          );
      }

  }

export default Search