import React, { useState } from 'react'
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { allCategory, pickCategory } from '../slices/filterSlice';
import styles from '../styles/Categories.module.scss';
import SettingsCategories from './SettingsCategories';

function Categories() {
    const [openSettings, setOpenSettings] = useState(false);
    const categories = useSelector(state => state.category.categoriesList);
    const dispatch = useDispatch();
    const cLength = categories.length;
    const allTaskCount = categories.reduce((sum, category) => sum + category.count, 0);

  return (
    <>
      <button onClick={() => dispatch(allCategory())}>ALL<span>{allTaskCount}</span></button>
      {categories.map((category) => (
        <button
          style={{ backgroundColor: category.color, color: category.textColor }}
          key={category.id}
          onClick={() => {
            dispatch(
              pickCategory({
                category: category.name,
                cLength,
              })
            );
          }}
        >
          {cLength}
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
      {/* optimize rendering by adding conditional state  */}
      {openSettings && (
        <SettingsCategories
          openSettings={openSettings}
          setOpenSettings={setOpenSettings}
        />
      )}
    </>
  );
}

export default Categories