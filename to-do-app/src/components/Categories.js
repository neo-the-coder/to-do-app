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
      <div className={styles.leftSide}>
        <button
          title='Settings'
          className={styles.catSettings}
          onClick={() => setOpenSettings(true)}
          // onKeyDown={() => setOpenSettings(true)}
          // tabIndex={0}
          // role="button"
        >
          <MdOutlineMoreHoriz />
        </button>
        <button className={styles.allButton} onClick={() => dispatch(allCategory())}>ALL<span>{allTaskCount}</span></button>
      </div>
      <div className={styles.catWrapper}>
        <h3>CATEGORIES</h3>
        <div className={styles.categories}>
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
        </div>
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