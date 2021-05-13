import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import Link from 'next/link'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link href={`/product/[productId]`} as={`/product/${product._id}`}>
        <a>
          <Card.Img src={product.image} variant='top' />
        </a>
      </Link>
      <Card.Body>
        <Link href={`/product/[productId]`} as={`/product/${product._id}`}>
          <a>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </a>
        </Link>
        <Card.Text as='div'>
          <div className='my-3'>
            <Rating
              rating={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>
        <Card.Text as='h3'>
          <div className='my-3'>${product.price}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
