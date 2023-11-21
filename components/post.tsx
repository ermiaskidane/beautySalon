import React from "react";
import Link from "next/link";

const post = (props: any) => {
  // console.log("{{{{{{{{{", typeof props.id)
  return (
    <div className="col-md-4">
      <article className="post">
      <img
          src="/images/post/0.jpg"
          alt=""
        />
        {/* <img
          src={require("../assets/images/post/" + props.id + ".jpg")}
          alt=""
        /> */}
        <h4>
          <Link href={`/blog/${props.id}`}>{props.title}</Link>
        </h4>
        <p>{props.excerpt}</p>
        <Link href={`/blog/${props.id}`} className="btn btn-round">
          read more
        </Link>
      </article>
    </div>
  );
};

export default post;
