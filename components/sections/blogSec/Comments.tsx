"use client"

import React, { useEffect, useState } from "react";
// import Comment from "@/components/comment";
// import axios from "../axios-orders";
import CommentForm from "../CommentForm";
import Loader from "../../Loader";
import useSWR from "swr";
import { Blog, Comment as CommentPrisma} from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

interface commentsProps {
  // comments: Blog[]
  comments: CommentPrisma[]
  blogSlug: string
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

const Comments = ({comments, blogSlug, blogId}: commentsProps) => {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [nestDesc, setNestDesc] = useState("")
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();
  const path = usePathname()

  // swr make a continious request for any update of the data
  const { data, mutate, isLoading } = useSWR(`/api/comments?postSlug=${blogSlug}`, fetcher)

  // Create an array to track the open/closed state of each comment
 const [commentOpen, setCommentOpen] = useState(new Array(data?.length).fill(false));

 const getOpenComment = (index: number) => {
  // Create a copy of the commentOpen array to avoid mutating state directly
  const newCommentOpen = [...commentOpen];

  // Toggle the open/closed state of the selected comment
  newCommentOpen[index] = !newCommentOpen[index];
  
  // Update the state with the new array
  setCommentOpen(newCommentOpen);
};


  const onSubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/comments", {comment, blogSlug, blogId})
      toast.success('Comment Created.');
      router.refresh();
      // mutate helps to display the comment after created
      mutate()
      setComment("")
    }catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleNestedSubmit = async (event: React.FormEvent<HTMLFormElement>, id: string) => {
    event.preventDefault()

    try {
      setLoading(true);
      await axios.post(`/api/comments/${userId}?id=${id}`, {nestDesc})
      toast.success('Comment Created.');
      router.refresh();
      // mutate helps to display the comment after created
      mutate()
      setNestDesc("")
    }catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }
 let renderComments = isLoading ? <Loader/> : (
      data.map((cmnt: any, index: number) => {
        return (
          <li key={cmnt.id}>
            {/* <Comment
              username={cmnt.userEmail}
              comm={cmnt.desc}
              index={index}
              commentopen={commentOpen}
              openComment={() => getOpenComment(index) }
              nestedCommentLength={cmnt.NestComments.length}
              onSubmit={(e) => handleNestedSubmit(e, cmnt.id )}
            /> */}
            <div className="single-comment">
              <div className="user-thumb">
                  <img className="avatar-small circle" src="/images/avatar-small.png" alt="" />
              </div>
              <div className="comments-body">
                  <h4>{cmnt.userEmail}</h4>                  
                  <p>{cmnt.desc}</p>
                  <p className="cursor-pointer" onClick={() => getOpenComment(index)}><i className="ti-back-right" ></i> {cmnt.NestComments.length} {commentOpen[index] ? 'hide' : 'reply'}</p>
              </div>
              {commentOpen[index] && isSignedIn && (
                <form onSubmit={(e) => handleNestedSubmit(e, cmnt.id )} className="flex flex-col gap-3 mb-4 md:flex-row md:mb-0">
                <textarea
                  name="message"
                  placeholder="Write Comments"
                  value={nestDesc}
                  className=' p-2 h-10 border-2  rounded-md border-[#e3e6ea] focus:border-gray-600 active:border-gray-600 md:h-14 md:mb-4'
                  onChange={(e) => setNestDesc(e.target.value)}
                  required
                ></textarea>
                <button type="submit" className="btn btn-filled btn-round h-10 p-2 rounded-md md:h-14">
                  Submit
                </button>
              </form>
              )}

              {cmnt.NestComments.map((comt: any, indexs: number) => (
                <div key={indexs} className="nested-thumb">
                  {commentOpen[index] && (
                    <div className="flex gap-2">
                      <div className="usernested-thumb self-start">
                        <img className="avatar-small circle" src="/images/avatar-small.png" alt="" />
                      </div>
                      <div className="ml-2 self-center">
                          <h4>{comt.userEmail}</h4>                  
                          <p>{comt.desc}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>          
          </li>
      )}))

  return (
    <>
      <div className="comments">
        <h4 className="comment-title">comments</h4>
        <ul>{renderComments}</ul>
      </div>
      <>
      <div className="comment-form">
        <h4 className="comment-title">Leave a comment</h4>
        {isSignedIn? (
          <form onSubmit={onSubmitHandler}>
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
    </>
      {/* <CommentForm
        blogId={blogId}
        blogSlug={blogSlug}
        // onFormSubmit={() => setSubmitted(true)}
      /> */}
    </>
  );
};

export default Comments;
