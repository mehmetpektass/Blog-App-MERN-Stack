import { Button, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCart from "../Components/PostCart";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getPost?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        setLoading(false);
        const data = await res.json();
        setPosts(data.posts);
        if (data.posts.length >= 9) {
          setShowMore(true);
        }else{
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowMore(false);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleChange = async (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }
    if (e.target.id === "sort") {
      setSidebarData({
        ...sidebarData,
        sort: e.target.value,
      });
    }
    if (e.target.id === "category") {
      setSidebarData({
        ...sidebarData,
        category: e.target.value,
      });
    }
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getpost?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length >= 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
    setShowMore(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between ">
            <label className="whitespace-nowrap font-semibold mr-4">
              Search Term:
            </label>
            <TextInput
              className="ml-auto w-[140px]"
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold">Sort:</label>
            <Select
              className="ml-auto"
              onChange={handleChange}
              value={sidebarData.sort}
              id="sort"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <label className="font-semibold">Category:</label>
            <Select
              className="ml-auto"
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value="">All</option>
              <option value="Web Development">Web Development</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Technology Trends">Technology Trends</option>
              <option value="Travel & Adventure">Travel & Adventure</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Blockchain Technology">
                Blockchain Technology
              </option>
              <option value=" Remote Work-Digital Nomadism">
                Remote Work-Digital Nomadism
              </option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Post results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCart key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
