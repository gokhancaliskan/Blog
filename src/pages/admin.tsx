import DragDropPanel from "@/components/DragDropPanel";
import { useState, useEffect } from "react";

const AdminPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [editingPost, setEditingPost] = useState(null);
  const [title, setTitle] = useState("");
  const [main, setMain] = useState("hediyelik");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingMode, setIsEditingMode] = useState(false); // Düzenleme modu

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setError("Beklenmeyen veri yapısı");
        }
      })
      .catch((err) =>
        setError(
          "Veri alınırken hata oluştu: " + err.message
        )
      );
  }, []);

  const startEdit = (post: any) => {
    setEditingPost(post);
    setTitle(post.title);
    setMain(post.main);
    setCategory(post.category);
    setImage(post.image);
    setContent(post.content);
    setPrice(post.price);
  };

  const submitHandler = async (event: any) => {
    event.preventDefault();
    setError(null);

    const url = editingPost
      ? `/api/posts/${(editingPost as any)._id}`
      : "/api/posts";
    const method = editingPost ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      body: JSON.stringify({
        title,
        main,
        category,
        image,
        content,
        price,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.message);
    } else {
      const data = await response.json();
      setEditingPost(null);
      setTitle("");
      setMain("hediyelik");
      setCategory("");
      setImage("");
      setContent("");
      setPrice("");

      // Burada, mevcut posts durumunu güncelleyip yeni veriyi ekliyoruz.
      setPosts((prevPosts) => {
        if (editingPost) {
          // Mevcut bir gönderiyi düzenliyorsanız, güncellenmiş gönderiyi diziye ekleyin.
          return prevPosts.map((post) =>
            post._id === (editingPost as any)._id
              ? data
              : post
          );
        } else {
          // Yeni bir gönderi ekliyorsanız, yeni gönderiyi diziye ekleyin.
          return [...prevPosts, data];
        }
      });
    }
  };

  const deletePost = async (id: string) => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts(
      posts.filter(
        (post: { _id: string }) => post._id !== id
      )
    );
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 mb-6"
      >
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <div className="form-control mb-4">
          <label className="label text-blue-500 font-bold">
            Ürün Adı
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ürün adı"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label text-blue-500 font-bold">
            Ürün Tipi
          </label>
          <select
            value={main}
            onChange={(e) => setMain(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="hediyelik">Hediyelik</option>
            <option value="içecek">İçecek</option>
            <option value="yemek">Yemek</option>
          </select>
        </div>
        <div className="form-control mb-4">
          <label className="label text-blue-500 font-bold">
            Kategori
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input input-bordered w-full"
            required
            disabled={main === "hediyelik"}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label text-blue-500 font-bold">
            Resim Linki
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Resim Link"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label text-blue-500 font-bold">
            Açıklama
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Açıklama"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>
        <div className="form-control mb-4">
          <label className="label text-blue-500 font-bold">
            Fiyat
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Fiyat"
            className="input input-bordered w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          KAYDET
        </button>
      </form>
      <DragDropPanel />
      <div className="w-full max-w-xl mb-6">
        <label className="form-control w-full mb-4">
          <input
            type="text"
            placeholder="Ürün Ara"
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </label>
        <ul className="space-y-2">
          {Array.isArray(posts) &&
            posts
              .filter(
                (post: {
                  title: string;
                  category: string;
                }) =>
                  (
                    post.title?.toLowerCase() || ""
                  ).includes(searchTerm) ||
                  (
                    post.category?.toLowerCase() || ""
                  ).includes(searchTerm)
              )
              .sort((a, b) => a.number - b.number) // Sıralama eklendi
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
                    className="flex justify-between items-center bg-white shadow-lg px-4 py-2 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-12 h-12 object-cover rounded-full hidden md:block"
                      />
                      <div className="flex flex-col md:flex-row md:items-center">
                        <span className="font-medium">
                          {post.title}
                        </span>
                        <span className="hidden md:inline md:ml-4">
                          {post.main}
                        </span>
                        <span className="hidden md:inline md:ml-4">
                          {post.category}
                        </span>
                        <span className="hidden md:inline md:ml-4">
                          {post.price} TL
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEdit(post)}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePost(post._id)}
                        className="btn btn-error btn-sm"
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
