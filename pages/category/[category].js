import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./category.module.scss";
import Layout from "components/Layout";
import { useContextData } from "@/firebase/context";
import Button from "@/components/FilterButton";
import ProductCard from "@/components/ProductCard/product-card";

const getEmoji = {
  all:'⚡',
  discount: "🎁",
  new: "💎",
};

export default function Category({ query }) {
  const { context } = useContextData();
  const [sortText, setSortText] = useState(false);
  const [filterData, setFilteredData] = useState([]);
    let error;
    let loading ;
  useEffect(() => {
    fetch(`https://cimri-backend-service.herokuapp.com/data`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        if (response.status === 200) {
          error = null;
        } else {
          error = response.message;
          console.log("error", error);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setFilteredData(
            data.filter((f) =>
              f.products.badges.find((f) => f === context?.toLowerCase())
            )
          );
        } else {
          loading = false;
        }

        return [];
      })
      .catch((err) => {
        loading = false;
        error = err.message;
        return [];
      });
  }, [query]);
  const handleSort = () => {
    setSortText(!sortText);
    var sortData = filterData;
    sortData.sort(function (a, b) {
      return sortText
        ? a.products.price - b.products.price
        : b.products.price - a.products.price;
    });
    setFilteredData(sortData);
  };
  console.log("user", context);

  console.log("filterData", filterData);

  return (
    <Layout>
      <div className={styles.container}>
        {/* <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> */}

        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              <span className={styles.emoji}>{getEmoji[query.category]}</span>
              {context}
            </h1>
            <div className={styles.headerButtons}>
              <Button
                onClick={handleSort}
                type="sort"
                style={{ marginRight: 20 }}
              >
                {sortText
                  ? "Sort Price: Low to High"
                  : "Sort Price: High to Low"}
              </Button>
            </div>
          </div>
          <div className={styles.products}>
            {!loading && filterData.map((item) => {
              return (
                <ProductCard
                  key={item.products.id}
                  id={item.products.id}
                  brand={item.products.brand}
                  name={item.products.name}
                  image={item.products.imageUrl}
                  badges={item.products.badges}
                  price={item.products.price}
                  content={item.products.content}
                  rate={item.products.rate}
                />
              );
            })}
          </div>
        </main>
      </div>
    </Layout>
  );
}
Category.getInitialProps = async function ({ query }) {
  return {
    query,
  };
};
