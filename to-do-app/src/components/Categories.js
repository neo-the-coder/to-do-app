import React from 'react'
import { useSelector } from 'react-redux'

function Categories() {
    const categories = useSelector(state => state.category.categoriesList);

  return (
    <>
        <button>ALL</button>
        {categories.map(category => (
            <button style={{backgroundColor: category.color}}>{category.name}<span>{category.count}</span></button>
        ))}
        <button>Add Category</button>
    </>
  )
}

export default Categories