import React, { useState } from "react";
import styles from "./product.module.scss";
import { useRouter } from "next/router";

export default function ProductCard({
  id,
  name,
  price,
  image,
  badges,
  rate,
  content,
  ...props
}) {
  const router = useRouter();

  const goToProduct = (target) => {
    console.log(target);
    target?.localName !== "button" &&
      typeof window !== "undefined" &&
      router.push(`/${id}`);
  };
   var en = badges.find((f) => f === "new");
  return (
    <div
      className={styles.container}
      style={{
      }}
      onClick={(e) => goToProduct(e.target)}
      {...props}
    >
      {en && (
        <div>
          <span className={styles.emoji}>⚡</span>New
        </div>
      )}
      <div className={styles.imageContainer}>
        {image && <img className={styles.image} src={image} loading="lazy" />}
      </div>
      <div className={styles.textContainer}>
        <h4>{name}</h4>

        <span className={styles.brandText}>{content}</span>
        {
          <div className={styles.priceContainer}>
            <div className={styles.rate}>{rate}</div>
            <div className={styles.prices}>
              <span className={styles.salePriceText}>{price}$</span>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
