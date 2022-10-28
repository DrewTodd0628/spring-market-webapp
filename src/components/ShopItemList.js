import React from 'react'
import ShopItem from './ShopItem'

const ShopItemList = ({ items, addToCart, updateCount, focusItem, isInCart, search, isLoading, cartList }) => {
  const ccc = cartList.filter(cItem => cItem.itemID === 2);
  const bbb = items.filter(cItem => cItem.id === 1);

  return (
    <>
        {items.length + isLoading ? (
            items.map(item => (
              <ShopItem
                key={item.id}
                item={item}
                cartItem={cartList.filter(cItem => cItem.itemID === item.id)}
                addToCart={addToCart}
                updateCount={updateCount}
                focusItem={focusItem}
                checked={isInCart(item.id)}
              />
            ))
            ) : ( search ? (
              <div className="shopMsg">Can't find items</div>
          ) : (
              <div className="shopMsg">Out of stock</div>
          )
        )}
    </>
  )
}

export default ShopItemList