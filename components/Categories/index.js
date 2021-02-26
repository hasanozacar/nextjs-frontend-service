import React from "react";
import { useRouter } from "next/router";
import styles from "./categories.module.scss";
import Link from "next/link";
import { useContextData } from "../../context/context";

const CategoryItem = ({ name, link, emoji }) => {
  const { setContext } = useContextData();
  const router = useRouter();

  return (
    <li className={styles.categoryItem}>
      <Link href={link }>
        <a onClick={() => setContext(name)}>
          <span className={styles.emoji}>{emoji}</span>
          <span className={styles.categoryName}>{name}</span>
        </a>
      </Link>
    </li>
  );
};

export default function CategoriesBar() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Filter</h2>
      <ul className={styles.categories}>
        <CategoryItem name="All" emoji="⚡" link="/" />
        <CategoryItem name="New" emoji="💎" link="/category/new" />
        <CategoryItem name="Discount" emoji="🎁" link="/category/discount" />
      </ul>
    </div>
  );
}
