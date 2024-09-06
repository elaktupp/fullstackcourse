import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  // Instead of returning whole response,
  // just interesting part is returned...
  // Long form:
  //     return request.then((response) => {
  //       return response.data;
  //     });
  // Compact way:
  return request.then((response) => response.data);

  // TEST CODE with erroneus content to test catch on importance toggle
  /*
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    important: true,
  };
  return request.then((response) => response.data.concat(nonExisting));
  */
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

// Since object method names all match...
// export default {
//   getAll: getAll,
//   create: create,
//   update: update,
// };
// IT IS OK TO WRITE LIKE THIS (ES6)
export default { getAll, create, update };
