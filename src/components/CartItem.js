import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ShopItem = ({ item, deleteItem, updateCount, costSum, setCostSum }) => {

  const imgSrc = `data:image/png;base64,${item.image}`;
  
  const [count, setCount] = useState(item.count);
  const [firstUpdate, setFirstUpdate] = useState(true);
  const [addedCost, setAddedCost] = useState(0);

  useEffect(() => {
    console.log("curretn cost at " + item.name + " creation: " + costSum)
    setAddedCost(item.price * count);
  }, [])

  useEffect(() => {

    console.log("count: " + count)
    console.log(costSum);
    if (firstUpdate === false) {
        console.log("updating");
        updateCount(count, item.id);
        setAddedCost(item.price * count);
        setCostSum((costSum - addedCost) + (item.price * count));
    } else {
      setFirstUpdate(false);
      console.log("can now be updated")
    }
  }, [count])

  const removeAllFromTotal = () => {
    console.log("costSum: " + costSum + " addedCost: " + addedCost)
    setCostSum(costSum - addedCost);
  }

  return (
    <li className="item cartItem">
        <label>
          <h5>{item.name}</h5>
          <img className="itemImg" src={imgSrc} />
        </label>
      <div className="itemDesc">{item.description}</div>

    <div className="flex-container-center-v">
      <div className="arrowButtons" style={{marginBottom: "56px"}}>
        <input type="number" className="quantity" name="quantity" min="1" max="99" value={count} onChange={(e) => setCount(e.target.value)}></input>
      </div>
      <FaTrashAlt
        className="deleteBtn"
        onClick={() => { removeAllFromTotal(); deleteItem(item.id)}}
        role="button"
        tabIndex="0"
        aria-label={`Delete ${item.item}`}
      />
      </div>
    </li>
  );
};

export default ShopItem;
