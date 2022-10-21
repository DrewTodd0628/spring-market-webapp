import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import ApiHandler from './ApiHandler';
import CartItem from './CartItem'
import CartItemList from './CartItemList';

const ShoppingCart = () => {

  const [search] = useOutletContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const USER_API = "http://6.tcp.ngrok.io:11718/user";
  const navigate = useNavigate();

  useEffect(() => {

    const fetchItems = async () => {
      try {
        const response = await fetch(USER_API);
        if (!response.ok) throw Error("Could not connect to shop. Try refreshing page.");
        const items = await response.json();
        setItemList(items);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    const list = itemList.filter(item => item.id !== id);
    setItemList(list);

    const requestPara = { method: 'DELETE' };
    const response = await ApiHandler(`${USER_API}/${id}`, requestPara);
    if (response) setFetchError(response);
  }



  return (
    <>
      <section className="itemList">
        <ul>
          {isLoading && <div className="shopMsg">Loading...</div>}
          {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
          {!isLoading + !fetchError ? (
            <CartItemList
              items={itemList.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase())
              )}
              deleteItem={deleteItem}
              search={search}
              isLoading={isLoading}
            />
          ) : (
            <div className="shopMsg">Error retrieving cart items.</div>
          )}
        </ul>
      </section>



      <section className='sidePanel checkout'>
        <div>
          <label>
            <h3>Checkout</h3>
          </label>
          <ul>
            <li><span>Total:</span> <span>${totalPrice}</span></li>
            <li><span>Tax:</span> <span>$0</span></li>
            <li><span>Shipping:</span> <span>$0</span></li>
            <li style={{fontWeight: "bold", marginTop: "5px"}}><span>Total:</span> <span>$0</span></li>
          </ul>
          <button onClick={() => navigate("/checkout")}>Check Out</button>
        </div>
      </section>
    </>
  )
}

export default ShoppingCart