import React, { useEffect, useState } from 'react'
import styles from '../styles/SettingsCategories.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, editCategory, deleteCategory, addCount } from '../slices/categorySlice';
import ConfirmationBox from './ConfirmationBox';
import { getTextColor } from '../helpers/HexToHSL';
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { CgClose } from 'react-icons/cg';
import { updateTodo } from '../slices/todoSlice';
import { pickCategory } from '../slices/filterSlice';


function SettingsCategories({ openSettings, setOpenSettings }) {
  const categories = useSelector((state) => state.category);
  const catArr = Object.keys(categories);
  console.log("CATEGORY OPTIONS RENDERED");
  const [openOptions, setOpenOptions] = useState(false);
  const [categoryState, setCategoryState] = useState(null);

  const handleAdd = () => {
    setCategoryState(null);
    setOpenOptions(true);
  };
  return (
    openSettings && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <button
            className={styles.closeButton}
            onClick={() => setOpenSettings(false)}
            // onKeyDown={() => setOpenSettings(false)}
            // tabIndex={0}
            // role="button"
          >
            <CgClose />
          </button>
          <h3>CATEGORY SETTINGS</h3>
          <div className={styles.catPanel}>
            <div className={styles.catWrapper}>
              <div className={styles.categoryList}>
                {catArr.map((category) => (
                  <CategoryList
                    key={category}
                    category={category}
                    setCategoryState={setCategoryState}
                    setOpenOptions={setOpenOptions}
                  />
                ))}
              </div>
              <button className={styles.addBtn} onClick={handleAdd}>Add more</button>
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
      </div>
    )
  );
}
  
function CategoryList({ category, setCategoryState, setOpenOptions }) {
  const categories = useSelector((state) => state.category);
  console.log("CATEGORY RENDERED");

  const [openConfirm, setOpenConfirm] = useState(false);
  //const [openOptions, setOpenOptions] = useState(false);
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todo.todoList);
  const message = (
    <h2 className={styles.confirmMsg}>
      All tasks assigned to{" "}
      <span className={styles.delCat}
        style={{ backgroundColor: categories[category].color, color: categories[category].textColor }}
      >
        {category[0].toUpperCase() + category.slice(1)}
      </span>{" "}
      will be moved to{" "}
      <span className={styles.misCat}>Miscellaneous</span>
    </h2>
  );
  
  const handleConfirmation = () => {
    dispatch(deleteCategory(category));
    dispatch(pickCategory({category, cLength: 'DEL'}))
    for (const todo of todoList) {
      if (todo.category === category) {
        dispatch(
          updateTodo({
            id: todo.id,
            category: "miscellaneous",
          })
        );
        dispatch(addCount("miscellaneous"));
      }
    }
  };

  const handleUpdate = () => {
    setCategoryState(category);
    setOpenOptions(true);
  };

  return (
    <>
      <div
        className={styles.category}
        style={{ backgroundColor: categories[category].color }}
      >
        <p style={{ color: categories[category].textColor }}>{category[0].toUpperCase() + category.slice(1)}</p>
        <div className={styles.buttonGroup}>
          <button
            disabled={category === "miscellaneous"}
            onClick={
              category !== "miscellaneous" ? handleUpdate : undefined
            }
          >
            <BsPencilSquare />
          </button>
          <button
            disabled={category === "miscellaneous"}
            onClick={
              category !== "miscellaneous"
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
          message={message}
        />
      )}
    </>
  );
}



function CategoryOptions({ categoryState, openOptions, setOpenOptions }) {
  console.log("SETTINGS RENDERED");
  // categoryState is null if a category is added
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
  });
  
  const customValidation = (value) => {
    // !(value.toLowerCase() in categories && !categoryState) &&
    // !(value.toLowerCase() in categories && value !== categoryState)
    return !(
      value.toLowerCase() in categories &&
      (!categoryState || value !== categoryState)
    );
  };

  useEffect(() => {
    console.log("USEEFFECT");
    reset();
  }, [categoryState]);
  
  const handleCancel = () => setOpenOptions(false);
  
  const onSubmit = (data) => {
    //e.preventDefault();
    console.log("data added", data, categoryState);
    if (!categoryState) {
      const newCategory = {
        // id: uuid(),
        // name: data.title,
        // color: data.color,
        // textColor: getTextColor(data.color),
        // count: 0,
        [data.title.toLowerCase()] : {
          color: data.color,
          textColor: getTextColor(data.color),
          count: 0,
        }
      };
      dispatch(addCategory(newCategory));
    } else {
      const editedCategory = {
        // id: categoryState.id,
        // name: data.title,
        // color: data.color,
        // textColor: getTextColor(data.color),
        prevName: categoryState,
        newName : data.title.toLowerCase(),
        data : {
          color: data.color,
          textColor: getTextColor(data.color),
        }
      };
      dispatch(editCategory(editedCategory));
    }
    // Setting default values after save
    handleCancel();
  };

  return (
    openOptions && (
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>{categoryState ? "Edit" : "Add"} a category</legend>
          <div className={styles.formGroup}>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                className={errors.title?.message ? styles.error : ''}
                autoFocus
                placeholder="Add your category..."
                defaultValue={categoryState ? categoryState : ""}
                {...register("title", {
                  required: "Category title cannot be empty.",
                  validate: v => customValidation(v) || `There is "${v[0].toUpperCase() + v.slice(1).toLowerCase()}" category already.`
                })}
              />
            </label>
            {<p className={styles.errorMsg}>{errors.title?.message}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="color">
              Color
              <input
                type="color"
                id="color"
                defaultValue={categoryState ? categories[categoryState].color : "#ffffff"}
                {...register("color", { required: true })}
              />
            </label>
          </div>
        </fieldset>
        <div className={styles.buttonContainer}>
          <button className={styles.confirmBtn} type="submit">{categoryState ? "Save" : "Add"}</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    )
  );
}





export default SettingsCategories