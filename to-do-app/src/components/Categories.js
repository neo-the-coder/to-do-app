import React, { useState } from 'react'
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/Categories.module.scss';
import SettingsCategories from './SettingsCategories';

function Categories() {
    const [openSettings, setOpenSettings] = useState(false);
    const categories = useSelector(state => state.category.categoriesList);
    const dispatch = useDispatch();

    //addCategory, editCategory, deleteCategory. open window to do task 

  return (
    <>
      <button>ALL</button>
      {categories.map((category) => (
        <button
          style={{ backgroundColor: category.color, color: category.textColor }}
          key={category.id}
        >
          {category.name}
          <span>{category.count}</span>
        </button>
      ))}
      <div
        className={styles.catSettings}
        onClick={() => setOpenSettings(true)}
        onKeyDown={() => setOpenSettings(true)}
        tabIndex={0}
        role="button"
      >
        <MdOutlineMoreHoriz />
      </div>
      <SettingsCategories
        openSettings={openSettings}
        setOpenSettings={setOpenSettings}
      />
    </>
  );
}

export default Categories