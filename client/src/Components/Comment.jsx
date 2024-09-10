import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Modal, Textarea } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [showModal, setShowModal] = useState(false);
  const [deletedComment, setDeletedComment] = useState(null);
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

  const handleEdit = () => {
    onEdit(comment._id, editedContent);
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
            {moment(comment.updatedAt).fromNow()}
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
                disabled={editedContent.length === 0}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(comment.content);
                }}
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
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="w-14 h-8 flex items-center justify-center px-2 py-1 rounded border border-gray-400 
                                 text-gray-600 dark:text-gray-300 
                                 bg-white dark:bg-gray-800
                                 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-700 dark:hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(true);
                        setDeletedComment(comment._id);
                      }}
                      className="w-14 h-8 flex items-center justify-center px-2 py-1 rounded border border-gray-400 
                                text-gray-600 dark:text-gray-300 
                                bg-white dark:bg-gray-800
                                hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() =>{ onDelete(deletedComment); setShowModal(false)}}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Comment;
