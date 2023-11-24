import React from "react";
import Link from "next/link";
import DOMPurify from 'dompurify';

const post = (props: any) => {

  const sanitizedData = (): { __html: string } => {
    if (!props.excerpt) {
      return { __html: '' }; // Handle empty input
    }
    const trimDesc: string = props.excerpt.substring(0, 100);
    return { __html: DOMPurify.sanitize(trimDesc) };
  }
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
        <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={sanitizedData()}/>
        {/* <p>{props.excerpt}</p> */}
        <Link href={`/blog/${props.id}`} className="btn btn-round">
          read more
        </Link>
      </article>
    </div>
  );
};

export default post;
