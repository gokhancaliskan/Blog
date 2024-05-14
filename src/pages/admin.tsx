// pages/admin.tsx
import { useState, useEffect } from "react";

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [title, setTitle] = useState("");
  const [main, setMain] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then(setPosts);
  }, []);

  const startEdit = (post: any) => {
    setEditingPost(post);
    setTitle(post.title);
    setMain(post.main);
    setCategory(post.category);
    setImage(post.image);
    setContent(post.content);
  };

  const submitHandler = async (event: any) => {
    event.preventDefault();

    const url = editingPost
      ? `/api/posts/${(editingPost as any)._id}`
      : "/api/posts";
    const method = editingPost ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: JSON.stringify({
        title,
        main,
        category,
        image,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setEditingPost(null);
    setTitle("");
    setMain("");
    setCategory("");
    setImage("");
    setContent("");
  };
  console.log(main);
  const deletePost = async (id: string) => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts(
      posts.filter(
        (post: { _id: string }) => post._id !== id
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <p className="text-blue-500 font-semibold">
        Menü Ürünler
      </p>
      <form
        onSubmit={submitHandler}
        className="mt-4 bg-white shadow-md rounded-lg p-4"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ürün adı"
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />

        <select
          value={main}
          onChange={(e) => setMain(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        >
          <option value="a">Seçiniz</option>
          <option value="drink">İçecek</option>
          <option value="food">Yemek</option>
          <option value="gift">Hediyelik</option>
        </select>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Kategori"
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Resim Link"
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Açıklama"
          className="w-full p-2 border border-gray-300 rounded mt-2 h-40"
          required
        ></textarea>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          KAYDET
        </button>
      </form>
      <ul className="mt-6">
        {posts.map(
          (post: { _id: string; title: string }) => (
            <li
              key={post._id}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow-sm mt-2"
            >
              <span className="font-medium">
                {post.title}
              </span>
              <div>
                <button
                  onClick={() => startEdit(post)}
                  className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePost(post._id)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default AdminPage;
