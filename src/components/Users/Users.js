import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {filterUsers, usersRequest} from '../../redux/users-reducer'
import {Button, Col, Container, Form, Row} from 'react-bootstrap'
import styles from './Users.module.css'
import * as Icon from 'react-bootstrap-icons'
import {Field, Formik} from 'formik'
import {defaultAvatarSrc, filterOptions, sortOptions} from '../../constants/constants'
import {logOut, toggleIsFetching} from '../../redux/auth-reducer'
import {history} from './../../history'
import {getUsers} from '../../redux/users-selectors'
import {getAuthToken} from '../../redux/auth-selectors'


const Users = () => {
    let token = useSelector(getAuthToken)
    const users = useSelector(getUsers)

    const dispatch = useDispatch()

    useEffect(() => {
        if (users.length === 0 && token) {
            dispatch(usersRequest(token))
        }
    }, [token, dispatch, users])

    useEffect(() => {
        dispatch(toggleIsFetching(false))
    }, [dispatch])

    useEffect(() => {
        history.listen((location, action) => {
            if (action === 'POP') {
                dispatch(logOut())
            }
        })
    }, [dispatch])

    const submit = (values, {setSubmitting}) => {
        dispatch(filterUsers(values.filter, values.filterOption, values.sortOption))
        setSubmitting(false)
    }

    return <div>
        <Row className={styles.usersFilterForm}>
            <Col sm="auto" md="auto" lg="auto" className={styles.usersFilterFormColumn}>
                <Formik enableReinitialize
                        initialValues={{filter: ''}}
                        onSubmit={submit}>
                    {({
                          values, handleChange, handleBlur,
                          handleSubmit, isSubmitting
                      }) => (
                        <Form onSubmit={handleSubmit} className={styles.usersFilterGroup}>
                            <Field as="select" className={'form-control'} name="filterOption">
                                <option hidden>Filter by:</option>
                                <option value={filterOptions.username}>Username</option>
                                <option value={filterOptions.id}>Id</option>
                            </Field>
                            <Field type="text"
                                   name="filter"
                                   placeholder="Enter filter text"
                                   className='form-control'
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.filter}/>
                            <Field as="select" className='form-control' name="sortOption">
                                <option hidden>Sort by:</option>
                                <option value="none">None</option>
                                <option value={sortOptions.increaseId}>Increasing Id</option>
                                <option value={sortOptions.decreaseId}>Decreasing Id</option>
                            </Field>
                            <Button type="submit" disabled={isSubmitting}>Apply</Button>
                        </Form>)}
                </Formik>
            </Col>
        </Row>
        {!!users && users.map(user =>
            <Container key={user.id} className={styles.usersContainer}>
                <div className={styles.usersFilterFormColumn}>
                    <Row className={styles.customer} sm="auto" md="auto" lg="auto">
                        <Col className={`shadow p-3 mb-2 bg-light rounded ${styles.usersFilterGroup}`}>
                            <Col xs="4" md="auto" lg="auto">
                                <img src={defaultAvatarSrc} className={styles.images}
                                     alt={''}/>
                                <div
                                    className={styles.customerImageName}>{!!user.username ? user.username : `No user name`}</div>
                                <div className={styles.customerImageName}>id: {user.id}</div>
                            </Col>
                            <Col xs="auto" md="auto" lg="auto" className={styles.customerInfo}>
                                {!!user.first_name ? user.first_name : `No first name`} {!!user.last_name ? user.last_name : `No last name`}
                                <div className={!!user.is_active ? styles.active : styles.notActive}>
                                    <Icon.CircleFill size={20}
                                                     style={{'padding': '5px'}}/>{!!user.is_active ? 'Online' : 'Offline'}
                                </div>
                                <div>
                                    {!!user.is_superuser && <div className={styles.superUser}>Super user</div>}
                                </div>
                            </Col>
                        </Col>

                    </Row>
                </div>

            </Container>
        )}
    </div>

}

export default Users





