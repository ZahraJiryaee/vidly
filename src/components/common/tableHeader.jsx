import React, { Component } from "react";

// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  state = {};

  raiseSort = (path) => {
    // if the path is as the in sortColumn.path, we reverse the sort order otherwise: update the path and set the order to 'asc'
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
            </th>
            // if we have column.path use it, otherwise use column.key
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
