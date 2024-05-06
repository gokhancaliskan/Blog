import Image from "next/image";

type Post = {
  _id: string;
  title: string;
  content: string;
  image: string;
};

export type CardProps = {
  posts: Post[];
};

export const Card = ({ posts }: CardProps) => {
  return (
    <div className="flex justify-center">
      <ul className="space-y-[1.5rem]">
        {posts.map((post) => (
          <div
            className=" card w-96 bg-base-100 shadow-xl image-full"
            key={post._id}
          >
            <figure>
              <Image src={post.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.content}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">
                  BLOG OKU
                </button>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Card;
