import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";

const getStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

const CategoryDropdown = memo((props) => {
  const { categoryID, categoryList, setCategoryID } = props;
  const classes = getStyles();

  const onHandleChange = (event) => {
    setCategoryID(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={categoryID}
        onChange={onHandleChange}
        autoWidth
      >
        {categoryList &&
          categoryList.map((category) => {
            return (
              <MenuItem
                key={category["category_id"]}
                value={category["category_id"]}
              >
                {category["category_name"].toUpperCase()}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
});

CategoryDropdown.propTypes = {
  categoryID: PropTypes.string,
  categoryList: PropTypes.array,
  setCategoryList: PropTypes.func,
};

export default CategoryDropdown;
