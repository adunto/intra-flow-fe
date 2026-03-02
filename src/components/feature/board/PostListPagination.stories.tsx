import type { Meta, StoryObj } from "@storybook/react";
import PostListPagination from "./PostListPagination";

const meta: Meta<typeof PostListPagination> = {
  title: "Components/Feature/Board/PostListPagination",
  component: PostListPagination,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    total: { 
      control: { type: "number", min: 1 },
      description: "전체 게시물 수" 
    },
    page: { 
      control: { type: "number", min: 1 },
      description: "현재 페이지 번호" 
    },
    lastPage: { 
      control: { type: "number", min: 1 },
      description: "마지막 페이지 번호" 
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostListPagination>;

/**
 * 사용자 요청: 총 5개 페이지를 가진 페이지네이션
 */
export const FivePages: Story = {
  args: {
    total: 50,
    page: 1,
    lastPage: 5,
  },
};

export const MiddlePage: Story = {
  args: {
    total: 50,
    page: 3,
    lastPage: 5,
  },
};

export const LastPage: Story = {
  args: {
    total: 50,
    page: 5,
    lastPage: 5,
  },
};

export const MultiGroup: Story = {
  args: {
    total: 250,
    page: 10,
    lastPage: 25,
  },
};

export const NextGroup: Story = {
  args: {
    total: 250,
    page: 11,
    lastPage: 25,
  },
};

export const Default: Story = {
  args: {
    total: 100,
    page: 1,
    lastPage: 10,
  },
};
