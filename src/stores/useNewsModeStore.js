import { without } from "ramda";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useNewsModeStore = create(
  persist(
    (set) => ({
      newsData: [],
      newsSource: "bbc-news",
      favorites: [],

      setNewsSource: (newsSource) => set({ newsSource }),
      setNewsData: (newsData) => set({ newsData }),

      toggleFavorite: (article) =>
        set(({ favorites }) => {
          const isFavorite = favorites.some(
            (favoriteArticle) => favoriteArticle.url === article.url
          );
          if (isFavorite) {
            return { favorites: without([article], favorites) };
          }

          return { favorites: [...favorites, { ...article, note: "" }] };
        }),
      setFavoriteNote: (articleUrl, note) => {
        set(({ favorites }) => {
          const updatedFavorites = favorites.map((favorite) =>
            favorite.url === articleUrl ? { ...favorite, note } : favorite
          );

          return { favorites: updatedFavorites };
        });
      },
    }),
    {
      name: "news-mode-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useNewsModeStore;
