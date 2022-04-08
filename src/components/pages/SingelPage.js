import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner"

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams()
    const [data, setData] = useState(null)
    const {error , loading , getCharacter, getComic, clearError} = useMarvelService()

    useEffect(() => {
        clearError()

        updateData()
    }, [id])

    const updateData = () => {
        switch(dataType) {
            case 'comic' :
                getComic(id).then(res => setData(res));
                break;
            case 'character' :
                getCharacter(id).then(res => setData(res));
                break;
            default: return null
        }
    }

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !data) ? <Component data={data}/> : null

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage