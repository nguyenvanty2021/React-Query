import {
  useAddSuperHeroesData,
  useSuperHeroes,
  useSuperHeroesByID,
  useSuperHeroesPaginationV2,
  useSuperHeroesTask,
  useSuperHeroesV3,
  useSuperMan,
  useSuperWoman,
} from "../hooks/useSuperHeroes";
import React, { useState } from "react";

export const RQSuperManPage = () => {
  const {
    isLoading: isLoadingTask,
    data: dataTask,
    isError: isErrorTask,
    error: errorTask,
    isFetching: isFetchTask,
    refetch: refetchTask,
  } = useSuperHeroesTask();
  // POST DATA
  const {
    mutate: addSomething,
    isLoading: isLoadingMutate,
    isError: isErrorAdd,
    isSuccess,
    error: errorAdd,
  } = useAddSuperHeroesData();
  if (isLoadingTask || isLoadingMutate) {
    return <h2>Loading...</h2>;
  }
  if (isErrorTask || isErrorAdd) {
    return (
      <h2>
        {errorTask.message} {errorAdd.message}
      </h2>
    );
  }
  console.log(dataTask);
  // lần đầu cả isLoading và isFetching đều = true
  // ở những lần sau isLoading luôn = false và isFetching có thể = true và = false khi data trên server của api này có sự thay đổi
  // hoặc khi click qua tab khác rồi click lại tab này mà tab này hiện đang ở menu call api = react-query -> chi tiết đã giải thích ở trên
  const handleAdd = () => {
    addSomething({
      title: dataTask?.data?.length
        ? `title ${dataTask.data.length + 1}`
        : "title 55",
      description: "description 44",
      status: false,
      id: "44",
    });
  };
  return (
    <>
      {isSuccess ? <div>Todo added!</div> : null}
      <button onClick={handleAdd}>Add Data</button>

      {dataTask?.data?.map((hero, index) => {
        return <div key={index}>{hero.title}</div>;
      })}

      {/* nếu còn page (khác undefine) thì button vẫn còn click page+1 dc, nếu page cuối (= undefine) thì disable button này đi */}
      {/* <div>
        {isFetchingPagination && !isFetchingNextPage ? "Fetching..." : null}
      </div> */}
    </>
  );
};
