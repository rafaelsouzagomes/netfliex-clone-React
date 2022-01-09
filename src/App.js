import React, { useEffect, useState }  from 'react';
import tmdb from './tmdb';
import css from './App.css'
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/header';

export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] =  useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect (()=>{
    const loadAll = async () => { 
      // pegar a lista dos filmeOlaste
    let list  = await tmdb.getHomeList();
    //console.log(list);
    await setMovieList(list);

    let originals = list.filter(i=>i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length-1));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
    await setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);
  
  useEffect (()=>{
    const scrollListener = () =>{
      if(window.scrollY > 10){ 
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
    
    return () =>{
      window.removeEventListener('scroll', scrollListener);
    }
    
    },[]);

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} > </FeaturedMovie> } 
      <section className="lists">
        {movieList.map((item,key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        feito com <span role="img" aria-label="coracao"> x</span>
      </footer>
    </div>
  );
}