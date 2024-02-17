import { allPosts } from ".contentlayer/generated";
import Link from "next/link";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";

export default function Page() {
  console.log({ allPosts });
  return (
    <Maxwidthdiv className="prose">
      {allPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </Maxwidthdiv>
  );
}
