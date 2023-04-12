import { log } from "console";
import { env } from "process";
console.log(process.env.API_KEY);

const baseUrl: string = `https://api.themoviedb.org/3/`;

interface ListPopular {
  title: string;
  id: number;
  release_date: string;
  overview: string;
  original_language: string;
  poster_path: string;
}

async function logPopular() {
  const response = await fetch(
    `${baseUrl}discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
  );
  const jsonData = await response.json();
  const list: ListPopular[] = jsonData.results;
  console.log(list);

  fetchImage(list, ".card");
}

logPopular();

async function logTrendingToday() {
  const response = await fetch(
    `${baseUrl}trending/all/day?api_key=${process.env.API_KEY}`
  );
  const jsonData = await response.json();
  const list: ListPopular[] = jsonData.results;
  console.log(list);

  // console.log(list[0]);
  // console.log(list[0].title);
  fetchImage(list, ".card-2");
}
logTrendingToday();

async function fetchImage(list, target) {
  for (let i = 0; i < list.length; i++) {
    const response = await fetch(
      `https://image.tmdb.org/t/p/original${list[i].poster_path}`
    );
    /*     console.log(list[i].poster_path); */
    console.log(`https://image.tmdb.org/t/p/w500${list[i].poster_path}`);

    const image = await response;
    console.log(image);
    const imageDisplay = document.createElement("img") as HTMLImageElement;
    imageDisplay.classList.add("object-contain", "max-w-[160px]");
    imageDisplay.setAttribute("movieID", `${list[i].id}`);
    const card = document.querySelector(target) as HTMLDivElement;
    imageDisplay.src = image.url;
    card.appendChild(imageDisplay);
    imageDisplay.addEventListener("click", () => {
      alert(`You clicked movie id: ${list[i].id}`);
      displayModal(list[i]);
    });
  }
}

function displayModal(list) {}
