import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import ApiHandler from './ApiHandler';
import CartItem from './CartItem'
import CartItemList from './CartItemList';
import GiftMessage from './GiftMessage';
import FileBase64 from 'react-file-base64';
import { FaWindowClose } from 'react-icons/fa';
import { Amplify } from 'aws-amplify';

const ShoppingCart = () => {

  const [search] = useOutletContext();
  const [itemList, setItemList] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const CART_API = "http://192.168.173.117:8080/cart";
  const ORDER_API = "http://192.168.173.117:8080/order/message";
  const navigate = useNavigate();
  const [priceChange, setPriceChange] = useState(0);
  const [giftMessage, setGiftMessage] = useState("");

  
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [costSum, setCostSum] = useState(0); 
  const [authToken, setAuthToken] = useState("");


  useEffect(() => {
    const fetchItems = async () => {
      try {   
        const user = await Amplify.Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        setAuthToken(token);

        const requestPara  = {
          method: 'GET',
          headers: {"Authorization": `Bearer ${token}`}
        };
        const response = await fetch(`${CART_API}`, requestPara);
        if (!response.ok) throw Error("Could not connect to shop. Try refreshing page.");
        const items = await response.json();
        setItemList(items);

        const sumRequestPara  = {
          method: 'GET',
          headers: {"Authorization": `Bearer ${token}`}
        };
        const sumResponse = await fetch(`${CART_API}/total`, sumRequestPara);
        if (!sumResponse.ok) throw Error("Could not connect to shop. Try refreshing page.");
        const total = await sumResponse.json();
        setCostSum(total);

        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      }
       finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    if (costSum > 0.009) {
      const _tax = costSum * 0.1;
      const _shippingCost = 14.99;
      const _total = costSum + _tax + _shippingCost; 
      setTax(_tax);
      setShippingCost(_shippingCost);
      setFinalTotal(_total);
    } else {
      setTax(0);
      setShippingCost(0);
      setFinalTotal(0);
    }
  }, [costSum]);

  const deleteItem = async (id) => {
    const list = itemList.filter(item => item.id !== id);
    setItemList(list);

    const requestPara  = {
      method: 'DELETE',
      headers: {"Authorization": `Bearer ${authToken}`}
    };
    const response = await fetch(`${CART_API}/${id}`, requestPara);
    // if (response) setFetchError(response);
  }

  
  const updateCount = async (count, id) => {

      const requestPara  = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({
          id: 0,
          itemID: id,
          count: count,
        }),
      };
      const response = await ApiHandler(`${CART_API}`, requestPara);
      if (response) setFetchError(response);
  };

  const toggleMessageBox = () => {
    const element = document.querySelector('.message-screen');
    const displayValue = element.style.getPropertyValue('display');
    if (displayValue === "flex") {
      element.style.setProperty('display', 'none', 'important');
    } else {
      element.style.setProperty('display', 'flex', 'important');
    }
  }

  const addGiftMessage = async (file) => {

    try {
      const requestPara = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify({
          id: 0,
          username: "user",
          orderID: 0,
          document: file,
        }),
      };
      const response = await ApiHandler(`${ORDER_API}`, requestPara);
      if (response) setFetchError(response);
      setFetchError(null);
  } catch (err) {
    setFetchError(err.message);
  } finally {
    toggleMessageBox();
  }
  };

  const saveFile = (e) => {
    const fileStr = JSON.stringify(e);
    console.log("Submitted: " + fileStr.substring(40, fileStr.length - 2));
    setGiftMessage(fileStr.substring(40, fileStr.length - 2));
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
              updateCount={updateCount}
              search={search}
              isLoading={isLoading}
              costSum={costSum}
              setCostSum={setCostSum}
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
            <li><span>Total:</span> <span>${Math.ceil((costSum)*100)/100}</span></li>
            <li><span>Tax:</span> <span>${Math.ceil((tax)*100)/100}</span></li>
            <li><span>Shipping:</span> <span>${Math.ceil((shippingCost)*100)/100}</span></li>
            <li style={{fontWeight: "bold", marginTop: "5px"}}><span>Total:</span> <span>${Math.ceil((finalTotal)*100)/100}</span></li>
          </ul>
          <button onClick={() => toggleMessageBox()}>Add Gift Message</button>
          <button onClick={() => navigate("/checkout")}>Check Out</button>
        </div>
        <div className='message-screen'>
          <div className='message-box'>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
            <h3>Gift Message</h3>
            <FaWindowClose
              className="closeBtn"
              onClick={() => { toggleMessageBox()}}
              role="button"
              tabIndex="0"
              aria-label={`Close prompt`}
        />
            </label>
            {/* <input type="text" name="name" id="name"/> */}
            <span className="fileSelect" >
            <FileBase64 type="file" multiple={false} onDone={({ base64 }) => saveFile({ selectedFile: base64 })} onChange={(e) => e.target.files[0]} />
            </span>
            <input type="submit" name="submit" id="submit" onClick={() => {addGiftMessage(giftMessage)}}/>
          </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default ShoppingCart