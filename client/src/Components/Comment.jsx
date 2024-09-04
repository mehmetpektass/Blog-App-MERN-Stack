import React, { useEffect, useState } from "react";
import moment from 'moment'

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});

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
          <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className="text-gray-500 pb-2 mt-2">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
