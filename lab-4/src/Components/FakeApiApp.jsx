import { useState, useEffect } from "react";
import PostsContainer from "./PostsContainer";
import PostForm from "./PostForm";

export default function FakeApiApp() {
  const URL = "https://jsonplaceholder.typicode.com/posts";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch(URL);
    const posts = await response.json();
    setData(posts);
    setLoading(false);
  };

  const handleOnChange = (e) => {
    setNewPost((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

const handleOnSubmit = (e) => {
  e.preventDefault();
  setData((prevData) => [newPost, ...prevData]);
  setNewPost({
    title: "",
    body: "",
  });
};

  return (
    <div>
      <h1>Fake API App</h1>

      {loading && <h2>Loading...</h2>}

      <PostForm
        newPost={newPost}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
      />

      {!loading && <PostsContainer posts={data} />}
    </div>
  );
}
