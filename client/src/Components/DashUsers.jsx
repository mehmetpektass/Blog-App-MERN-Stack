import { Modal, Table, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setFetchedUsers(data.users);
          if (data.users.length >= 9) {
            setShowMore(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser && currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = fetchedUsers.length;
    const res = await fetch(
      `/api/user/getusers?userId=${currentUser._id}&startIndex=${startIndex}`
    );
    const data = await res.json();
    if (res.ok) {
      setFetchedUsers((prev) => [...prev, ...data.users]);
      if (data.users.length < 9) {
        setShowMore(false);
      }
    }
  };

  //   const handleDeletePost = async () => {
  //     setShowModal(false);

  //     try {
  //       const res = await fetch(
  //         `/api/post/deletePost/${postIdToDelete}/${currentUser._id}`,
  //         {
  //           method: "DELETE",
  //         }
  //       );

  //       const data = await res.json();
  //       if (!res.ok) {
  //         console.log(data.message);
  //       } else {
  //         setUserPosts((prev) =>
  //           prev.filter((post) => post._id !== postIdToDelete)
  //         );
  //       }
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && fetchedUsers.length > 0 ? (
        <Table>
          <Table.Head>
            <Table.HeadCell>Date Created</Table.HeadCell>
            <Table.HeadCell>User Image</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Admin</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {fetchedUsers.map((user) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100"
                key={user._id}
              >
                <Table.Cell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="w-32 h-16 object-cover bg-gray-500"
                  />
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  {user.isAdmin ? <FaCheck className="text-green-600" /> : <FaTimes className="text-red-800"/>}
                </Table.Cell>
                <Table.Cell>
                  <p
                    onClick={() => {
                      setShowModal(true);
                      setUserIdToDelete(user._id);
                    }}
                    className="font-medium text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </p>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>You have no posts yet!</p>
      )}
      {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-teal-400 self-center text-sm py-7"
        >
          Show More
        </button>
      )}
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
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure">Yes, I'm sure</Button>
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
