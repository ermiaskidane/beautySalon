import React from 'react'
import Link from "next/link"

const comment = props => {
    return(
        <div className="single-comment">
            <div className="user-thumb">
                <img className="avatar-small circle" src="/images/avatar-small.png" alt="" />
            </div>
            <div className="comments-body">
                <h4>{props.username}</h4>                  
                <p>{props.message}</p>
                <Link href="#"><i className="ti-back-right"></i>Reply</Link>
            </div>
        </div>
    )
}

export default comment