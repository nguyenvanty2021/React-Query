import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import axios from "axios";
import { request } from "../utils/axios-utils";
// GET
const fetchSuperHeroes = () => {
  // await axios.post(`/api/posts/${id}`)
  // return axios.get("https://61d3e3feb4c10c001712bb0a.mockapi.io/orders");
  return request({ url: "/task" });
};
// GET
export const useSuperHeroes = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // cacheTime: Infinity,
    // refetchOnWindowFocus: false,
    // staleTime: Infinity,
    //cacheTime: 5000, // nếu dùng thuộc tính này thì sau 5s nó sẽ clear cache đi, nghĩa là lúc này khi click qua menu khác chờ 5s rồi click qua menu chứa call api = react-query thì nó sẽ call lại api mới và xuất loading ra -> mặc định thì nó sẽ luôn lưu lại cache và không clear đi -> cũng không nên dùng thuộc tính cacheTime này làm gì cả
    //staleTime: 30000, // nếu dùng thuộc tính này thì sau 30000 = 30s mới cho phép fetch lại data khi có data mới trên server hoặc khi user click qua menu khác click lại menu có call api = react-query thì mới fetch -> dưới 30s thì data luôn là data ở lần fetch đầu tiên và luôn như vậy -> cũng không nên dùng thuộc tính staleTime này làm gì cả
    // vì lý do ở dòng 17 nên luôn để mặc định staleTime là 0 -> mặc dù default = 0 rồi nhưng vẫn cứ để, để sau có cần thay đổi gì thì dùng
    staleTime: 0,
    //refetchOnMount: true // = true fetch data với trường hợp như bình thường (chuyển menu, chuyển tab, khi có data mới), còn = false thì sẽ không fetch lại data luôn (dữ liệu luôn là dữ liệu cũ), = 'always' thì luôn fetch lại data (nếu luôn fetch lại data thì khác gì không dùng react-query đâu) -> mặc định là = true
    //refetchOnWindowFocus: true // mặc định là = true, khi click sang tab google click lại tab product này thì call lại api, còn nếu = false thì không call lại api hay nói cách khác là không fetch lại data
    //refetchInterval: 2000, // mặc định là = false, nhưng nếu mình thay vào số 2000 thì nghĩa là cứ mỗi 2s sẽ call lại hay fetch lại api 1 lần
    //enabled: true // mặc định là = true, nếu để = false nó sẽ không call api luôn. Sau đó muốn có data phải kết hợp với function 'refetch' bỏ function này vào onClick để fetch ra data -> thường dùng cho trường hợp POST, PATCH, PUT, DELETE -> mà cũng không cần thiết nữa vì react-query nó tự fetch lại data khi có data mới rồi
    onSuccess,
    onError,
    // refactor data api trước khi lấy
    // select: (data) => {
    //   const arrayRefactor = data && data?.data.length > 0 && data?.data.map((values) => values?.CustomerName === 'CustomerName 1')
    //   return arrayRefactor;
    // }
  });
};
// GET BY ID
const fetchSuperHeroesByID = (id) => {
  return axios.get(`https://61879efe057b9b00177f9a22.mockapi.io/task/${id}`);
};
// GET BY ID
export const useSuperHeroesByID = (id) => {
  return useQuery(["super-hero", id], () => fetchSuperHeroesByID(id));
};
// GET PAGINATION
export const useSuperHeroesPagination = (page) => {
  return useQuery(
    ["super-hero", page],
    () => fetchSuperHeroesPagination(page),
    {
      keepPreviousData: true, // trong lúc chờ pagination sang trang 2 thì UI vẫn hiện data của trang 1 chứ không hiện loading như thông thường
    }
  );
};
const fetchSuperHeroesPagination = (page) => {
  return axios.get(
    `https://61d3e3feb4c10c001712bb0a.mockapi.io/orders?_limit=28_page=${page}}`
  );
};
// GET
const fetchSuperHeroesV33 = ({ pageParam = 0 }) => {
  return axios.get(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${pageParam}&limit=5`
  );
};
// GET
export const useSuperHeroesV3 = () => {
  return useQuery("super-hero-v3", () => fetchSuperHeroesV33());
};
// getAllPagination linh động hơn
export const useSuperHeroesPaginationV2 = () => {
  return useInfiniteQuery({
    queryKey: "super-hero-v3",
    queryFn: fetchSuperHeroesV33,
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      if (lastPage?.data?.users?.length < lastPage?.data?.total_users) {
        return lastPage?.data?.offset + 1;
      }
      return undefined;
    },
    // trong đây mình sẽ xử lý các trường hợp click page: VD: +1, +10+ page cuối, page đầu
  });
};
// POST
const addSuperHeroes = (hero) => {
  //return axios.post('https://61d3e3feb4c10c001712bb0a.mockapi.io/orders', hero)
  return request({ url: "/task", method: "post", data: hero });
};
// POST DATA
export const useAddSuperHeroesData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHeroes, {
    // retry: 3, // useMutation cũng có có retry luôn
    onSuccess: (data) => {
      // khi add thành công nó tự call lại api getAll dựa vào key 'super-heroes' để quyết định call lại api getAll nào
      // cách 1:
      //queryClient.invalidateQueries('super-heroes')
      // cách 2:
      // queryClient.setQueriesData('super-heroes', (oldQueryData) => {
      //   return {
      //     ...oldQueryData,
      //     data: [...oldQueryData.data, data.data]
      //   }
      // })
    },
    // cách 3 dùng cách này có thể refactor data
    onMutate: async (obj) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueriesData("super-heroes");
      console.log(previousHeroData);
      queryClient.setQueriesData("super-heroes", (oldQueryData) => {
        console.log(oldQueryData);
        console.log(obj);
        obj.status = true;
        oldQueryData.data = oldQueryData.data.push(obj);
        return {
          ...oldQueryData,
        };
      });
      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueriesData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      // chắc chắn vào đây
      return queryClient.invalidateQueries("super-heroes");
    },
  });
};
