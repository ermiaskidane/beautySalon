"use client"

import React, { Component, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
// import axios from "@/lib/axios-orders";
import Loader from "@/components/Loader";
import Comments from "@/components/sections/Comments";
import { Blog, Category, Comment } from "@prisma/client";

interface SinglePostProps {
  Ablog: Blog & {cats: Category} & {comments: Comment[]} | null
}

const SinglePost =  ({Ablog} : SinglePostProps) => {
  const [blog, setBlog] = useState(Ablog);
  // useEffect(() => {
  //   const postId = props.match.params.id;
  //   axios.get("/posts/" + postId + ".json").then((res) => {
  //     console.log(res.data);
  //     setPost(res.data);
  //   });
  // }, []);

  // let renderPost = <Loader />;
  console.log("post~~~~~~~~~~~~~~~~~~~", blog)

  if (!blog) {
    return <Loader />
  }
  return <>
  <article className="entry-content text-[#6c6c6f]">
    <img src="/images/post/1.jpg" alt="" />
    <div className="meta-tags">
      <Link href="#" className="post-meta no-underline">
        <i className="ti-time"></i>
        {format(blog.createdAt, "MMMM do, yyyy")}
      </Link>
      <Link href="#" className="post-meta no-underline">
        <i className="ti-package"></i>
        {blog.catSlug}
      </Link>
      <Link href="#" className="post-meta no-underline">
        <i className="ti-tag"></i>
        {blog.cats.title}
      </Link>
    </div>
    <h3>{blog.title}</h3>
    <p className="text-[15px]">{blog.desc}</p>
  </article>
  <Comments comments={blog.comments} blogSlug={blog.slug} blogId={blog.id} />
</>;
};

export default SinglePost;
