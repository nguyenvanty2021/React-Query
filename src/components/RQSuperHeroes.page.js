import { useAddSuperHeroesData, useSuperHeroes, useSuperHeroesByID, useSuperHeroesPaginationV2, useSuperMan, useSuperWoman } from "../hooks/useSuperHeroes";

export const RQSuperHeroesPage = () => {
  // trường hợp getAllById
  // const {id} = useParams();
  // const {isLoading, data, isError, error, isFetching, refetch} = useSuperHeroesByID(id)
  // pagination linh động hơn
  //const {hasNextPage, fetchNextPage, isFetching: isFetchingPagination, isFetchingNextPage} = useSuperHeroesPaginationV2()
  const onSuccess = (data) => {
    console.log('onsuccess: ', data)
  }
  const onError = (error) => {
    console.log('onerror: ', error)
  }
  // POST DATA
  const {mutate: addSomething, isError: isErrorAdd, error: errorAdd} = useAddSuperHeroesData();
  const handleAdd = () => {
    addSomething({CustomerName: "123"})
  }
  // call cùng lúc nhiều api
  const {data: superMan } = useSuperMan();
  const {data: superWoman } = useSuperWoman();
  //-----------------------
  // mặc định khi call api = react-query thì ở lần redirect hay link qua menu chứa call api = react-query đầu tiên nó sẽ hiện loading,
  // còn ở những lần redirect hay link qua menu này tiếp theo nếu data vẫn như cũ không có gì mới thì nó sẽ không hiện loading
  // và nó sẽ hiện ra data đã call trước đó luôn (không cần phải call lại api mặc dù data vẫn như cũ)
  // ngoài ra nếu data đã có cập nhật (có data mới) thì nó vẫn không hiện loading mà là 1s đầu hiện data cũ
  // sau đó nó lập tức hiện ra data mới liền -> tức là trong quá trình call api lấy data mới thì nó sẽ show ra data cũ trước
  // -> hay nói cách khác nó tự call lại api lấy data mới nhất nếu phát hiện data trên server có sự thay đổi (tăng hoặc giảm gì đó)
  // -> và ngoài ra nếu ta click qua tab google và click lại tab product mà tab product này đang ở menu call api = react-query thì nó sẽ tự động call lại api để lấy data mới nhất
  // Trường hợp api bị lỗi nó sẽ call lại 4 lần, nếu lần thứ 1 bị lỗi và đến lần thứ 4 vẫn bị lỗi thì nó mới show ra message error, còn nếu chỉ lần 1 bị lỗi mà lần 2, lần 3 hết lỗi thì nó vẫn show ra data bình thường
  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroes(onSuccess, onError);
  // if (isLoading || isFetching) {
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError || isErrorAdd) {
    return <h2>{error.message}{errorAdd.message}</h2>
  }
  // lần đầu cả isLoading và isFetching đều = true
  // ở những lần sau isLoading luôn = false và isFetching có thể = true và = false khi data trên server của api này có sự thay đổi
  // hoặc khi click qua tab khác rồi click lại tab này mà tab này hiện đang ở menu call api = react-query -> chi tiết đã giải thích ở trên
  console.log({isLoading, isFetching})
  return (
    <>
      <h2>Super Heroes Page</h2>
      <button onClick={handleAdd} >Add Data</button>
      <button onClick={refetch} >Fetch API</button>
      {/* data ban đầu */}
      {data?.data.map((hero,index) => {
        return <div key={index} >{hero.CustomerName}</div>;
      })}
      {/* nếu còn page (khác undefine) thì button vẫn còn click page+1 dc, nếu page cuối (= undefine) thì disable button này đi */}
      {/* <div>{isFetchingPagination && !isFetchingNextPage ? 'Fetching...' : null}</div>
      <button onClick={fetchNextPage} disabled={!hasNextPage} >Load more</button> */}
    </>
  );
};
