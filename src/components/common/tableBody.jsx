import React, { Component } from "react";
import _ from "lodash";
// item[column.path] works for simple properties. if we're working with nested poperties, this doesn't work (item[genre.name]). instead we use lodash

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr>
            {columns.map((column) => (
              <td>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
