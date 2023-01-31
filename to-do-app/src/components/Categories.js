import React, { useState } from 'react'
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { allCategory, pickCategory } from '../slices/filterSlice';
import styles from '../styles/Categories.module.scss';
import SettingsCategories from './SettingsCategories';

function Categories() {
    const [openSettings, setOpenSettings] = useState(false);
    //const categories = useSelector(state => state.category.categoriesList);
    const categories = useSelector(state => state.category);
    const catArr = Object.keys(categories);
    const dispatch = useDispatch();
    const cLength = catArr.length;
    const allTaskCount = catArr.reduce((sum, category) => sum + categories[category].count, 0);

  return (
    <>
      <button onClick={() => dispatch(allCategory())}>ALL<span>{allTaskCount}</span></button>
      {catArr.map((category) => (
        <button
          style={{ backgroundColor: categories[category].color, color: categories[category].textColor }}
          key={category}
          //CHANGE BELOW
          onClick={() => {
            dispatch(
              pickCategory({
                category,
                cLength,
              })
            );
          }}
        >
          {cLength}
          {category}
          <span>{categories[category].count}</span>
        </button>
      ))}
      <button
        className={styles.catSettings}
        onClick={() => setOpenSettings(true)}
        // onKeyDown={() => setOpenSettings(true)}
        // tabIndex={0}
        // role="button"
      >
        <MdOutlineMoreHoriz />
      </button>
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