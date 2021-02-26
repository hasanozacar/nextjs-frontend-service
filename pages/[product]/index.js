import { useState, useEffect } from "react";
import styles from "./product.module.scss";
import Layout from "components/Layout";

export default function Product({ query }) {
  // if (!data.products.name) {
  //   return <ErrorPage />;
  // }

    let error;
    let loading;
 const [filterData, setFilteredData] = useState([]);

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
          debugger;
          setFilteredData(
            data.find((f) => f.products.id === parseInt(query.product))
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

  return (
    <Layout>
      <div className={styles.container}>
        {/* <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head> */}

        <main className={styles.main}>
          <div className={styles.photosContainer}>
            <div className={styles.carouselContainer}>
              <img
                style={{ width: "18vw", height: "22vw" }}
                src={filterData.products?.imageUrl}
                loading="lazy"
              />
            </div>
            <hr />
          </div>
          <div className={styles.productInfos}>
            <div className={styles.header}>
              <h1 className={styles.productTitle}>
                {filterData.products?.name || ""}
              </h1>
            </div>
            <div className={styles.saleContainer}>
              <span className={styles.saleText}>
                {filterData.products?.price || 0}$
              </span>
            </div>
            <hr />
            <div className={styles.sizes}>
              {filterData.products?.badges?.map((item) => {
                return (
                  <button
                    key={item}
                    className={styles.sizeButton}
                    style={{
                      borderColor: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <hr />
            <div className={styles.infoContainer}>
              <h4 className={styles.sizesText}>Product Information</h4>
              <p className={styles.infoText}>{filterData.products?.content}</p>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

Product.getInitialProps = async function ({ query }) {
  return {
    query,
  };
};
