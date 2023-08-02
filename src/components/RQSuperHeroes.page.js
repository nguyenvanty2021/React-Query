import {
  useAddSuperHeroesData,
  useSuperHeroes,
  useSuperHeroesByID,
  useSuperHeroesPaginationV2,
  useSuperHeroesV3,
  useSuperMan,
  useSuperWoman,
} from "../hooks/useSuperHeroes";
import React, { useState } from "react";

export const RQSuperHeroesPage = () => {
  const [pageTemp, setPageTemp] = useState(0);
  // pagination linh động hơn
  const {
    hasNextPage,
    fetchNextPage,
    isFetching: isFetchingPagination,
    isFetchingNextPage,
  } = useSuperHeroesPaginationV2("1");
  // const onSuccess = (data) => {
  //   console.log("onsuccess: ", data);
  // };
  // const onError = (error) => {
  //   console.log("onerror: ", error);
  // };
  // GET
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroes(pageTemp, pageTemp + 1);
  const {
    isLoading: isLoadingV3,
    data: dataV3,
    isError: isErrorV3,
    error: errorV3,
  } = useSuperHeroesV3();
  // GET BY ID
  const {
    isLoading: isLoadingById,
    data: dataById,
    isError: isErrorById,
    error: errorById,
  } = useSuperHeroesByID("1");
  // POST DATA
  const {
    mutate: addSomething,
    isLoading: isLoadingMutate,
    isError: isErrorAdd,
    isSuccess,
    error: errorAdd,
  } = useAddSuperHeroesData();
  const handleAdd = () => {
    addSomething({
      title: "title 44",
      description: "description 44",
      status: false,
      id: "44",
    });
  };
  // if (isLoading || isFetching) {
  if (
    isLoading ||
    isLoadingV3 ||
    isLoadingById ||
    isLoadingMutate ||
    (isFetchingPagination && !isFetchingNextPage)
  ) {
    return <h2>Loading...</h2>;
  }
  if (isError || isErrorV3 || isErrorById || isErrorAdd) {
    return (
      <h2>
        {errorById.message}
        {errorV3?.message}
        {error.message}
        {errorAdd.message}
      </h2>
    );
  }
  console.log(data);
  // lần đầu cả isLoading và isFetching đều = true
  // ở những lần sau isLoading luôn = false và isFetching có thể = true và = false khi data trên server của api này có sự thay đổi
  // hoặc khi click qua tab khác rồi click lại tab này mà tab này hiện đang ở menu call api = react-query -> chi tiết đã giải thích ở trên
  console.log({ isLoading, isFetching });
  const listTotal = dataV3?.pages?.reduce((acc, page) => {
    return [...acc, ...page?.data?.users];
  }, []);
  return (
    <>
      <h2>Super Heroes Page</h2>
      {isSuccess ? <div>Todo added!</div> : null}
      <h1>GET</h1>
      <h1>Data List 1</h1>
      {data?.data?.users.map((hero, index) => {
        return <div key={index}>{hero.email}</div>;
      })}
      <button onClick={refetch}>Fetch API</button>
      <button onClick={() => setPageTemp(pageTemp + 1)}>
        Page Next (Now {pageTemp})
      </button>
      <button onClick={handleAdd}>Add Data</button>
      <h1>GET BY ID</h1>
      <div>{dataById?.data?.title}</div>
      {/* nếu còn page (khác undefine) thì button vẫn còn click page+1 dc, nếu page cuối (= undefine) thì disable button này đi */}
      {/* <div>
        {isFetchingPagination && !isFetchingNextPage ? "Fetching..." : null}
      </div> */}
      <h1>Data List 2</h1>
      {listTotal.map((hero, index) => {
        return <div key={index}>{hero.email}</div>;
      })}
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        Load more
      </button>
    </>
  );
};
