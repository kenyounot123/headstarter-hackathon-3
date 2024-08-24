"use client";

/*  TO REMOVE IN PROD   */

import {
  createComment,
  getComments,
  getComment,
  deleteComment,
} from "@/app/actions";
import { Comment } from "@/types";
import { Button } from "@/components/ui/button";

export default function Test() {
  return (
    <>
      <Button
        onClick={async () => {
          const comment: Comment = {
            id: "1",
            user_id: "1",
            transcript_id: "1",
            transcript_text: "test",
            comment: "test",
          };
          await createComment({ comment });
        }}
      >
        Create Comment
      </Button>

      <Button
        onClick={async () => {
          await getComments();
        }}
      >
        Get Comments
      </Button>

      <Button
        onClick={async () => {
          await getComment({ id: "1" });
        }}
      >
        Get Comment
      </Button>

      <Button
        onClick={async () => {
          await deleteComment({ id: "1" });
        }}
      >
        Delete Comment
      </Button>
    </>
  );
}
