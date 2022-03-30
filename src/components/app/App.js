import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

import decoration from '../../resources/img/vision.png';
import comicsAvengers from '../../resources/img/Avengers.png'
import comicsLogo from '../../resources/img/Avengers_logo.png'

import './App.scss'

const App = () => {

    const [selectedChar, setChar] = useState(null)

    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}

                <div className="promo-comics">
                    <img src={comicsAvengers} alt="Avengers" />
                    <span className="promo-comics__description">New comics every week!<br/>Stay tuned!</span>
                    <img src={comicsLogo} alt="Avengers" />
                </div>
                <ErrorBoundary>
                    {/* <ComicsList/> */}
                    <SingleComic id={8000}/>
                </ErrorBoundary>
            </main>
        </div>
    )
}

export default App;