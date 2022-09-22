// Get the searh form element
let searchForm = document.getElementById("searchForm");
// Get the input element with the search term
let searchTerm = document.querySelector(".searchTerm");

// div to put the search results in
let animeBlock = document.querySelector(".animeBlock");

// div to show top anime
let topBlock = document.querySelector(".top");

// Perform action when the submit buttom is pressed on search form
searchForm.addEventListener("submit", function(e){
    e.preventDefault();
    // send fetch request with the search term entered
    fetch("https://api.jikan.moe/v3/search/anime?q="+encodeURI(searchTerm.value), {method: "GET"}).then(data =>
        data.json()).then(data => {
            // The API returns a JSON array containing the search results for the anime

            // This searchResults variable will store the final HTML string that we will insert in the animeBlock div
            let searchResults = "";

            // We loop through the array and append (Concatinate) each anime into the searchResults variable
            data.results.map((anime) => {
                searchResults += '<div class="anime"> <img src="'+anime.image_url+'" alt="'+anime.title+'"> <div class="info"> <h3 class="animeTitle">'+anime.title+'</h3> <h4>Episodes: <span class="episodes">'+anime.episodes+'</span></h4> <h4>Score: <span class="score">'+anime.score+'</span></h4> <h4>Synopsis:</h4> <p class="synopsis">'+anime.synopsis+'</p> </div> </div>'
            });

            // The final string is then inserted into the animeBlock div
            animeBlock.innerHTML = searchResults;
        });
});

function displayTopAnime(){
    fetch("https://api.jikan.moe/v3/top/anime/1/airing", {method: "GET"}).then(data =>
    // This returns an array of the top 50 animes airing currently
        data.json()).then(data => {

            // This topResults variable will store the final HTML string that we will insert in the topBlock div
            let topResults = "";

            // We loop through the array and append (Concatinate) each anime into the topResults variable
            data.top.map((anime, idx) => {
                topResults += '<h2>'+(idx+1)+'.</h2><div class="anime"> <img src="'+anime.image_url+'" alt="'+anime.title+'"> <div class="info"> <h3 class="animeTitle">'+anime.title+'</h3> <h4>Episodes: <span class="episodes">'+anime.episodes+'</span></h4> <h4>Score: <span class="score">'+anime.score+'</span></h4> </div> </div>'
            });

            // The final string is then inserted into the topBlock div
            topBlock.innerHTML += topResults;
        });
}

displayTopAnime();