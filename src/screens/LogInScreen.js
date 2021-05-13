import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useRouter } from 'next/router'
import Head from 'next/head'

const LogInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const router = useRouter()

  const urlParams = new URLSearchParams(router.asPath.split('?')[1])
  const redirect = urlParams.get('redirect') ?? '/'

  useEffect(() => {
    if (userInfo) {
      router.push(redirect)
    }
  }, [router, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      <Head>
        <title>Sign In - ProShop</title>
      </Head>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Sign In
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link
              href={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              <a>Register</a>
            </Link>
            .
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default LogInScreen
