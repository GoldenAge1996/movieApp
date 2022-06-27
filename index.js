const imgPath = 'https://image.tmdb.org/t/p/w500/'

const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_bypopularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'


const searchApi = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'


const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

getmovie(APIURL)

async function getmovie(url){
    const res = await fetch(url)

    const data = await res.json()

   createdata(data.results)
   console.log(data.results)
}

function createdata(movies){
    main.innerHTML = ''

movies.forEach(movie => {
    const {poster_path, title, vote_average, overview, release_date} = movie
    const movieEl = document.createElement("div")
    movieEl.classList.add("movie")

    movieEl.innerHTML = `
    <img src="${imgPath + poster_path }" alt="">

    <div class="info">
        <h3>${title}</h3>
        <span class="${getcolor(vote_average)}">${vote_average}</span>
    </div>

    <div class="overview">
        <h3>Overview</h3>
        ${overview}.
        <h3>Released date</h3>
       it was released on ${release_date}.
    </div>
    `

    main.appendChild(movieEl)
});

}

form.addEventListener("submit", (e)=>{
    e.preventDefault()

    const searching = search.value
if(searching && searching !== ''){
    getmovie(searchApi + searching)

    search.value = ''
}else{
    window.location.reload()
}
})



function getcolor(vote){
    if(vote >= 8){
        return 'green'
    } else if(vote >=5){
        return 'orange'
    }else{
        return 'red'
    }
}
