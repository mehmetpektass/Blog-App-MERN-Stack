import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../Components/CallToAction";
import CommentSection from "../Components/CommentSection";
import PostCart from "../Components/PostCart";
const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/post/getpost?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setloading(false);
          setError(true);
          return;
        } else {
          setPost(data.posts[0]);
          setError(false);
          setloading(false);
        }
      } catch (error) {
        setError(error);
        setloading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchedPosts = async () => {
      try {
        const res = await fetch('/api/post/getpost?limit=3');
        if (res.ok) {
          const data = await res.json();
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchedPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 250).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content mb-16"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      {post && <CommentSection postId={post._id} />}
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent Articles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recentPosts &&
            recentPosts.map((post) => <PostCart key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
};

export default PostPage;
