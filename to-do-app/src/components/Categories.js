import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Categories() {
    const categories = useSelector(state => state.category.categoriesList);
    const dispatch = useDispatch();

    //addCategory, editCategory, deleteCategory. open window to do task 

  return (
    <>
        <button>ALL</button>
        {categories.map(category => (
            <button style={{backgroundColor: category.color}} key={category.id}>{category.name}<span>{category.count}</span></button>
        ))}
        <button>...</button>
    </>
  )
}

export default Categories