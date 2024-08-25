import { DbComment } from "@/types";
import { deleteComment } from "@/app/actions";
import { DeleteIcon } from "lucide-react";

interface CommentSectionProps {
  comments: DbComment[];
  hoveredComment: DbComment | null;
  setComments: React.Dispatch<React.SetStateAction<DbComment[]>>;
  setHoveredComment: React.Dispatch<React.SetStateAction<DbComment | null>>;
  scrollToMessage: (messageId: string) => void;
}

export default function CommentSection({
  comments,
  setComments,
  hoveredComment,
  setHoveredComment,
  scrollToMessage,
}: CommentSectionProps) {
  async function handleDeleteComment(commentId: string) {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (e: any) {
      alert(e.message);
    }
  }

  return (
    <div className="flex flex-col h-[720px] bg-white border border-gray-300 rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.map((comment, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg shadow-sm transition duration-200 ${
              hoveredComment?.id === comment.id ? 'bg-blue-100' : 'bg-gray-100'
            }`}
            onMouseEnter={() => setHoveredComment(comment)}
            onMouseLeave={() => setHoveredComment(null)}
            onClick={() => scrollToMessage(comment.message_id)}
          >
            <div className="font-semibold text-blue-800 mb-2">
              {comment.user_fullname}
            </div>
            <div className="mb-2">
              <span className="font-bold text-gray-700">Highlighted:</span>{" "}
              {comment.highlighted_message}
            </div>
            <div className="text-gray-800">
              <span className="font-bold text-gray-700">Comment:</span>{" "}
              {comment.comment}
            </div>
            <div className="flex flex-row-reverse">
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <DeleteIcon size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
