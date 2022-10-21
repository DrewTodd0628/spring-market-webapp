import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ApiHandler from "./ApiHandler";
import ShopItemList from "./ShopItemList";

const Shop = () => {
  const [search] = useOutletContext();
  const [itemList, setItemList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const ITEM_API = "http://6.tcp.ngrok.io:11718/shop"; // json server port: 3500/items, Spring Rest port: 8080/shop
  const USER_API = "http://6.tcp.ngrok.io:11718/user";
  const [focusedItem, SetFocusedItem] = useState([]);
  const imgSrc = `data:image/png;base64,${focusedItem.image}`;

  const fetchCart = async () => {
    try {
      const response = await fetch(`${USER_API}/ids`);
      if (!response.ok)
        throw Error("Could not connect to shop. Try refreshing page.");
      const items = await response.json();
      setCartList(items);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(ITEM_API);
        if (!response.ok)
          throw Error("Could not connect to shop. Try refreshing page.");
        const items = await response.json();
        setItemList(items);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      }
    };

    fetchItems();
    fetchCart();
  }, []);

  const addToCart = async (count, id) => {
    // const item = list.filter((item) => item.id === id);
    // setItemList(list);

    if (isInCart(id)) {
      const requestPara = { method: "DELETE" };
      const response = await ApiHandler(`${USER_API}/${id}`, requestPara);
      if (response) setFetchError(response);
    } else {
      const requestPara = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          itemID: id,
          count: count,
        }),
      };
      const response = await ApiHandler(`${USER_API}`, requestPara);
      if (response) setFetchError(response);
    }

    fetchCart();
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
              addToCart={addToCart}
              focusItem={focusItem}
              isInCart={isInCart}
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

        {/* <button onClick={() => navigate("/checkout")}>Check Out</button> */}
      </section>
    </>
  );
};

export default Shop;
