import UserComments from "@/components/feature/user/info/UserComments";
import UserPosts from "@/components/feature/user/info/UserPosts";
import UserSummaryCard from "@/components/feature/user/info/UserSummaryCard";

const UserInfoPage = () => {

  return (
    <div className="mt-16 w-full h-auto flex flex-col gap-4 items-center">
      {/* 사용자 정보 요약 카드 */}
      <UserSummaryCard />
      {/* 사용자 작성한 게시글 & 댓글 리스트 */}
      <UserPosts />
      <UserComments />
    </div>
  );
};

export default UserInfoPage;
