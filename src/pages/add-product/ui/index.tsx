// src/pages/add-product/ui/index.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../app/store/hooks";
import { addCard } from "../../../entities/product/model/slices/slice";
import styles from "./index.module.scss"; // Импортируем стили

interface IFormInput {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export const CreateProduct: React.FC = () => {
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
      price: data.price,
      discountPercentage: Math.floor(Math.random() * 50),
      rating: Math.floor(Math.random() * 6) + 1,
      stock: Math.floor(Math.random() * 100) + 1,
      brand: "Random Brand",
      category: "Random Category",
      thumbnail: data.thumbnail,
      images: [data.thumbnail],
    };

    dispatch(addCard(newProduct));
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
          <label className={styles.label}>Цена:</label>
          <input
            className={styles.input}
            type="number"
            {...register("price", {
              required: "Цена обязательна",
              min: { value: 0, message: "Цена не может быть отрицательной" },
            })}
          />
          {errors.price && (
            <p className={styles.error}>{errors.price.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>URL изображения:</label>
          <input
            className={styles.input}
            type="text"
            {...register("thumbnail", {
              required: "URL изображения обязателен",
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
    </div>
  );
};
