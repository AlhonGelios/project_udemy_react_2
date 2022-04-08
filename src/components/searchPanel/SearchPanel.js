import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from "yup";

import ErrorMessage from '../errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';

import './searchPanel.scss'

const SearchPanel = () => {

    const [char, setChar] = useState(null)
    const {loading, error, getCharacterByName, clearError} = useMarvelService()

    const updateChar = (name) => {
        clearError()

        getCharacterByName(name).then(res => setChar(res))
    }

    const errorResult = error ? <div className="error">{<ErrorMessage/>}</div>: null

    const result = !char ? null : char.length > 0 ?
        <div className='char__search-response'>
            <div className="error" style={{color: 'green'}}>There is! Visit {char[0].name} page?</div>
            <Link to={`/character/${char[0].id}`} className = "button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className="error">
            The character was not found. Check the name and try again
        </div>

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
                <button type="submit" disabled={loading} className="button button__main">
                    <div className="inner">Find</div>
                </button>
                <FormikErrorMessage className="error" name="name" component="div"/>
                {errorResult}
                {result}
            </Form>
        </Formik>
    )
}

export default SearchPanel