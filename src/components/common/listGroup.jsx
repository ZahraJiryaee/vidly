import React from "react";

// to decouple this component from services => pass to 2 more props to determine the name of the target properties (ther is not name and _id all the time!)
// so with this, instead of using dot notation, we use bracket notation to access properties dynamically
// item._id => item[valueProperty]

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, selectedItem, onItemSelect } =
    props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            item === selectedItem
              ? "list-group-item clickable active"
              : "list-group-item clickable"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

// we can assume that most of our objs have these 2 properties (name & _id). so we can set the default value for this props and we always can overwrite them.

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
