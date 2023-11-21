import React, { Fragment, useEffect, useState } from "react";
import Comment from "@/components/comment";
// import axios from "../axios-orders";
import CommentForm from "./CommentForm";
import Loader from "../Loader";

const Comments = (props) => {
  const [comments, setComments] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // axios
    //   .get("/comments.json")
    //   .then((res) => {
    //     console.log(res.data);
    //     setComments(res.data);
    //     setSubmitted(false);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }, [submitted]);

  let renderComments = <Loader />;
  if (comments !== null && Object.keys(comments).length) {
    renderComments = Object.keys(comments).map((cmnt) => {
      if (comments[cmnt].postId === props.postId) {
        return (
          <li key={comments[cmnt].id}>
            <Comment
              id={comments[cmnt].id}
              username={comments[cmnt].username}
              message={comments[cmnt].message}
            />
          </li>
        );
      }
    });
  }

  return (
    <Fragment>
      <div className="comments">
        <h4 className="comment-title">comments</h4>
        <ul>{renderComments}</ul>
      </div>
      <CommentForm
        postId={props.postId}
        onFormSubmit={() => setSubmitted(true)}
      />
    </Fragment>
  );
};

export default Comments;
