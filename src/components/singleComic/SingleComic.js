import { useState, useEffect } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import useMarvelService from '../../services/MarvelService';

import './singleComic.scss';

const SingleComic = (props) => {

    const [comics, setComics] = useState({})
    const {loading, error, getComics} = useMarvelService()

    useEffect(() => {
        onRequest(props.id)
    },[])

    const onRequest = (id) => {
        getComics(id)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (comics) => {
        setComics(comics)
    }

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !comics) ? <View comics={comics}/> : null

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({comics}) => {
    const {title, description, price, pageCount, thumbnail, language} = comics

    return (
        <>
            <img src={thumbnail} alt="thumbnail" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <a href="#" className="single-comic__back">Back to all</a>
        </>
    )
}

export default SingleComic;