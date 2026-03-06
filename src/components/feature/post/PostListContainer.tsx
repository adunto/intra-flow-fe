import PostList from "./PostList";
import PostListHeader from "./PostListHeader";

const PostListContainer = () => {

  return (
    <div className="h-full mt-14 w-7xl md:mx-20 mx-5 flex flex-col justify-center items-center">
      {/* 검색창 & 카테고리 & 정렬 */}
      <PostListHeader />

      <PostList />
    </div>
  );
};

export default PostListContainer;
