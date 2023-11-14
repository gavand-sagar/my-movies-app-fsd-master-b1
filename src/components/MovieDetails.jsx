import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';

export default function MovieDetails() {
    const [movieData, setMovieData] = useState({})
    const [noRecord, setNoRecord] = useState(false);
    const [isLoading,setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/movie/' + id + '?language=en-US';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzlkYzlhMjA2MzdmZjY0YWIwOGQ3MmU4NzZkZTM4MCIsInN1YiI6IjY1NTMyMDY4NjdiNjEzNDVjY2FkZTEyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6wWg8vfXcNCyX7GebqtFEAo_0iHk31Eqf5pWaT8sJ0'
            }
        };

        setLoading(true)
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                if(json.success == false){
                    setNoRecord(true)
                }
                else{
                    setNoRecord(false)
                }
                if (json) {
                    setMovieData(json);
                }
            })
            .catch(err => { console.error('error:' + err); console.log("catch") })
            .finally(()=>{
                setLoading(false)
            });
            
    }, [])

    function getFormattedReleaseDate() {
        if (!movieData?.release_date) {
            return ""
        }
        let dateObj = new Date(movieData?.release_date);
        return moment(dateObj).format("MMM DD, YYYY")

    }
    function getGenres() {
        if (!movieData.genres) {
            return ""
        }
        return movieData.genres.map(x => x.name).join(", ")
    }
    function getDuration() {
        if(!movieData.runtime){
            return "NA"
        }

        let hours = parseInt(Number(movieData.runtime) / 60);

        let remaining = parseInt(Number(movieData.runtime) - (hours * 60))

        return `${hours}h ${remaining}m`
    }
    return (
        <div className='movie-details-container'>
            {
                isLoading? <><Spinner/></>:
                (noRecord == true ?
                    <h1>No recod found!!!</h1> :
                    <>
                        <div className='left'>
                            <img src={'https://image.tmdb.org/t/p/original' + movieData?.poster_path} />
                        </div>
                        <div className='right'>
                            <h2>{movieData.title}</h2>
                            <div className='basic-details'>
                                <span>{getFormattedReleaseDate()}</span>
                                <span>{getGenres()}</span>
                                <span>{getDuration()}</span>
                            </div>
                            <h4>Overview</h4>
                            <p>{movieData.overview}</p>
                        </div>
                    </>)
            }

        </div>
    )
}
