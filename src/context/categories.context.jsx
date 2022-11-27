import { createContext, useState, useEffect } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase'
// import ProductsData from '../shop-data'

export const CategoriesContext = createContext()

const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({})

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoryMap)
    }
    getCategoriesMap() 
  }, [])

  const value = { categoriesMap }
  return (
    <CategoriesContext.Provider value={value}>{ children }</CategoriesContext.Provider>
  )
}

export default CategoriesProvider