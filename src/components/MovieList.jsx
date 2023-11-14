import React, { useEffect, useState } from 'react'
import MovieItemCard from './MovieItemCard';

export default function MovieList() {
    const [data,setData] = useState({results:[],page:1})

    useEffect(()=>{
      loadData(1)
    },[])
  
    function loadData(page){
      const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page='+ page +'&sort_by=popularity.desc';
      const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzlkYzlhMjA2MzdmZjY0YWIwOGQ3MmU4NzZkZTM4MCIsInN1YiI6IjY1NTMyMDY4NjdiNjEzNDVjY2FkZTEyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W6wWg8vfXcNCyX7GebqtFEAo_0iHk31Eqf5pWaT8sJ0'
          }
        };
  
        fetch(url, options)
          .then(res => res.json())
          .then(json => {
            setData(json)
          })
          .catch(err => console.error('error:' + err)); 
    }
  
  
    return (
      <div className="App">  
           <button className='load-next' onClick={()=>loadData(data.page+1)}>Load Next</button>
           <hr/>
           {
            data?.results?.map(item=><MovieItemCard key={item.id} movieData={item}></MovieItemCard>)
           }
      </div>
    );
}
