import BoardHeader from "./BoardHeader";
import PostList from "./PostList";



const Board = () => {

  // 검색 핸들러

  return (
    <div className="h-full mt-14 w-7xl md:mx-20 mx-5 flex flex-col justify-center items-center">
      {/* 검색창 & 카테고리 & 정렬 */}
      <BoardHeader />
      
      <PostList />
    </div>
  );
};

export default Board;
