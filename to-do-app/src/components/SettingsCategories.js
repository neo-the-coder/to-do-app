import React, { useState } from 'react'
import styles from '../styles/SettingsCategories.module.scss';
import {v4 as uuid} from 'uuid';
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, editCategory, deleteCategory } from '../slices/categorySlice';
import ConfirmationBox from './ConfirmationBox';
import getTextColor from '../helpers/HexToHSL';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

function Category({ category, handleEdit }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleConfirmation = () => dispatch(deleteCategory(category.id));

  return (
    <>
      <div
        className={styles.category}
        style={{ backgroundColor: category.color }}
      >
        <p style={{color: category.textColor}}>{category.name}</p>
        <div className={styles.button}>
          <button
            disabled={category.name === "miscellaneous"}
            onClick={
              category.name !== "miscellaneous"
                ? () => handleEdit(category)
                : undefined
            }
          >
              <BsPencilSquare />
          </button>
          <button
            disabled={category.name === "miscellaneous"}
            onClick={
              category.name !== "miscellaneous"
                ? () => setOpenConfirm(true)
                : undefined
            }
          >
            <BsTrash />
          </button>
        </div>
      </div>
      <ConfirmationBox
        handleConfirmation={handleConfirmation}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
      />
    </>
  );
}



function SettingsCategories({openSettings, setOpenSettings}) {
  const categoryList = useSelector((state) => state.category.categoriesList);
  const dispatch = useDispatch();

  const [openOptions, setOpenOptions] = useState(false);
  const [catID, setCatID] = useState(null);
  const [catTitle, setCatTitle] = useState("");
  const [catColor, setCatColor] = useState("#ffffff");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!catID) {
      // Validate if name is not empty
      const newCategory = {
        id: uuid(),
        name: catTitle,
        color: catColor,
        textColor: getTextColor(catColor),
        count: 0,
      };
      dispatch(addCategory(newCategory));
    } else {
      const editedCategory = {
        id: catID,
        name: catTitle,
        color: catColor,
        textColor: getTextColor(catColor),
      };
      dispatch(editCategory(editedCategory));
    }
    // Setting default values after save
    handleCancel();
  };

  const handleCancel = () => {
    setOpenOptions(false);
    setCatID(null);
    setCatTitle("");
    setCatColor("#ffffff");
  };

  const handleEdit = (category) => {
    setOpenOptions(true);
    setCatTitle(category.name);
    setCatColor(category.color);
    setCatID(category.id);
  };

  // const handleDelete = () => {
  //   //dispatch(deleteCategory(id))

  // }

  const handleAdd = () => setOpenOptions(true);

  return (
    openSettings && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setOpenSettings(false)}
            onKeyDown={() => setOpenSettings(false)}
            tabIndex={0}
            role="button"
          >
            [X]{/* <MdOutlineClose /> */}
          </div>
          <div className={styles.list}>
            {categoryList.map((category) => (
              <Category
                key={category.id}
                category={category}
                handleEdit={handleEdit}
              />
            ))}
            <button onClick={handleAdd}>Add more</button>
          </div>
          <div className={styles.options}>
            {openOptions ? (
              <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    autoFocus
                    value={catTitle}
                    onChange={(e) => setCatTitle(e.target.value)}
                  />
                </label>
                <label htmlFor="color">
                  Color
                  <input
                    type="color"
                    id="color"
                    value={catColor}
                    onChange={(e) => setCatColor(e.target.value)}
                  />
                </label>
                <div className={styles.buttonContainer}>
                  <button type="submit">Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            ) : (
              <p>Select a category to edit or add a new one</p>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default SettingsCategories