import axios from "axios";
import React, { useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import useSWR from "swr";
// import axios from "../axios-orders";
interface commentFormProps {
  blogSlug:  string
  blogId: string
}

const fetcher = async (url: any) => {
  const res = await fetch(url)

  const data = await res.json()

  if(!res.ok){
    const error = new Error(data.message)
    throw error;
  }

  return data
}

const CommentForm = ({blogSlug, blogId}: commentFormProps) => {
  // const [loading, setLoading] = useState(false);
  // const [comment, setComment] = useState("");
  // const { isSignedIn, userId } = useAuth();
  // const router = useRouter();

  // const inputChangeHandler = (e) => {
  //   const updatedComment = { ...comment };
  //   updatedComment[e.target.name] = e.target.value;
  //   // updatedComment.id = Math.floor(Math.random() * 100);
  //   // updatedComment.postId = props.postId;

  //   setComment(updatedComment);
  // };
  // swr make a continious request for any update of the data
  // const { data, mutate, isLoading } = useSWR(`/api/comments?postSlug=${blogSlug}`, fetcher)

  // console.log("LLLLLLLLLLLL", data)

  // console.log("££££££££££333", comment)

  // const onSubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     await axios.post("/api/comments", {comment, blogSlug, blogId})
  //     toast.success('Comment Created.');
  //     router.refresh();
  //     setComment("")
  //   }catch (error) {
  //     toast.error('Something went wrong');
  //   } finally {
  //     setLoading(false);
  //     // setOpen(false);
  //   }
    
  //     // .then((res) => {
  //     //   props.onFormSubmit();
  //     //   toast.success("Comment posted successfully");
  //     //   setComment(initComment);
  //     // })
  //     // .catch((err) => {
  //     //   console.log(err.message);
  //     // });
  // };

  return (
    <React.Fragment>
      <div className="comment-form">
        <h4 className="comment-title">Leave a comment</h4>
        {isSignedIn? (
          <form onSubmit={onSubmitHandler}>
          {/* <input
            name="username"
            type="text"
            placeholder="Your name"
            value={comment.username}
            onChange={inputChangeHandler}
            required
          /> */}
          <textarea
            name="message"
            placeholder="Write Comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="btn btn-filled btn-round">
            Submit
          </button>
        </form>
        ):(
          <Link href='/login' className="no-underline block text-[#ff817e]">Login to write a comment</Link>
        )}
      </div>
    </React.Fragment>
  );
};

export default CommentForm;
