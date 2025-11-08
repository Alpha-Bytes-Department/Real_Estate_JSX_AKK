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
};

// ========================== add bookmark ==========================
const postToBookmark = async (propertyId) => {
  console.log('called with property id ' , propertyId)
  const resp = await api.post(`/realstate/favorites/`, {
    property: propertyId,
  });
  console.log('response from bookmark api ' , resp)
  return resp;
};
// ========================== remove bookmark ==========================
const removeFromBookmark = async (propertyId) => {
  console.log('called with property id ' , propertyId)
const resp = await api.delete(`/realstate/favorites/${propertyId}/`);
return resp;
}

// ======================== get all bookmarks ========================
 const getBookmarks = async () => {
  console.log("getBookmarks called");
  const resp = await api.get("/realstate/user/favorites/");
  return resp.data;
};

// ========================== Export ==========================
export { getPropertyById, getProperties , postToBookmark, removeFromBookmark , getBookmarks };
