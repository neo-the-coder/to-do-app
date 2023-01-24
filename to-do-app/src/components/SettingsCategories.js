import React, { useState } from 'react'
import styles from '../styles/SettingsCategories.module.scss';
import {v4 as uuid} from 'uuid';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, editCategory, deleteCategory } from '../slices/categorySlice';
import ConfirmationBox from './ConfirmationBox';
import getTextColor from '../helpers/HexToHSL';
import { BsPencilSquare, BsTrash, BsXSquare } from 'react-icons/bs';

function SettingsCategories({ openSettings, setOpenSettings }) {
  const categoryList = useSelector((state) => state.category.categoriesList);
  console.log("CATEGORY OPTIONS RENDERED");
  const [openOptions, setOpenOptions] = useState(false);
  const [categoryState, setCategoryState] = useState(null);
  
  const handleAdd = () => {
    setCategoryState(null);
    setOpenOptions(true);
  }
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
            <BsXSquare />
          </div>
          <h1>CATEGORIES</h1>
          <div className={styles.catPanel}>
            <div className={styles.categoryList}>
              {categoryList.map((category) => (
                <CategoryList key={category.id} category={category} setCategoryState={setCategoryState} setOpenOptions={setOpenOptions}/>
              ))}
            </div>
            <button onClick={handleAdd}>Add more</button>
          </div>
          <div className={styles.options}>
            {openOptions ? (
              <CategoryOptions
                openOptions={openOptions}
                setOpenOptions={setOpenOptions}
                categoryState={categoryState}
                setCategoryState={setCategoryState}
              />
            ) : (
              <p>Select a category to edit or add a new one</p>
            )}
          </div>
      </div>
    </div>
    )
  );
}
  
function CategoryList({ category, setCategoryState, setOpenOptions }) {
  console.log("CATEGORY RENDERED");

  const [openConfirm, setOpenConfirm] = useState(false);
  //const [openOptions, setOpenOptions] = useState(false);

  const dispatch = useDispatch();
  const handleConfirmation = () => dispatch(deleteCategory(category.id));
  const handleUpdate = () => {
    setOpenOptions(true);
    setCategoryState(category);
  };

  return (
    <>
      <div
        className={styles.category}
        style={{ backgroundColor: category.color }}
      >
        <p style={{ color: category.textColor }}>{category.name}</p>
        <div className={styles.button}>
          <button
            disabled={category.name === "miscellaneous"}
            onClick={
              category.name !== "miscellaneous" ? handleUpdate : undefined
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
      {/* optimize rendering by adding conditional state  */}
      {/* {openOptions ? (
              <CategoryOptions
                category={category}
                openOptions={openOptions}
                setOpenOptions={setOpenOptions}
              />
            ) : (
              <p>Select a category to edit or add a new one</p>
            )} */}
      {openConfirm && (
        <ConfirmationBox
          handleConfirmation={handleConfirmation}
          openConfirm={openConfirm}
          setOpenConfirm={setOpenConfirm}
        />
      )}
    </>
  );
}



function CategoryOptions({categoryState, setCategoryState, openOptions, setOpenOptions}) {
  console.log('SETTINGS RENDERED')
  const dispatch = useDispatch();

  //const [openOptions, setOpenOptions] = useState(false);

  // const [catID, setCatID] = useState(null);
  // const [catTitle, setCatTitle] = useState("");
  // const [catColor, setCatColor] = useState("#ffffff");
  
  // const [type, setType] = useState('Add');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
  });
  
  
  const handleCancel = () => {
    setOpenOptions(false);
    setCategoryState(null);
    reset();
    // setCatID(null);
    // setCatTitle("");
    // setCatColor("#ffffff");
  };
  
  const onSubmit = (data) => {
    //e.preventDefault();
    console.log('data added', data)
    // if (!catID) {
    //   // Validate if name is not empty
    //   const newCategory = {
    //     id: uuid(),
    //     name: catTitle,
    //     color: catColor,
    //     textColor: getTextColor(catColor),
    //     count: 0,
    //   };
    //   dispatch(addCategory(newCategory));
    // } else {
    //   const editedCategory = {
    //     id: catID,
    //     name: catTitle,
    //     color: catColor,
    //     textColor: getTextColor(catColor),
    //   };
    //   dispatch(editCategory(editedCategory));
    // }

    // Setting default values after save
    handleCancel();
  };


  // const handleUpdate = (category) => {
  //   // setType('Update')
  //   setOpenOptions(true);
  //   // setCatID(category.id);
  //   // setCatTitle(category.name);
  //   // setCatColor(category.color);
  // };

  // const handleDelete = () => {
  //   //dispatch(deleteCategory(id))

  // }

  // const handleAdd = () => {
  //   setType('Add');
  //   setOpenOptions(true);
  // }

  return (
    openOptions && (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>{categoryState ? 'Update' : 'Add'} category {categoryState?.name}</legend>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              autoFocus
              placeholder="Add your category..."
              defaultValue={categoryState ? categoryState.name : ''}
              // value={catTitle}
              // onChange={(e) => setCatTitle(e.target.value)}
              {...register("title", {
                required: "Category title cannot be empty.",
              })}
            />
          </label>
          {<p className={styles.error}>{errors.title?.message}</p>}
          <label htmlFor="color">
            Color
            <input
              type="color"
              id="color"
              defaultValue={categoryState ? categoryState.color : '#ffffff'}
              // value={catColor}
              // onChange={(e) => setCatColor(e.target.value)}
              {...register("color", { required: true })}
            />
          </label>
          <div className={styles.buttonContainer}>
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </fieldset>
      </form>

      /* <form className={styles.form} onSubmit={handleSubmit}>
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
              </form> */
    )
  );
}





export default SettingsCategories