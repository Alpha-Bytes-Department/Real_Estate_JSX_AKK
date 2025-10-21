'use client'
 
import { createContext, useEffect, useState } from "react"
 
export const BookmarkContext =  createContext()
 
const BookmarkProvider = ({children}) => {
 
    const [bookmarks, setBookmarks] = useState([]);
 
  // Load from localStorage on first render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmark") || "[]");
    setBookmarks(saved);
  }, []);
 
  // Update localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
  }, [bookmarks]);
 
  // Toggle add/remove (for ManswearCard)
  const toggleBookmark = (item) => {
    setBookmarks((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };
 
  // Remove only (for StorageItem)
  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((i) => i.id !== id));
  };
   
  return (
    <div>
      <BookmarkContext.Provider value={{bookmarks, toggleBookmark, removeBookmark}}>
            {children}
      </BookmarkContext.Provider>
    </div>
  )
}
 
export default BookmarkProvider