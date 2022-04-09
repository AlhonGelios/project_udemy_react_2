import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from "yup";

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import useMarvelService from '../../services/MarvelService';

import './searchPanel.scss'

const setContent = (process, Component, data) => {
    switch(process) {
        case 'waiting':
            return null
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return <Component data={data}/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected process state')
    }
}

const SearchPanel = () => {

    const [char, setChar] = useState(null)
    const {getCharacterByName, clearError, process, setProcess} = useMarvelService()

    const updateChar = (name) => {
        clearError()
        getCharacterByName(name)
            .then(res => setChar(res))
            .then(() => setProcess('confirmed'))
    }

    return (
        <Formik
            initialValues = {{
                name: '',
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                        .required('This field is required')
            })}
            onSubmit = {({name}) => updateChar(name)}>
            <Form className="char__search">
                <div className="char__search-title">Or find a character by name:</div>
                <Field name='name' className='char__search-input' type="text" placeholder="Enter name"/>
                <button type="submit" disabled={process === 'loading'} className="button button__main">
                    <div className="inner">Find</div>
                </button>
                <FormikErrorMessage className="error" name="name" component="div"/>

                {setContent(process, Response, char)}
            </Form>
        </Formik>
    )
}

const Response = ({data}) => {
    return (
        <>
            {
                !data ? null : data.length > 0 ?
                <div className='char__search-response'>
                    <div className="error" style={{color: 'green'}}>There is! Visit {data[0].name} page?</div>
                    <Link to={`/character/${data[0].id}`} className = "button button__secondary">
                        <div className="inner">To page</div>
                    </Link>
                </div> :
                <div className="error">
                    The character was not found. Check the name and try again
                </div>
            }
        </>
    )
}

export default SearchPanel