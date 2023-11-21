import React from 'react'
import MemberSocial from './MemberSocial'

const singleMember = (props: any) => {
    return (
        <div className="single-memb">
            <img src={`/images/team/${props.id}.jpg`}alt="" />
            <div className="memb-details">
                <h6>{ props.name }</h6>
                <span>{ props.speciality }</span>
                <MemberSocial socialLinks={ props.social } />
            </div>
        </div>
    )
}

export default singleMember