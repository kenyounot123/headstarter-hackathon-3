"use server";

import { Comment } from "@/types";
import { auth } from "@clerk/nextjs/server";

console.log(process.env.AWS_URL);

export async function createComment(comment: Comment) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Not authenticated");
  }
  comment.user_id = userId;

  const response = await fetch(`${process.env.AWS_URL!}/items`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  console.log(JSON.stringify(comment));
  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to create comment");
  }
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getComments() {
  const response = await fetch(`${process.env.AWS_URL!}/items`);
  if (!response.ok) {
    throw new Error("Failed to get comments");
  }
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getComment(id: string) {
  const response = await fetch(`${process.env.AWS_URL!}/items/${id}`);
  if (!response.ok) {
    throw new Error("Failed to get comment");
  }
  const data = await response.json();
  console.log(data);
  return data;
}

export async function deleteComment(id: string) {
  const response = await fetch(`${process.env.AWS_URL!}/items/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }
  const data = await response.json();
  console.log(data);
  return data;
}
