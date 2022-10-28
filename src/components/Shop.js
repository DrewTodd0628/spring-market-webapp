import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ApiHandler from "./ApiHandler";
import ShopItemList from "./ShopItemList";
import { Amplify } from 'aws-amplify';

const Shop = () => {
  const [search] = useOutletContext();
  const [itemList, setItemList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const ITEM_API = "http://2.tcp.ngrok.io:15856/shop"; // json server port: 3500/items, Spring Rest port: 8080/shop
  const CART_API = "http://2.tcp.ngrok.io:15856/cart";
  const [focusedItem, SetFocusedItem] = useState([]);
  const imgSrc = `data:image/png;base64,${focusedItem.image}`;
  const [authToken, setAuthToken] = useState("");

  const fetchCart = async (token) => {
    try {
      const requestPara  = {
      method: 'GET',
      headers: {"Authorization": `Bearer ${token}`}
    };
    const response = await fetch(`${CART_API}/ids`, requestPara);
      if (!response.ok)
        throw Error("Could not connect to shop. Try refreshing page.");
      const items = await response.json();
      setCartList(items);
      console.log(`setCartList: ${items}`)
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect( () => {

    const fetchItems = async () => {
      let token = "";
      try {
        const user = await Amplify.Auth.currentAuthenticatedUser();
        token = user.signInUserSession.idToken.jwtToken;
        setAuthToken(token);

        const requestPara  = {
          method: 'GET',
          headers: {"Authorization": `Bearer ${token}`}
        };
        const response = await fetch(`${ITEM_API}`, requestPara);


        if (!response.ok)
          throw Error("Could not connect to shop. Try refreshing page.");
        const items = await response.json();
        setItemList(items);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        fetchCart(token);
      }
    };

    fetchItems();
  }, []);

  const addToCart = async (count, id) => {

    if (isInCart(id)) {
      
      const requestPara  = {
        method: 'DELETE',
        headers: {"Authorization": `Bearer ${authToken}`}
      };
      const response = await fetch(`${CART_API}/${id}`, requestPara);

      if (response) setFetchError(response);
    } else {
      const requestPara = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    }

    fetchCart(authToken);
  };

  const updateCount = async (count, id) => {

    if (!isInCart(id)) {
      await addToCart(count, id);
    } else {
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
    }
  };




  const focusItem = (item) => {
    SetFocusedItem(item);
  };

  const isInCart = (shopItemid) => {
    return JSON.stringify(
      cartList.filter((cartItem) => cartItem.itemID === shopItemid)
    ) !== "[]"
      ? true
      : false;
  };

  return (
    <>
      <section className="itemList">
        <ul>
          {isLoading && <div className="shopMsg">Loading...</div>}
          {fetchError && (
            <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>
          )}
          {!isLoading + !fetchError ? (
            <ShopItemList
              items={itemList.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase())
              )}
              cartList={cartList}
              addToCart={addToCart}
              focusItem={focusItem}
              isInCart={isInCart}
              updateCount={updateCount}
              search={search}
              isLoading={isLoading}
            />
          ) : (
            <div className="shopMsg">Error retrieving shop items.</div>
          )}
        </ul>
      </section>

      <section className="sidePanel">
        {focusedItem.length === 0 ? (
          <p>
            Spring Market Fall Sale! <br /> 10% off Halloween candy.{" "}
          </p>
        ) : (
          <div>
            <label>
              <span>
                <h3>{focusedItem.name}</h3>
                <p>
                  ${focusedItem.price} {focusedItem.per}
                </p>
              </span>
              <img className="itemImg" src={imgSrc} />
            </label>
            <p className="description">{focusedItem.description}</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Shop;
