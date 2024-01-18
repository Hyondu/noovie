const API_KEY = "73648b04446aadaca64513cb2ce3ebf5";
const BASE_URL = "https://api.themoviedb.org/3";

export const moviesAPI = {
  nowPlaying: () =>
    fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1&region=KR&api_key=${API_KEY}`).then(
      (res) => res.json()
    ),
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) => res.json()),
  upcoming: ({ pageParam = 1 }) =>
    fetch(`${BASE_URL}/movie/upcoming?&api_key=${API_KEY}&page=${pageParam}`).then((res) =>
      res.json()
    ),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`).then((res) =>
      res.json()
    );
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};

export const tvAPI = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((res) => res.json()),
  airingToday: () =>
    fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((res) => res.json()),
  topRated: () => fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((res) => res.json()),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`).then((res) =>
      res.json()
    );
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images`).then(
      (res) => res.json()
    );
  },
};
