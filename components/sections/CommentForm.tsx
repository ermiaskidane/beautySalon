import React, { useState } from "react";
import toast from "react-hot-toast";
// import axios from "../axios-orders";

const initComment = {
  id: null,
  postId: null,
  username: "",
  message: "",
};

const CommentForm = (props) => {
  const [comment, setComment] = useState(initComment);

  const inputChangeHandler = (e) => {
    const updatedComment = { ...comment };
    updatedComment[e.target.name] = e.target.value;
    updatedComment.id = Math.floor(Math.random() * 100);
    updatedComment.postId = props.postId;

    setComment(updatedComment);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // axios
    //   .post("/comments.json", comment)
    //   .then((res) => {
    //     props.onFormSubmit();
    //     toast.success("Comment posted successfully");
    //     setComment(initComment);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  };

  return (
    <React.Fragment>
      <div className="comment-form">
        <h4 className="comment-title">Leave a comment</h4>
        <form onSubmit={onSubmitHandler}>
          <input
            name="username"
            type="text"
            placeholder="Your name"
            value={comment.username}
            onChange={inputChangeHandler}
            required
          />
          <textarea
            name="message"
            placeholder="Write Comments"
            value={comment.message}
            onChange={inputChangeHandler}
            required
          ></textarea>
          <button type="submit" className="btn btn-filled btn-round">
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CommentForm;
