// pages/admin.tsx
import { useState, useEffect, ReactNode } from "react";

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [title, setTitle] = useState("");
  const [main, setMain] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [number, setNumber] = useState(0);

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then(setPosts);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const startEdit = (post: any) => {
    setEditingPost(post);
    setTitle(post.title);
    setMain(post.main);
    setCategory(post.category);
    setImage(post.image);
    setContent(post.content);
    setPrice(post.price);
    setNumber(post.number);
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
        price,
        number,
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
    setPrice("");
    setNumber(number);
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
        {" "}
        <p className="text-blue-500 font-bold ">Ürün Adı</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ürün adı"
          className="w-full p-2 border bg-base-100 rounded mt-2"
          required
        />
        <br />
        <p className="text-blue-500 font-bold ">
          Ürün Tipi
        </p>
        <select
          value={main}
          onChange={(e) => setMain(e.target.value)}
          className="select w-full p-2 border border-gray-300 rounded mt-2"
          required
        >
          <option value="a">Ürün Tipi Seçiniz</option>
          <option value="içecek">İçecek</option>
          <option value="yemek">Yemek</option>
          <option value="hediyelik">Hediyelik</option>
        </select>
        {main === "içecek" ? (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select w-full p-2 border border-gray-300 rounded mt-2"
            required
          >
            <option value="a">Kategori Seçiniz</option>
            <option value="çay">Çaylar</option>
            <option value="sıcakkahve">
              Sıcak Kahveler
            </option>
            <option value="sogukkahve">
              Soğuk Kahveler
            </option>
          </select>
        ) : main === "yemek" ? (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select w-full p-2 border border-gray-300 rounded mt-2"
            required
          >
            <option value="a">Kategori Seçiniz</option>
            <option value="kahvaltı">Kahvaltı</option>
            <option value="tavuk">Tavuk Yemekleri</option>
            <option value="aperatif">
              Atıştırmalıklar
            </option>
          </select>
        ) : null}
        <p className="text-blue-500 font-bold ">
          Resim Linki
        </p>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Resim Link"
          className="w-full p-2 border bg-base-100 rounded mt-2"
          required
        />
        <p className="text-blue-500 font-bold ">Açıklama</p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Açıklama"
          className="w-full p-2 border bg-base-100 rounded mt-2 h-40"
          required
        ></textarea>
        <p className="text-blue-500 font-bold ">Fiyat</p>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Fiyat"
          className="w-full p-2 border bg-base-100 rounded mt-2"
          required
        />
        <p className="text-blue-500 font-bold ">
          Sıra Numarası
        </p>
        <input
          type="number"
          value={number}
          onChange={(e) =>
            setNumber(parseInt(e.target.value))
          }
          className="w-full p-2 border bg-base-100 rounded mt-2"
          required
        />
        <button
          type="submit"
          className="mt-4 bg-base-100 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          KAYDET
        </button>
      </form>
      <div>
        <br />
        <label className="form-control w-full max-w-xs">
          <input
            type="text"
            placeholder="Ürün Ara"
            className="input input-bordered w-full max-w-xs"
            onChange={handleSearchChange}
          />
        </label>

        <ul className="mt-6">
          {posts
            .filter(
              (post: {
                _id: string;
                title: string;
                category: string;
              }) =>
                post.category
                  .toLowerCase()
                  .includes(searchTerm) ||
                post.title
                  .toLowerCase()
                  .includes(searchTerm)
            )
            .map(
              (post: {
                category: string;
                main: string;
                number: number;
                _id: string;
                title: string;
                image: string;
                price: string;
              }) => (
                <li
                  key={post._id}
                  className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow-sm mt-2"
                >
                  <span>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-10 h-10 object-cover"
                    />
                  </span>
                  <span className="font-medium">
                    {post.number}
                  </span>
                  <span className="font-medium">
                    {post.main}
                  </span>
                  <span className="font-medium">
                    {post.category}
                  </span>
                  <span className="font-medium">
                    {post.title}
                  </span>
                  <span>{post.price} TL</span>
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
    </div>
  );
};

export default AdminPage;
