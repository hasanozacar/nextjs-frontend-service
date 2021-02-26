import React, { useState } from "react";
import Link from "next/link";
import styles from "./header.module.scss";
import CartIcon from "@/icons/cart";
import MenuIcon from "@/icons/menu";

export default function Header() {
  return (
    <nav className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <a className={styles.logo}>Cimri</a>
        </Link>
      </div>
      <div className={styles.rightContent}>
      </div>
    </nav>
  );
}
