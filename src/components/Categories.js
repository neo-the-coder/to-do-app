import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiFilterFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { allCategory, pickCategory } from "../slices/filterSlice";
import styles from "../styles/Categories.module.scss";
import SettingsCategories from "./SettingsCategories";
import { getLightFix } from "../helpers/HexToHSL";

function Categories() {
  const [openSettings, setOpenSettings] = useState(false);
  const categories = useSelector((state) => state.category);
  const filterState = useSelector((state) => state.filter.category);
  const catArr = Object.keys(categories);
  const dispatch = useDispatch();
  const cLength = catArr.length;
  const allTaskCount = catArr.reduce(
    (sum, category) => sum + categories[category].count,
    0
  );

  const handleSettings = () => {
    setOpenSettings(true);
    document.body.style.overflow = "hidden";
  }

  return (
    <>
      <div className={styles.leftSide}>
        <button
          title="Settings"
          className={styles.catSettings}
          onClick={handleSettings}
        >
          <RxHamburgerMenu />
        </button>
        <button
          className={`${styles.allButton} ${
            filterState.length === 0 ? styles.allActive : ""
          }`}
          onClick={() => dispatch(allCategory())}
        >
          ALL<span className={styles.cCount} key={allTaskCount + 'A'}>{allTaskCount}</span>
        </button>
      </div>
      <div className={styles.catWrapper}>
        <h3 className={styles.filterTitle}>
          <RiFilterFill />
          CATEGORIES
        </h3>
        <div className={styles.categories}>
          {catArr.map((category) => (
            <button
              style={{
                "--catColor": categories[category].color,
                "--catTextColor": categories[category].textColor,
              }}
              className={`${styles.cUnit} ${
                filterState.includes(category) ? styles.active : ""
              } ${
                getLightFix(categories[category].color) ? styles.whiteFix : ""
              }`}
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
              {category[0].toUpperCase() + category.slice(1)}
              <span className={styles.cCount} key={categories[category].count + category[0]}>{categories[category].count}</span>
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

export default Categories;
