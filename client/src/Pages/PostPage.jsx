import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

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

  return;
  <div>
    PostPage
    {error && <p>{error}</p>}
  </div>;
};

export default PostPage;
