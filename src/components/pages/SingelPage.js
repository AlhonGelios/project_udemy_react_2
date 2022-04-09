import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";

import AppBanner from "../appBanner/AppBanner"
import setContent from "../../utils/setContent";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams()
    const [data, setData] = useState(null)
    const {getCharacter, getComic, clearError, process ,setProcess} = useMarvelService()

    useEffect(() => {
        clearError()
        updateData()
    }, [id])

    const updateData = () => {
        switch(dataType) {
            case 'comic' :
                getComic(id)
                    .then(onLoaded)
                    .then(() => setProcess('confirmed'))
                break
            case 'character' :
                getCharacter(id)
                    .then(onLoaded)
                    .then(() => setProcess('confirmed'))
                break
            default: throw new Error('Unenxepted type page')
        }
    }

    const onLoaded = (data) => {
        setData(data)
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage