import { log } from "console";
import { env } from "process";

const searchCard = document.querySelector(".search-card") as HTMLDivElement;
const baseUrl: string = `https://api.themoviedb.org/3/`;
const pagination = document.querySelector(".pagination") as HTMLDivElement;
const searchButton = document.querySelector(
  "#searchButton"
) as HTMLButtonElement;
const displayTotalPages = document.querySelector(
  ".totalPages"
) as HTMLParagraphElement;
const displayCurrentPage = document.querySelector(
  ".currentPage"
) as HTMLParagraphElement;
const previousButton = document.querySelector(".previous") as HTMLButtonElement;
const nextButton = document.querySelector(".next") as HTMLButtonElement;
let currentPage: number = 1;
let totalPages: number = 0;

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
  totalPages = jsonData.total_pages;
  // console.log(jsonData);
  displayCurrentPage.textContent = `Page ${currentPage}`;
  displayTotalPages.textContent = `Total pages: ${totalPages}`;
  // console.log(`There is ${totalPages} pages for that result`);
  // console.log(currentPage);

  fetchImage(list, elementTarget);
}

previousButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayCurrentPage.textContent = `Page ${currentPage}`;
    while (searchCard.hasChildNodes()) {
      searchCard.removeChild(searchCard.firstChild);
    }
    logList(
      "search/movie?api_key=",
      `&language=en-US&query=${currentInput}&page=${currentPage}&include_adult=false`,
      ".search-card"
    );
  } else {
    alert("You're already on page 1");
  }
});
nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentPage < totalPages) {
    currentPage++;
    // console.log("clicked");

    // console.log(currentPage);

    displayCurrentPage.textContent = `Page ${currentPage}`;
    // console.log(currentInput);
    while (searchCard.hasChildNodes()) {
      searchCard.removeChild(searchCard.firstChild);
    }
    logList(
      "search/movie?api_key=",
      `&language=en-US&query=${currentInput}&page=${currentPage}&include_adult=false`,
      ".search-card"
    );
  } else {
    alert("You're already on the last page");
  }
});

logList(
  "discover/movie?api_key=",
  "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate",
  ".card"
);

logList("trending/all/day?api_key=", "", ".card-2");

logList("movie/top_rated?api_key=", "&language=en-US&page=1", ".card-3");

logList("movie/upcoming?api_key=", "&language=en-US&page=1", ".card-4");
let currentInput: string = "";
function startSearch(page) {
  const input = document.querySelector("#searchInput") as HTMLInputElement;
  const popup = document.querySelector(".popup") as HTMLDivElement;
  const searchInfo = document.querySelector(
    ".searchInfo"
  ) as HTMLHeadingElement;
  searchInfo.textContent = input.value;
  currentInput = input.value;
  popup.classList.remove("hidden");
  popup.classList.add("flex");
  logList(
    "search/movie?api_key=",
    `&language=en-US&query=${input.value}&page=${page}&include_adult=false`,
    ".search-card"
  );
  input.value = "";
  if (searchCard) {
    while (searchCard.hasChildNodes()) {
      searchCard.removeChild(searchCard.firstChild);
    }
  }
}
searchButton.addEventListener("click", () => {
  currentPage = 1;
  displayCurrentPage.textContent = `${currentPage}`;
  startSearch(currentPage);
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    currentPage = 1;
    displayCurrentPage.textContent = `${currentPage}`;
    startSearch(currentPage);
  } else {
  }
});

async function fetchImage(list, target) {
  const card = document.querySelector(target) as HTMLDivElement;
  for (let i = 0; i < list.length; i++) {
    // console.log(list[i].id);
    if (list[i].poster_path !== null) {
      try {
        const response = await fetch(
          `https://image.tmdb.org/t/p/w154${list[i].poster_path}`
        );
        const image = await response;
        // console.log(image);
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
          displayDetails(list[i]);
          const recommendations = document.querySelector(
            ".recommendation"
          ) as HTMLDivElement;
          while (recommendations.hasChildNodes()) {
            recommendations.removeChild(recommendations.firstChild);
          }
          displayRecommendations(list[i].id);
        });
      } catch (error) {
        // console.error(error);
      }
    } else {
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
      backTitle.addEventListener("click", () => {
        displayDetails(list[i]);
        const recommendations: HTMLDivElement = document.querySelector(
          ".recommendation"
        ) as HTMLDivElement;
        while (recommendations.hasChildNodes()) {
          recommendations.removeChild(recommendations.firstChild);
        }
        displayRecommendations(list[i].id);
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
  const recommendationText = document.querySelector(
    ".recommendationText"
  ) as HTMLDivElement;
  if (movie.title === undefined) {
    recommendationText.textContent = `Recommendations based on that movie`;
  } else {
    recommendationText.textContent = `Recommendations based on ${movie.title}`;
  }
}

async function displayRecommendations(movieID) {
  try {
    const response = await fetch(
      `${baseUrl}movie/${movieID}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );
    const list = await response.json();
    const recommendations: ListPopular[] = list.results;
    console.log(recommendations);
    fetchImage(recommendations, ".recommendation");
  } catch (error) {
    console.log(error);
  }
}
const closeDetailsBtn = document.querySelector(
  ".close-details-btn"
) as HTMLButtonElement;
closeDetailsBtn.addEventListener("click", () => {
  movieDetails.classList.remove("flex");
  movieDetails.classList.add("hidden");
});

const netflix = document.querySelector(".netflix") as HTMLParagraphElement;
netflix.addEventListener("click", () => {
  location.reload();
});
