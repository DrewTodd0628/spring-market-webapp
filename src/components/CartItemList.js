import React from 'react'
import CartItem from './CartItem'

const CartItemList = ({ items, deleteItem, search, isLoading }) => {
  return (
    <>
        {items.length  + isLoading ? (
            items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                deleteItem={deleteItem}
              />
            ))
        ) : ( search ? (
            <div className="shopMsg">Can't find items</div>
        ) : (
            <div className="shopMsg">Cart is empty</div>
        )
        )}
        
    </>
  )
}

export default CartItemList