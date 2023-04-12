import { log } from "console";
import { env } from "process";

const searchCard = document.querySelector(".search-card") as HTMLDivElement;
const baseUrl: string = `https://api.themoviedb.org/3/`;

interface ListPopular {
  title: string;
  id: number;
  release_date: string;
  overview: string;
  original_language: string;
  poster_path: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}

async function logList(urlPath, urlRestPath, elementTarget) {
  const response = await fetch(
    `${baseUrl}${urlPath}${process.env.API_KEY}${urlRestPath}`
  );
  const jsonData = await response.json();
  const list: ListPopular[] = jsonData.results;
  // console.log(list);

  fetchImage(list, elementTarget);
}

logList(
  "discover/movie?api_key=",
  "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate",
  ".card"
);

// logTrendingToday();
logList("trending/all/day?api_key=", "", ".card-2");

logList("movie/top_rated?api_key=", "&language=en-US&page=1", ".card-3");

logList("movie/upcoming?api_key=", "&language=en-US&page=1", ".card-4");

const searchButton = document.querySelector(
  "#searchButton"
) as HTMLButtonElement;

function startSearch() {
  const input = document.querySelector("#searchInput") as HTMLInputElement;
  const popup = document.querySelector(".popup") as HTMLDivElement;
  const searchInfo = document.querySelector(
    ".searchInfo"
  ) as HTMLHeadingElement;
  searchInfo.textContent = input.value;
  popup.classList.remove("hidden");
  popup.classList.add("flex");
  logList(
    "search/movie?api_key=",
    `&language=en-US&query=${input.value}&page=1&include_adult=false`,
    ".search-card"
  );
  input.value = "";
  while (searchCard.hasChildNodes()) {
    searchCard.removeChild(searchCard.firstChild);
  }
}
searchButton.addEventListener("click", () => {
  startSearch();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    startSearch();
  } else {
  }
});

async function fetchImage(list, target) {
  for (let i = 0; i < list.length; i++) {
    const response = await fetch(
      `https://image.tmdb.org/t/p/original${list[i].poster_path}`
    );
    /*     console.log(list[i].poster_path); */
    // console.log(`https://image.tmdb.org/t/p/w500${list[i].poster_path}`);

    const image = await response;
    // console.log(image);
    // console.log(typeof `${list[i].poster_path}`, `${list[i].poster_path}`);

    const card = document.querySelector(target) as HTMLDivElement;

    if (list[i].poster_path === null) {
      console.log(image.url);
      const backTitle = document.createElement("p") as HTMLParagraphElement;
      backTitle.textContent = `${list[i].title}`;
      backTitle.classList.add(
        "text-center",
        "max-w-[160px]",
        "sm:w-1/2",
        "md:w-1/3",
        "lg:w-1/4",
        "text-3xl",
        "flex",
        "items-center",
        "justify-center",
        "px-2"
      );
      card.appendChild(backTitle);
    } else {
      const imageDisplay = document.createElement("img") as HTMLImageElement;
      imageDisplay.src = image.url;
      imageDisplay.classList.add(
        "object-contain",
        "max-w-[160px]",
        "sm:w-1/2",
        "md:w-1/3",
        "lg:w-1/4"
      );
      if (i % 2 === 0) {
        imageDisplay.classList.add("snap-center");
      }
      imageDisplay.setAttribute("movieID", `${list[i].id}`);
      card.appendChild(imageDisplay);
      imageDisplay.addEventListener("click", () => {
        console.log(list[i]);
        displayDetails(list[i]);
      });
    }
  }
}
const popup = document.querySelector(".popup") as HTMLDivElement;
const closeSearch = document.querySelector(
  ".close-search"
) as HTMLButtonElement;
closeSearch.addEventListener("click", () => {
  popup.classList.remove("flex");
  popup.classList.add("hidden");
});

const movieDetails = document.querySelector(".movie-details") as HTMLDivElement;
const movieTitle = document.querySelector(".movie-title") as HTMLHeadingElement;
const movieOverview = document.querySelector(
  ".movie-overview"
) as HTMLParagraphElement;
const originalLanguage = document.querySelector(
  ".original-language"
) as HTMLParagraphElement;
const rating = document.querySelector(".rating") as HTMLParagraphElement;
const voteCount = document.querySelector(".vote-count") as HTMLParagraphElement;

async function displayDetails(movie) {
  if (movieDetails.classList.contains("hidden")) {
    movieDetails.classList.remove("hidden");
    movieDetails.classList.add("flex");
  }
  if (movie.title) {
    movieTitle.textContent = movie.title;
  } else {
    movieTitle.textContent = movie.name;
  }

  rating.textContent = `${Math.round(movie.vote_average)}/10`;
  movieOverview.textContent = movie.overview;
  originalLanguage.textContent = `Language: ${movie.original_language.toUpperCase()}`;

  voteCount.textContent = `Total votes: ${movie.vote_count}`;
  if (movie.vote_count === 0) {
    rating.textContent = "N/A";
  }
  const response = await fetch(
    `https://image.tmdb.org/t/p/original${movie.poster_path}`
  );
  const image = await response;
  const poster = document.querySelector(".movie-poster") as HTMLImageElement;
  poster.src = image.url;
  poster.setAttribute("movieID", `${movie.id}`);
  poster.classList.add("max-w-[200px]", "sm:max-w-[250px]");
}

const closeDetailsBtn = document.querySelector(
  ".close-details-btn"
) as HTMLButtonElement;
closeDetailsBtn.addEventListener("click", () => {
  movieDetails.classList.remove("flex");
  movieDetails.classList.add("hidden");
});
