const API_KEY = "68e58da903332d1f8a42343d6b372812";
const API_BASE = "https://api.themoviedb.org/3";

/*
Uma consulta para cada:
  - originais da netflix
  - recomendados / destaqueas
  -  os mais votados / em alta { top Rated}
  -  ação
  - comédia
  - terror
  - romance
  - documentarios
 */
const basicFetch = async (endpoint) =>{ // fetch encontrar erro...
    const req = await fetch(`${API_BASE}${endpoint}`); // await - esperar a resposta.
    const json = await req.json();
    return json;
}

/* poderia ser uma function comum? */


export default {
    getHomeList: async () =>{
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você', 
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with-genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'topreated',
                title: 'em alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'comedy',
                title: 'Comedia',
                 items: await basicFetch(`/discover/movie?with-genres=35&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'horror',
                title: 'Terror',
                 items: await basicFetch(`/discover/movie?with-genres=27&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'romance',
                title: 'Romance',
                 items: await basicFetch(`/discover/movie?with-genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },

            {
                slug: 'documentary',
                title: 'Documentário',
                items: await basicFetch(`/discover/movie?with-genres=99&language=pt-BR&api_key=${API_KEY}`)
            }
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId){
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;

                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break; 
                
                default:
                    info = null;
                break;
            }   
        }
        return info;
    }
}