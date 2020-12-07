import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import StarIcon from "@material-ui/icons/Star";
import "./../style/productList.css";
import CardActions from "@material-ui/core/CardActions";
import { Button } from "@material-ui/core";

const ProductList = (props) => {
  const {
    image,
    name,
    weight,
    weightUnit,
    price,
    finalPrice,
    inStock,
  } = props;
  return (
    <Card className="root">
      <CardActionArea>
        <CardMedia className="card__image" image={image} />
        <CardContent className="content">
          <div className="card__title">{name}</div>
          <div className="card__weight">
            {weight ? `(${weight}${weightUnit})` : ""}
          </div>
          <div className="card__price">{`₹ ${price}`}</div>
          <div className="card__dash">{`₹ ${finalPrice}`}</div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className="custom__cardButton" disabled={!inStock}>
          {inStock ? "ADD TO CART" : "OUT OF STOCK"}
        </Button>
      </CardActions>
    </Card>
  );
};

ProductList.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  weight: PropTypes.number,
  weightUnit: PropTypes.string,
  price: PropTypes.number,
  finalPrice: PropTypes.number,
  inStock: PropTypes.bool,
};
export default ProductList;
