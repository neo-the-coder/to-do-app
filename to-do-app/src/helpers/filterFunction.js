export const filterData = (data, filters) => {
  const selectedFilters = [];
  for (const key in filters) {
    if (filters[key].length > 0) {
      const filtered = {};
      filtered[key] = filters[key];
      selectedFilters.push(filtered);
    }
  }
  if (selectedFilters.length > 0) {
    return data.filter((item) => {
      return selectedFilters.every((filter) => {
        const filterName = Object.keys(filter)[0];
        return filter[filterName].includes(item[filterName]);
      });
    });
  } else {
    return data;
  }
};

// const filterData = (data, filters) => {
//   return data.filter((item) => {
//     return filters.some((filter) => {
//       const filterName = Object.keys(filter)[0];
//       return filter[filterName].includes(item[filterName]);
//     });
//   });
// };