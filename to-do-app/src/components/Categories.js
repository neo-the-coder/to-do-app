import React, { useState } from 'react'
import {RxHamburgerMenu} from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux'
import { allCategory, pickCategory } from '../slices/filterSlice';
import styles from '../styles/Categories.module.scss';
import SettingsCategories from './SettingsCategories';

function Categories() {
  const [openSettings, setOpenSettings] = useState(false);
  const categories = useSelector(state => state.category);
  const filterState = useSelector(state => state.filter.category);
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
        >
          <RxHamburgerMenu/>
        </button>
        <button className={`${styles.allButton} ${filterState.length === 0 ? styles.allActive : ''}`} onClick={() => dispatch(allCategory())}>ALL<span>{allTaskCount}</span></button>
      </div>
      <div className={styles.catWrapper}>
        <h3>CATEGORIES</h3>
        <div className={styles.categories}>
          {catArr.map((category) => (
            <button
              style={{'--catColor': categories[category].color, '--catTextColor': categories[category].textColor}}
              className={`${styles.cUnit} ${filterState.includes(category) ? styles.active : ''}`}
              key={category}
              onClick={() => {
                dispatch(
                  pickCategory({
                    category,
                    cLength,
                  })
                );
              }}
            >
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