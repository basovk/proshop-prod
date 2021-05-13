import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProductScreen from '../../src/screens/ProductScreen'
import Loader from '../../src/components/Loader'
import Message from '../../src/components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../../src/actions/productActions'

const productDetail = () => {
  const dispatch = useDispatch()
  const [productId, setProductId] = new useState(null)
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const router = useRouter()

  useEffect(() => {
    if (router && router.query) {
      const { productId } = router.query
      if (productId) {
        setProductId(productId)
        dispatch(listProductDetails(productId))
      }
    }
  }, [dispatch, router])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <ProductScreen product={{ ...product, productId }} />
      )}
    </>
  )
}

export default productDetail
