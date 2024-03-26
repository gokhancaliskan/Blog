import type { NextPage, GetServerSideProps } from 'next';
import Header from '../components/Header';

type Post = {
    _id: string;
    title: string;
    content: string;
};

type Props = {
    posts: Post[];
};

const Home: NextPage<Props> = ({ posts }) => {
    return (
        <div>
            <Header />
            <main>
                <h1>Welcome to Our Blog</h1>
                <ul>
                    {posts.map(post => (
                        <li key={post._id}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch('http://localhost:3000/api/posts');
    const posts = await res.json();
    return {
        props: { posts },
    };
};

export default Home;
