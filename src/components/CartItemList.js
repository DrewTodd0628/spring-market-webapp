import React from 'react'
import CartItem from './CartItem'

const CartItemList = ({ items, deleteItem, updateCount, search, isLoading, costSum, setCostSum }) => {
  return (
    <>
        {items.length  + isLoading ? (
            items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                deleteItem={deleteItem}
                updateCount={updateCount}
                costSum={costSum}
                setCostSum={setCostSum}
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