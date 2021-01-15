import {Field, Formik} from 'formik'
import React, {useEffect} from 'react'
import {authToken} from '../../api/auth-api'
import * as Yup from 'yup'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button, Col, Container, Form, Row, Spinner} from 'react-bootstrap'
import styles from './LoginPage.module.css'
import {requiredField} from '../../constants/constants'
import {history} from './../../history'
import {toggleIsFetching} from '../../redux/auth-reducer'
import {usersRequest} from '../../redux/users-reducer'

const LoginPage = (props) => {
    const stringMinLength = 5

    const submit = (values, {setSubmitting}) => {
        props.authToken(values.username, values.password)
        props.toggleIsFetching(true)
        setSubmitting(false)
    }
    const validationSchema = Yup.object({
        username: Yup.string().required(requiredField).min(stringMinLength, 'This field must include at least ' + stringMinLength + ' character'),
        password: Yup.string().required(requiredField).min(stringMinLength, 'This field must include at least ' + stringMinLength + ' character')
    })
    useEffect(() => {
        if (props.isAuth) {
            props.usersRequest(props.token)
        }
    }, [props])

    useEffect(() => {
        if (props.users.length > 0 && props.isAuth)
            history.push('/users')
    }, [props.users, props.isAuth])
    return (
        <Container>
            <Row style={{'height': '100vh'}} className={['justify-content-center', 'align-items-center']}>
                <div className="shadow p-3 mb-5 bg-white rounded">
                    <Col lg="auto" style={{'textAlign': 'center'}}>
                        <Formik
                            enableReinitialize
                            initialValues={{username: '', password: ''}}
                            validationSchema={validationSchema}
                            onSubmit={submit}>
                            {({
                                  values, errors, touched,
                                  handleChange, handleBlur,
                                  handleSubmit, isSubmitting
                              }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Field
                                            type="username"
                                            name="username"
                                            className='form-control'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.username}
                                        />
                                    </Form.Group>
                                    <p className={styles.errorText}>{errors.username && touched.username && errors.username}</p>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Field
                                            type="password"
                                            name="password"
                                            className='form-control'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                        />
                                    </Form.Group>
                                    <p className={styles.errorText}>{errors.password && touched.password && errors.password}</p>
                                    <div>
                                        <Button type="submit" disabled={isSubmitting}>
                                            {props.isFetching && <Spinner
                                                className={styles.toggleSpinner}
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />}
                                            Log In
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </div>
            </Row>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({toggleIsFetching, authToken, usersRequest}, dispatch)
}
const mapStateToProps = (state) => ({
    token: state.auth.token,
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching,
    users: state.usersPage.users
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
