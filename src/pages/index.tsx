import { GetServerSideProps, NextPage } from "next";
import { Header } from "../components/Header";
import { Card, CardProps } from "@/components/Card";

export type HomeProps = CardProps & {};

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div>
      <Header />
      <Card posts={posts} />
    </div>
  );
};
export const getServerSideProps: GetServerSideProps =
  async () => {
    const res = await fetch(
      "http://localhost:3000/api/posts"
    );
    const posts = await res.json();
    return {
      props: { posts },
    };
  };

export default Home;
