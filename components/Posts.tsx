"use client"
import React, { Component, useEffect, useState } from "react";
import Post from "./post";
// import axios from "../axios-orders";

const Posts = (props: any) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // axios
    //   .get("/posts.json")
    //   .then((res) => {
    //     setPosts(res.data.slice(0, 3));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  // console.log(this.props)

  const renderPosts = posts.map((post) => {
    return (
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        excerpt={post.excerpt}
        body={post.body}
      />
    );
  });

  return (
    // Posts section start
    <div className="row">{renderPosts}</div>
    // Posts section end
  );
};

export default Posts;
