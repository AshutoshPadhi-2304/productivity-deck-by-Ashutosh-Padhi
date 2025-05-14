import newsApi from "apis/news";
import { QUERY_KEYS } from "components/constants";
import { useQuery } from "react-query";

export const useFetchNews = (params) =>
  useQuery({
    queryKey: [QUERY_KEYS.NEWS, params],
    queryFn: () => newsApi.fetch(params),
    keepPreviousData: true,
  });
