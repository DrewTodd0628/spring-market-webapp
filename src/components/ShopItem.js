import { useEffect, useState } from "react";

const ShopItem = ({ item, addToCart, focusItem, checked, updateCount, cartItem }) => {
  const imgSrc = `data:image/png;base64,${item.image}`;

  const [count, setCount] = useState(1);
  const [firstUpdate, setFirstUpdate] = useState(true);

  useEffect(() => {
    if (cartItem !== undefined) {
      try {
        if (cartItem[0].count > 1) {
        setCount(cartItem[0].count);
        }
      } catch (err) {
        console.log(err.message);
      }
  }
  }, [cartItem])

  useEffect(() => {

    if (firstUpdate === false) {
        updateCount(count, item.id);
    } else {
      setFirstUpdate(false);
    }
  }, [count])



  return (
    <li className="item" onClick={() => focusItem(item)}>
      <label>
        <h5>{item.name}</h5>
        <img className="itemImg" src={imgSrc} />
      </label>
      <div className="itemDesc">{item.description}</div>
      <div className="arrowButtons">
      <input type="number" className="quantity" name="quantity" min="1" max="99" value={count} onChange={(e) => setCount(e.target.value)}></input>
      </div>
      <input
        className="checkbox"
        type="checkbox"
        onChange={() => addToCart(count, item.id)}
        checked={checked}
      />
    </li>
  );
};

export default ShopItem;
