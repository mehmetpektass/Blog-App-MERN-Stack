import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getPost?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser && currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <Table>
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
          </Table.Head>
          {userPosts.map((post) => (
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100" key={post._id}>
                <Table.Cell>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-20 h-10 object-cover bg-gray-500"
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className="font-medium text-gray-700 dark:text-white"
                    to={`/post/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
                <Table.Cell>
                  <p className="font-medium text-red-500 hover:underline cursor-pointer">
                    Delete
                  </p>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className="text-teal-400 hover:underline cursor-pointer"
                    to={`/updatePost/${post.slug}`}
                  >
                    <p>Edit</p>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
};
