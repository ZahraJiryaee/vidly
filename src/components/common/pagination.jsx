import React from "react";
import _ from "lodash"; // _ is common bc lodash is an optimized version of library called underscore

//

const Pagination = (props) => {
  const { itemsCount, pageSize } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  //based on this number we're gonna create an array and then map that array to "li"s to create dynmic pages
  //[1...pagesCount].map() -- use lodash for that
  // Math.ceil() - convert float to int - return the smallest int grater than or equal to the number
  if (pagesCount === 1) return null;
  // if there is only one page we don't wanna render anything
  const pages = _.range(1, pagesCount + 1); // +1 bc range method will not include end number itself
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className="page-item">
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
