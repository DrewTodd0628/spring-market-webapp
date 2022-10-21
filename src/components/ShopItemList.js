import React from 'react'
import ShopItem from './ShopItem'

const ShopItemList = ({ items, addToCart, focusItem, isInCart, search, isLoading }) => {

  return (
    <>
        {items.length + isLoading ? (
            items.map(item => (
              <ShopItem
                key={item.id}
                item={item}
                addToCart={addToCart}
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