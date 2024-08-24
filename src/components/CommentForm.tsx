import React, { useState } from 'react';
import { Button } from './ui/button';
import { Comment } from '@/types';
interface CommentFormProps {
  onCancel: () => void;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

function CommentForm({ onCancel, comments, setComments }: CommentFormProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission save comments using setComments and save in db as well.
    setComment('');
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    onCancel()
    setComment('')
  }

  return (
    <div className="absolute bg-white p-4 border rounded shadow-lg">
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
          rows={4}
          className="w-full p-2 border border-gray-300 rounded"
          style={{zIndex: 99999}}
        />
        <div className="mt-2 flex justify-end">
          <Button
            type="submit"
            className="mr-2"
          >
            Add Comment
          </Button>
          <Button
            type="button"
            variant={'outline'}
            className='text-primary hover:text-primary'
            onClick={(e) => handleCancel(e)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;