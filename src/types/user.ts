export type UserRole = "USER" | "ADMIN";

//   // --- 작성한 게시물 ---
//   @OneToMany(() => Post, (post) => post.user)
//   posts: Post[];

//   // --- 작성한 댓글 ---
//   @OneToMany(() => Comment, (comment) => comment.user)
//   comments: Comment[];

//   // --- 좋아요 ---
//   @OneToMany(() => Like, (like) => like.user)
//   likes: Like[];
// }

export interface User {
  id: number;
  email: string;
  password?: string;
  username: string;
  role: UserRole;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
