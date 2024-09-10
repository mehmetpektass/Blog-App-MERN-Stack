import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

const Comment = ({ comment, onLike, onEdit }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTheUser = async () => {
      try {
        const res = await fetch(`/api/user/getusers?_id=${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data.users[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTheUser();
  }, [comment]);

  const handleEdit = async () => {
    await onEdit(comment._id, editedContent);
    setIsEditing(false);
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="h-10 w-10 rounded-full"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <p className="font-bold mr-1 text-xs truncate">@{user.username}</p>
          <span className="text-gray-500 text-xs break-words whitespace-pre-wrap">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              onChange={(e) => setEditedContent(e.target.value)}
              className="mb-2 p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 text-gray-700 placeholder-gray-400 shadow-sm"
              value={editedContent}
            />
            <div className="flex justify-end gap-1 text-xs">
              <Button
                onClick={() => handleEdit()}
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2 mt-2">{comment.content}</p>
            <div className="flex items-center text-xs gap-2 pt-2 border-t dark:border-gray-700 max-w-fit">
              <button
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p>
                {comment.numberOfLikes > 0 &&
                  `${comment.numberOfLikes}
                  ${comment.numberOfLikes === 1 ? "Like" : "Likes"}`}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    Edit
                  </Button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
