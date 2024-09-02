const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const API_LINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9b651cd0e17486ddac72638d575b0a56&page=1";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=9b651cd0e17486ddac72638d575b0a56&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("search");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};

function returnMovie(url) {
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        main.innerHTML = "";  // Clear existing content

        data.results.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');
            
            const image = document.createElement('img');
            image.setAttribute('class', 'small-image');
            image.setAttribute('id', 'image');
            image.src = IMG_PATH + element.poster_path;
            
            const title = document.createElement('h3');
            title.setAttribute('id', 'title');
            title.textContent = element.title;
            
            const center = document.createElement('center');
            center.appendChild(image);

            div_card.appendChild(center);
            div_card.appendChild(title);
            main.appendChild(div_card);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}

form.addEventListener("Submit", (e) => {
    e.preventDefault();
    const searchItem = search.value.trim();
    if (searchItem) {
        returnMovie(SEARCHAPI + encodeURIComponent(searchItem));
        search.value = '';
    }
});

returnMovie(API_LINK);
