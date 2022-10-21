import { FaTrashAlt } from "react-icons/fa";

const ShopItem = ({ item, deleteItem }) => {

  const imgSrc = `data:image/png;base64,${item.image}`;

  return (
    <li className="item cartItem">
        <label>
          <h5>{item.name}</h5>
          <img className="itemImg" src={imgSrc} />
        </label>
      <div className="itemDesc">{item.description}</div>

    <div className="flex-container-center-v">
      <FaTrashAlt
        className="deleteBtn"
        onClick={() => deleteItem(item.id)}
        role="button"
        tabIndex="0"
        aria-label={`Delete ${item.item}`}
      />
      </div>
    </li>
  );
};

export default ShopItem;
