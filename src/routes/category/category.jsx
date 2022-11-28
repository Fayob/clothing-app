import React, { Fragment, useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card'
import { CategoriesContext } from '../../context/categories.context'

import './category.scss'


const Category = () => {
  const { category } = useParams()
  const { categoriesMap } = useContext(CategoriesContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <Fragment>
      <h2 className='category-title'>{ category.toUpperCase() }</h2>
      <div className='category-container'>
        { products &&
          products.map((product) => <ProductCard key={product.id} product={product} />)
        }
      </div>
    </Fragment>
    )
}

export default Category