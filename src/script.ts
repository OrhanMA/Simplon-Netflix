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
    console.log(typeof `${list[i].poster_path}`, `${list[i].poster_path}`);

    const card = document.querySelector(target) as HTMLDivElement;

    if (list[i].poster_path === null) {
      console.log(image.url);
      const backTitle = document.createElement("p") as HTMLParagraphElement;
      backTitle.textContent = `${list[i].title}`;
      backTitle.classList.add(
        "text-center",
        "max-w-[160px]",
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
      imageDisplay.classList.add("object-contain", "max-w-[160px]");
      if (i % 2 === 0) {
        imageDisplay.classList.add("snap-center");
      }
      imageDisplay.setAttribute("movieID", `${list[i].id}`);
      card.appendChild(imageDisplay);
      imageDisplay.addEventListener("click", () => {
        alert(`You clicked movie id: ${list[i].id}`);
      });
    }
  }
}
