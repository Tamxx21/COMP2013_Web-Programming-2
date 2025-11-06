export default function PostForm({ newPost, handleOnChange, handleOnSubmit }) {
  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="title">Title: </label>
            <input type="text" name="title" id="title" value={newPost.title} onChange={handleOnChange} />
            <br />
            <label htmlFor="body">Body: </label>
            <input type="text" name="body" id="body" value={newPost.body} onChange={handleOnChange} />
            <br />
      <button type="submit">Add Post</button>
    </form>
  );
}
