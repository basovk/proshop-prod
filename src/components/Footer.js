import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#343a40',
        color: '#fff',
        fontSize: '.975rem',
        lineHeight: '1.5'
      }}
    >
      <Container>
        <Row>
          <Col className='text-center py-3'>
            ProShop by{' '}
            <a href='https://github.com/basovk/proshop-prod' target='_blank'>
              basovk
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
