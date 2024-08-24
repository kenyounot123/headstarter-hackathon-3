import { Comment } from "@/types";
interface CommentSectionProps {
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
}
export default function CommentSection({comments, setComments}:CommentSectionProps) {
  // Sample dummy comments
  const dummyComments: Comment[] = [
    {
      id: "1",
      transcript_id: '1',
      user_id: 'Alice',
      comment: 'Great point on increasing sales during the holiday season!',
      transcript_text: 'Increase sales during the holiday season',
    },
    {
      id: "2",
      transcript_id: '2',
      user_id: 'Alice',
      comment: 'Great point on increasing sales during the holiday season!',
      transcript_text: 'Increase sales during the holiday season',
    },
    {
      id: "3",
      transcript_id: '3',
      user_id: 'Alice',
      comment: 'Great point on increasing sales during the holiday season!',
      transcript_text: 'Increase sales during the holiday season',
    },
  ];
  

  return (
    <div className="flex flex-col h-[720px] bg-white border border-gray-300 rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {dummyComments.map((comment, index) => (
          <div key={index} className="p-4 rounded-lg shadow-sm bg-gray-100">
            <div className="font-semibold text-blue-800 mb-2">{comment.user_id}</div>
            <div className="mb-2">
              <span className="font-bold text-gray-700">Highlighted:</span> {comment.transcript_text}
            </div>
            <div className="text-gray-800">
              <span className="font-bold text-gray-700">Comment:</span> {comment.comment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}