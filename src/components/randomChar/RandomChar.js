import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState({})
    const {getCharacter, clearError, process, setProcess} = useMarvelService()

    useEffect(() => {
        updateChar()
        const timerId = setInterval(updateChar, 100000);

        return () => {
            clearInterval(timerId)
        }
    }, [])

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const View = ({data}) => {

    const {name, description, thumbnail, homepage, wiki} = data

    const transformDescr = (description) => {
        if (!description) {
            return 'description not found'
        }

        if (description && description.length > 200) {
            return description.slice(0, 200) + '...'
        }

        return description
    }

    const transformThumbnail = (thumbnail) => {
        const clazz = "randomchar__img"

        if (thumbnail && thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            return `${clazz} ${clazz}_notFound`
        } return clazz
    }

    return (

        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={transformThumbnail(thumbnail)}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{transformDescr(description)}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar