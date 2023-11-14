import moment from 'moment/moment';
import React from 'react'
import { Link } from 'react-router-dom';

export default function MovieItemCard({ movieData }) {

    function getTrimmedText() {
        if (movieData?.title && movieData?.title?.length > 15) {
            return movieData?.title?.substr(0, 15) + "..."
        }
        return movieData?.title
    }

    function getFormattedDate() {
        if (!movieData?.release_date) {
            return ""
        }
        let dateObj = new Date(movieData?.release_date);
        return moment(dateObj).format("MMM DD, YYYY")

    }

    return (
        <Link to={'/movie/' + movieData.id}>
            <div className='movie-item-card'>
                <img src={'https://image.tmdb.org/t/p/original' + movieData?.poster_path} />
                <h3 title={movieData.title}>{getTrimmedText()}</h3>
                <p>{getFormattedDate()}</p>
            </div>
        </Link>
    )
}
