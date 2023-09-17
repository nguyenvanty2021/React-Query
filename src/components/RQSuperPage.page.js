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

export const RQSuperPage = () => {
  const [pageTemp, setPageTemp] = useState(0);

  // const onSuccess = (data) => {
  //   console.log("onsuccess: ", data);
  // };
  // const onError = (error) => {
  //   console.log("onerror: ", error);
  // };
  // GET
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroes(pageTemp, pageTemp + 1);

  // POST DATA
  const {
    mutate: addSomething,
    isLoading: isLoadingMutate,
    isError: isErrorAdd,
    isSuccess,
    error: errorAdd,
  } = useAddSuperHeroesData();

  // if (isLoading || isFetching) {
  if (isLoading || isLoadingMutate) {
    return <h2>Loading...</h2>;
  }
  if (isError || isErrorAdd) {
    return (
      <h2>
        {error.message}

        {errorAdd.message}
      </h2>
    );
  }

  return (
    <>
      <h1>GET</h1>
      <h1>Data List 1</h1>
      {data?.data?.users.map((hero, index) => {
        return <div key={index}>{hero.email}</div>;
      })}

      <button onClick={() => setPageTemp(pageTemp - 1)}>
        Page Previous (Now {pageTemp})
      </button>
      <button onClick={() => setPageTemp(pageTemp + 1)}>
        Page Next (Now {pageTemp})
      </button>
    </>
  );
};
