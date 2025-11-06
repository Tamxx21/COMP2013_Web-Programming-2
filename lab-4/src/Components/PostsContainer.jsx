import PostCard from "./PostCard";

export default function PostsContainer({ posts }) {
  return (
    <div>
      {posts.map((p) => (
        <PostCard key={p.id} title={p.title} body={p.body} />
      ))}
    </div>
  );
}
