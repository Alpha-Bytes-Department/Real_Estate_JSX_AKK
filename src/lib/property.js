import { api } from "./apiClient";

// ========================== Property lists ==========================
const getProperties = async () => {
  console.log("getProperties called");
  const resp = await api.get("/realstate/listings/");
//   console.log("getProperties response data:", resp.data);
  return resp.data;
};

// ========================== Property data by id ==========================
const getPropertyById = async (id) => {
  console.log("getPropertyById called with id:", id);
  const resp = await api.get(`/realstate/listings/detail/${id}/`);
//   console.log("getPropertyById response data:", resp.data);
  return resp.data;
}


// ========================== Export ==========================
export {
  getPropertyById, 
  getProperties,
};