import React, { useState } from "react";
import { Button } from "./ui/button";
import { Comment } from "@/types";
import { createComment } from "@/app/actions";
import { randomb64 } from "@/lib/utils";

interface CommentFormProps {
  onCancel: () => void;
  comments: Comment[];
  highlightedText: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

function CommentForm({
  onCancel,
  comments,
  highlightedText,
  setComments,
}: CommentFormProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //   console.log({
    //     id: randomb64(),
    //     user_id: "1", // to be replaced with actual user id in createComment function
    //     transcript_id: "1",
    //     transcript_text: highlightedText,
    //     comment: comment,

    //   }
    // )
    const newComment: Comment = {
      id: randomb64(),
      user_id: "1", // to be replaced with actual user id in createComment function
      transcript_id: "1",
      transcript_text: highlightedText,
      comment: comment,
    }

    try {
      await createComment(newComment);
      // Handle form submission save comments using setComments and save in db as well.
    } catch (e: any) {
      alert(e.message)
    }

    setComment("");
    setComments([...comments, {
      id: randomb64(),
      user_id: "You",
      transcript_id: "1",
      transcript_text: highlightedText,
      comment: comment,
    }
    ]);
  };


  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    onCancel();
    setComment("");
  };

  return (
    <div className="absolute bg-white p-4 border rounded shadow-lg">
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
          rows={4}
          className="w-full p-2 border border-gray-300 rounded"
          style={{ zIndex: 99999 }}
        />
        <div className="mt-2 flex justify-end">
          <Button type="submit" className="mr-2">
            Add Comment
          </Button>
          <Button
            type="button"
            variant={"outline"}
            className="text-primary hover:text-primary"
            onClick={(e) => handleCancel(e)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
