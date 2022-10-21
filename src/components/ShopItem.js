const ShopItem = ({ item, addToCart, focusItem, checked }) => {
  const imgSrc = `data:image/png;base64,${item.image}`;

  return (
    <li className="item" onClick={() => focusItem(item)}>
      <label>
        <h5>{item.name}</h5>
        <img className="itemImg" src={imgSrc} />
      </label>
      <div className="itemDesc">{item.description}</div>
      <input
        className="checkbox"
        type="checkbox"
        onChange={() => addToCart(1, item.id)}
        checked={checked}
      />
    </li>
  );
};

export default ShopItem;
