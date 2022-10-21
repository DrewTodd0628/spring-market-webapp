import React from 'react'

const ItemSearch = ({ search, setSearch }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder='Search for product' value={search} onChange={(e) => setSearch(e.target.value)}></input>
    </form>
  )
}

export default ItemSearch