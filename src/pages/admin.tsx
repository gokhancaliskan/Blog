// pages/admin.tsx
import { useState, useEffect } from "react";

const AdminPage = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [title, setTitle] = useState("");
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
        setCategory("");
        setImage("");
        setContent("");
    };

    const deletePost = async (id: string) => {
        await fetch(`/api/posts/${id}`, { method: "DELETE" });
        setPosts(posts.filter((post: { _id: string }) => post._id !== id));
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                />
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Image URL"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                ></textarea>
                <button type="submit">Save Post</button>
            </form>
            <ul>
                {posts.map(
                    (post: { _id: string; title: string }) => (
                        <li key={post._id}>
                            {post.title}
                            <button onClick={() => startEdit(post)}>
                                Edit
                            </button>
                            <button onClick={() => deletePost(post._id)}>
                                Delete
                            </button>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default AdminPage;
