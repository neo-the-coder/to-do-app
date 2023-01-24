import React, { useEffect, useState } from 'react'
import styles from '../styles/SettingsCategories.module.scss';
import {v4 as uuid} from 'uuid';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, editCategory, deleteCategory, addCount } from '../slices/categorySlice';
import ConfirmationBox from './ConfirmationBox';
import getTextColor from '../helpers/HexToHSL';
import { BsPencilSquare, BsTrash, BsXSquare } from 'react-icons/bs';
import { updateTodo } from '../slices/todoSlice';

function SettingsCategories({ openSettings, setOpenSettings }) {
  const categoryList = useSelector((state) => state.category.categoriesList);
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
            <div className={styles.catNButtons}>
              <div className={styles.categoryList}>
                {categoryList.map((category) => (
                  <CategoryList
                    key={category.id}
                    category={category}
                    setCategoryState={setCategoryState}
                    setOpenOptions={setOpenOptions}
                  />
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
      </div>
    )
  );
}
  
function CategoryList({ category, setCategoryState, setOpenOptions }) {
  console.log("CATEGORY RENDERED");

  const [openConfirm, setOpenConfirm] = useState(false);
  //const [openOptions, setOpenOptions] = useState(false);
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todo.todoList);
  const message = (
    <h2>
      All tasks assigned to{" "}
      <span
        style={{ backgroundColor: category.color, color: category.textColor }}
      >
        "{category.name}"
      </span>{" "}
      will be moved to{" "}
      <span style={{ backgroundColor: "#d4d4d4" }}>"miscellaneous"</span>
    </h2>
  );
  
  const handleConfirmation = () => {
    dispatch(deleteCategory(category.id));
    for (const todo of todoList) {
      if (todo.category === category.name) {
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
          message={message}
        />
      )}
    </>
  );
}



function CategoryOptions({ categoryState, openOptions, setOpenOptions }) {
  console.log("SETTINGS RENDERED");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
  });

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
        id: uuid(),
        name: data.title,
        color: data.color,
        textColor: getTextColor(data.color),
        count: 0,
      };
      dispatch(addCategory(newCategory));
    } else {
      const editedCategory = {
        id: categoryState.id,
        name: data.title,
        color: data.color,
        textColor: getTextColor(data.color),
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
          <legend>{categoryState ? "Update" : "Add"} category </legend>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              autoFocus
              placeholder="Add your category..."
              defaultValue={categoryState ? categoryState.name : ""}
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
              defaultValue={categoryState ? categoryState.color : "#ffffff"}
              {...register("color", { required: true })}
            />
          </label>
          <div className={styles.buttonContainer}>
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </fieldset>
      </form>
    )
  );
}





export default SettingsCategories