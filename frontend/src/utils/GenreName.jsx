const genres = [
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 37,
    name: "Western",
  },
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const genreBackdrops = {
  Action: "https://image.tmdb.org/t/p/w500/gqrnQA6Xppdl8vIb2eJc58VC1tW.jpg", // Mad Max: Fury Road
  Adventure: "https://image.tmdb.org/t/p/w500/z51Wzj94hvAIsWfknifKTqKJRwp.jpg", // The Lord of the Rings
  Animation: "https://image.tmdb.org/t/p/w500/rjs5IfIv6Psl2YCSHKcluhTQGjJ.jpg", // Your Name
  Comedy: "https://image.tmdb.org/t/p/w500/u8m7yZos0NNBHnJE00PixgYK2yz.jpg", // The Grand Budapest Hotel
  Crime: "https://image.tmdb.org/t/p/w500/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg", // The Godfather
  Documentary:
    "https://image.tmdb.org/t/p/w500/5CaqqeXowmR5Q2SUwusYgQrCqAP.jpg", // Free Solo
  Drama: "https://image.tmdb.org/t/p/w500/v8xVDqt8uCul3c3mgx4VpGCwxJC.jpg", // The Shawshank Redemption
  Family: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg", // Toy Story
  Fantasy: "https://image.tmdb.org/t/p/w500/j6771XXKKwZmWwchGe5A7RNLKsP.jpg", // Harry Potter and the Sorcerer's Stone
  History: "https://image.tmdb.org/t/p/w500/w2ezhZUk7ZJH9Mdk1Y6CTmaDRg5.jpg", // Schindler's List
  Horror: "https://image.tmdb.org/t/p/w500/x1vmewr9K7sXOvwhntlUoorf12k.jpg", // The Shining
  Music: "https://image.tmdb.org/t/p/w500/3HP0SHxbSk5PmQy1SwDLZG5I5GI.jpg", // Sing Street
  Mystery: "https://image.tmdb.org/t/p/w500/x9ezMgOtDPqHatHDvxEG0ILb6Ie.jpg", // Gone Girl
  Romance: "https://image.tmdb.org/t/p/w500/j0Ce4AsZi34NKYUZr61lh0PBQ7G.jpg", // The Notebook
  "Science Fiction":
    "https://image.tmdb.org/t/p/w500/gQ2x01q8ivOB5Cki5PjhdzCLlk1.jpg", // Interstellar
  "TV Movie": "https://image.tmdb.org/t/p/w500/hHDq22Un3FNe1npKSbIU0T4Cpmi.jpg", // High School Musical
  Thriller: "https://image.tmdb.org/t/p/w500/iwgl8zlrrfvfWp9k9Paj8lvFEvS.jpg", // Seven
  War: "https://image.tmdb.org/t/p/w500/xBwtP27cx8WfjHJVFkpuV6F1RES.jpg", // All Quiet on Western Front
  Western: "https://image.tmdb.org/t/p/w500/5Lbm0gpFDRAPIV1Cth6ln9iL1ou.jpg", // Django Unchained
  "Action & Adventure":
    "https://image.tmdb.org/t/p/w500/qd4ZFoQWqEi3GJEpv6uVqLSd6tE.jpg", // Pirates of the Caribbean
  Kids: "https://image.tmdb.org/t/p/w500/pDMndR1yj7WHZmLTwzLxMu16xxD.jpg", // Finding Nemo
};

const genreValue = new Map(
  genres.map((genre) => [
    genre.id,
    {
      name: genre.name,
      backdrop: genreBackdrops[genre.name] || null,
    },
  ])
);

const genreMap = Array.from(genreValue, ([id, value]) => ({
  id,
  name: value.name,
  backdrop: value.backdrop,
}));

export default genreMap;
