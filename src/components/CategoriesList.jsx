import React, { memo, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import axios from "axios";
import './../style/categoryList.css';
import ProductList from './ProductList';
import { Button, Grid } from "@material-ui/core";
import CategoryDropdown from './CategoryDropdown';

const getStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));


const CategoriesList = memo((props) => {
  const classes = getStyles();
  const [categoryID, setCategoryID] = useState("185");
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [isViewMore, setIsViewMore] = useState(true);

  useEffect(() => {
    axios(
      "https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob"
    )
      .then((res) => {
        if (res && res.data) {
          const data = res.data;
          setHeading(data["heading"]);
          setCategoryList(data.category_list);
          setProductList(data["product_list"]["products"]);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    axios(
      "https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=" +
        categoryID
    )
      .then((res) => {
        if (res && res.data) {
          const data = res.data;
          setProductList(data["products"]);
        }
      })
      .catch((error) => {
        setError(error);
      });

    setIsViewMore(true);
  }, [categoryID]);

  const onHandleChange = (event, value) => {
    setCategoryID(value);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className={classes.main}>
        {heading && <h1>{heading}</h1>}
        <AppBar position="static" color="transparent">
          <Tabs
            value={categoryID}
            onChange={onHandleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {categoryList &&
              categoryList.map((category, index) => {
                return (
                  <Tab
                    key={category["category_id"]}
                    value={category["category_id"]}
                    label={category["category_name"]}
                    style={{
                      backgroundImage: `url(${category["category_image"]})`,
                      backgroundSize: "100% 100%",
                      marginRight: "10px",
                      borderRadius: "0.3rem",
                      marginBottom: "0.5rem",
                      width: "120px",
                      height: "65px"
                    }}
                  />
                );
              })}
          </Tabs>
        </AppBar>
        <React.Fragment>
          <Grid container spacing={4} direction="row" alignItems="center">
            {productList &&
              productList
                .slice(0, isViewMore ? 3 : productList.length)
                .map((product) => {
                  return (
                    <Grid key={product["id"]} item xs={12} sm={6} md={4}>
                      <ProductList
                        image={product["image_urls"]["x300"]}
                        name={product["name"]}
                        weight={product["weight"]}
                        weightUnit={product["weight_unit"]}
                        price={product["price"]}
                        finalPrice={product["final_price"]}
                        inStock={product["is_in_stock"]}
                      />
                    </Grid>
                  );
                })}
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={6} sm={6} md={6}>
                <CategoryDropdown
                  categoryID={categoryID}
                  categoryList={categoryList}
                  setCategoryID={setCategoryID}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Button
                  className={"view__more__button"}
                  onClick={() => {
                    setIsViewMore(!isViewMore);
                  }}
                >
                  {isViewMore ? "[+] View More" : "[-] View Less"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    );
  }
});

export default CategoriesList;
