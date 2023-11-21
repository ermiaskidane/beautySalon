"use client"

import React, { Component, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import axios from "@/lib/axios-orders";
import Loader from "@/components/Loader";
import Comments from "@/components/sections/Comments";
import { Blog, Category } from "@prisma/client";

interface SinglePostProps {
  blog: Blog & {cats: Category} | null
}

const SinglePost =  ({blog} : SinglePostProps) => {
  const [post, setPost] = useState(blog);
  // useEffect(() => {
  //   const postId = props.match.params.id;
  //   axios.get("/posts/" + postId + ".json").then((res) => {
  //     console.log(res.data);
  //     setPost(res.data);
  //   });
  // }, []);

  // let renderPost = <Loader />;

  if (!post) {
    return <Loader />
  }
  return <>
  <article className="entry-content text-[#6c6c6f]">
    <img src="/images/post/1.jpg" alt="" />
    <div className="meta-tags">
      <Link href="#" className="post-meta no-underline">
        <i className="ti-time"></i>
        {format(post.createdAt, "MMMM do, yyyy")}
      </Link>
      <Link href="#" className="post-meta no-underline">
        <i className="ti-package"></i>
        {post.catSlug}
      </Link>
      <Link href="#" className="post-meta no-underline">
        <i className="ti-tag"></i>
        {post.cats.title}
      </Link>
    </div>
    <h3>{post.title}</h3>
    <p className="text-[15px]">{post.desc}</p>
  </article>
  <Comments postId={post.id} />
</>;
};

export default SinglePost;
