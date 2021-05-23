import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  // know the starting index of item on this page
  const startIndex = (pageNumber - 1) * pageSize;

  // use lodash to go to startindex and take items for the currentPage
  // _.slice(items, startIndex)

  // go to the array and pick items for the currentPage
  // _.take()

  // in order to call this method using a chain, first we need to convert the items array to a lodash wrapper
  // _(items)  => this will return a lodash obj andwith that we can chain all the lodash methods
  // .value() => convert the lodash wrapper to a regular array
  return _(items).slice(startIndex).take(pageSize).value();
}
