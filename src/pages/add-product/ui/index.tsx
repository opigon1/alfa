import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../app/store/hooks";
import { addCard } from "../../../entities/product/model/slices/slice";
import styles from "./index.module.scss";

interface IFormInput {
  title: string;
  description: string;
  thumbnail: string;
}

export const CreateProduct: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    const newProduct = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      price: Math.floor(Math.random() * 100) + 1,
      discountPercentage: Math.floor(Math.random() * 50),
      rating: 0,
      stock: Math.floor(Math.random() * 100) + 1,
      brand: "Random Brand",
      category: "Random Category",
      thumbnail: data.thumbnail,
      images: [data.thumbnail],
    };

    dispatch(addCard(newProduct));
    setSuccessMessage("Карточка успешно создана!");

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Создать продукт</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Название:</label>
          <input
            className={styles.input}
            type="text"
            {...register("title", { required: "Название обязательно" })}
          />
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Описание:</label>
          <textarea
            className={styles.textarea}
            {...register("description", { required: "Описание обязательно" })}
          />
          {errors.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>URL изображения:</label>
          <input
            className={styles.input}
            type="text"
            {...register("thumbnail", {
              required: "URL изображения обязателен",
              pattern: {
                value: /https?:\/\/\S+\.\S+/g,
                message: "Введите действительный URL изображения",
              },
            })}
          />
          {errors.thumbnail && (
            <p className={styles.error}>{errors.thumbnail.message}</p>
          )}
        </div>
        <button className={styles.button} type="submit">
          Создать продукт
        </button>
      </form>
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
    </div>
  );
};
