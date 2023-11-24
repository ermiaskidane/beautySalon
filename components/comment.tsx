import React from 'react'
import Link from "next/link"

const comment = (props: any) => {
    return(
        <div className="single-comment">
            <div className="user-thumb">
                <img className="avatar-small circle" src="/images/avatar-small.png" alt="" />
            </div>
            <div className="comments-body">
                <h4>{props.username}</h4>                  
                <p>{props.message}</p>
                {/* Use some modal for reply instead of commentForm */}
                <Link href="#"><i className="ti-back-right" onClick={() => getOpenComment(index)}></i>Reply</Link>
                 <>
            {/* {commentOpen[index] && isSignedIn && (
                      <form className="flex items-center justify-between gap-8" onSubmit={(e) => handleNestedSubmit(e, item.id )}>
                        <textarea 
                        placeholder='Write a comment...' 
                        value={nestDesc}
                        onChange={(e) => setNestDesc(e.target.value)}
                        className='mb-4 p-2 w-full h-10 border-2 rounded-md border-gray-600 focus:border-gray-600 active:border-gray-600 md:h-14'/>
                        <button type="submit" className='mb-4 px-4 h-10 bg-blue-500 text-white font-bold border-0 rounded cursor-pointer md:h-14'>
                          Send
                        </button>
                      </form>
                    )}
            </> */}
            </div>
        </div>
    )
}

export default comment