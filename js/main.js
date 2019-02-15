
const wholeSeries = "https://api.themoviedb.org/3/tv/2316-the-office?api_key=ec6b96f04a4a808c5b1d5668e190c03c&language=pt-BR"
const urlCrew = `https://api.themoviedb.org/3/tv/2316-the-office/credits?api_key=ec6b96f04a4a808c5b1d5668e190c03c&language=pt-BR`
const urlSeasons = `https://api.themoviedb.org/3/tv/2316-the-office?api_key=ec6b96f04a4a808c5b1d5668e190c03c&/`

// home page
fetch(wholeSeries)
  .then(res => res.json())
  .then(json => homePage(json))

function homePage(json){
  const whereToAdd = document.querySelector('.row')
  let infos = json
    let whatToAdd = 
      `<div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">${infos.name}<span class="text-muted"></span></h2>
          <h3>${infos.vote_average}</h3>
          <p class="lead">${infos.overview}</p>
          <p>Primeira exibição: ${infos.first_air_date}</p>
        </div>
        <div class="col-md-5">
          <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" src="http://image.tmdb.org/t/p/w185/${infos.poster_path}">
        </div>
      </div> `
  whereToAdd.insertAdjacentHTML('beforeend', whatToAdd)
 
  // search
  let check = new RegExp(`\d?`)
  let inferno = document.getElementById('find')

  inferno.addEventListener('keyup', () => {
    const numberValue = document.querySelector('input#find').value

    if (check.test(numberValue) == true) {
      inferno.value = ''
      seta = document.querySelector('.row')
      season_number = numberValue
      urlGetEpisodes = `https://api.themoviedb.org/3/tv/2316/season/${infos.seasons.season_number = numberValue}?api_key=ec6b96f04a4a808c5b1d5668e190c03c&language=en-US`

      seta.innerHTML = ''
      fetch(urlGetEpisodes)
        .then(res => res.json())
        .then(json => showEpisodes(json, seta))
    }

    else {
      const erro = `<div class="alert alert-warning" role="alert">
      Episódios Indisponíveis
      </div>`
      inferno.value = erro
      inferno.insertAdjacentHTML('beforeend', whatToAdd)
    }

  })
}

const getSeasons = document.querySelectorAll('#seasons')
const getDetails = document.querySelectorAll('#details')
const getExtras = document.querySelectorAll('#extras')

for (let button of getDetails){
  button.addEventListener('click', e =>{
    fetch(urlCrew)
    .then(res => res.json())
    .then(json => showCrew(json))
    })  
  }

function showCrew(json){
  let crew = json.cast
  const addCrew = document.querySelector('.row')
  document.querySelector('.row').innerHTML = ''
  
  for (let character of crew){
    let whatToAdd = 
    `<div class="col-lg-4" id="first">

        <img class="bd-placeholder-img rounded-circle" width="140" height="140" src='http://image.tmdb.org/t/p/w185/${character.profile_path}'>
        <h2>${character.character}</h2>
        <p>${character.name}</p>

        <p><a class="btn btn-secondary" href="${`https://www.themoviedb.org/person/${character.id}?language=pt-BR`}" target="blank" role="button">View details &raquo;</a></p>
    
      </div><!-- /.col-lg-4 -->`

    addCrew.insertAdjacentHTML('beforeend', whatToAdd)
  }
}

for (let buttonSeason of getSeasons){
  buttonSeason.addEventListener('click', e => {
    fetch(urlSeasons)
    .then(res => res.json())
    .then(json => showSeasons(json))
  })
}

function showSeasons(json){
  document.querySelector('.row').innerHTML = ''
  let seasons = json.seasons
  const addSeasons = document.querySelector('.row')

  for (let season of seasons){
    let whatToAdd = 
    `<div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">${season.name}<span class="text-muted"></span></h2>
        <p class="lead">${season.overview}</p>
      </div>
      <div class="col-md-5">
        <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" src='http://image.tmdb.org/t/p/w185/${season.poster_path}'>
      </div>
      <h3 class="lead">Episódios</h3><i class="fas fa-angle-down"></i>
    </div>`

    if (season.name != "Specials") {
      addSeasons.insertAdjacentHTML('beforeend', whatToAdd)
      
      let seta = addSeasons.lastChild.querySelector('h3')
      let icon = document.lastChild.querySelector('i')
      seta.addEventListener('click', () => {
        const urlGetEpisodes = `https://api.themoviedb.org/3/tv/2316/season/${season.season_number}?api_key=ec6b96f04a4a808c5b1d5668e190c03c&language=en-US`     
         
        fetch(urlGetEpisodes)
          .then(res => res.json())
          .then(json => showEpisodes(json, seta))

      })

      icon.addEventListener('click', () => {
        seta.innerHTML = '<h3 class="lead">Episódios</h3>'
      })
    }
  }
}



function showEpisodes(json, seta){
  let episodes = json.episodes
  for (let episode of episodes){
    let whatToAdd = `<div>
    <h2>${episode.episode_number}: ${episode.name}</h2>
    <h5>Review: ${episode.vote_average}</h5>
    <p>${episode.overview}</p>
    </div>`
    seta.insertAdjacentHTML('beforeend', whatToAdd)
  }
}
