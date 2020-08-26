const ul = document.getElementById("Action");

const appDiv = document.getElementById("app");

// const ul = document.getElementById("Action");

function loadaction() {
  fetch("https://api.jikan.moe/v3/genre/anime/27")
    .then((res) => res.json())
    .then((data) => {
      const animeDivs = document.createElement("div"); //Hold on to anime (display infromation)
      data.anime
        .sort((a, b) => a.episodes - b.episodes)
        .map((anime) => {
          const entry = document.createElement("div");
          entry.classList.add("object"); // a collection of divs
          entry.innerHTML = `<div class="name">
               <img src="${anime.image_url}">
               </div>
                 <div class="bio">
                     <h1>${anime.title}</h1>
                 <p>${anime.synopsis}</p>`;
          animeDivs.appendChild(entry);
        });
      appDiv.appendChild(animeDivs);
    })
    .catch((err) => {
      console.warn(err.message);
    });
}

ul.addEventListener("click", loadaction);
