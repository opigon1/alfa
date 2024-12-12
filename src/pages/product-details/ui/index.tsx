import React from "react";
import { useLoaderData } from "react-router-dom";
import { IProduct } from "../../../entities/product/model/card";
import styles from "./index.module.scss";
export const ProductDetailsPage: React.FC = () => {
  const data = useLoaderData() as IProduct;

  return (
    <div>
      <h1>{data?.title}</h1>
      <img className={styles.image} src={data?.thumbnail} alt={data?.title} />
      <p>{data?.description}</p>
      <p>Цена: ${data?.price}</p>
      {!data && <div>Продукт не найден</div>}
    </div>
  );
};
