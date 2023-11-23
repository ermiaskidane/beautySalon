import React from "react";
import Link from "next/link";
import SinglePost from "@/components/sections/SignlePost";
import { db } from "@/lib/db";

interface pageProps {
  params: {
    blogId: string;
  };
}

const Page = async({params} : pageProps) => {

  const Ablog = await db.blog.findUnique({
    where: { id: params.blogId },
    include: {
      cats: true, // Include the related Category
      comments: true
    },
  })
  // console.log("getblog", Ablog)

  // console.log(":::::::::::::", params.blogId)
    
    return (
        <>
        <section className="page-feature">
            <div className="container text-center py-3">
                <h2>Blog Details</h2>
                <div className="breadcrumb">
                <Link href="/" className="no-underline">Home</Link>
                <span >/ Blog Details</span>
                </div>
            </div>
        </section>
        
        <section className="page">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                    <SinglePost Ablog={Ablog}/>
                    </div>
                    <div className="col-md-4">
                        <aside className="sidebar">
                            <div className="widget widget_search">
                                <form action="#">
                                    <input type="text" name="s" placeholder="Search ..." required />
                                    <i className="ti-search"></i>
                                </form>
                            </div>
                            <div className="widget categories">
                                <h3 className="widget-title text-[#6c6c6f]">Categories</h3>
                                <ul className="pl-0 text-[15px]">
                                    <li><Link href="#" className="no-underline ">App Design <span>(5)</span></Link></li>
                                    <li><Link href="#" className="no-underline">Web Design <span>(9)</span></Link></li>
                                    <li><Link href="#" className="no-underline">UI-UX Design <span>(23)</span></Link></li>
                                    <li><Link href="#" className="no-underline">Print Design <span>(7)</span></Link></li>
                                    <li><Link href="#" className="no-underline">Game Design <span>(3)</span></Link></li>
                                    <li><Link href="#" className="no-underline">Graphic Design <span>(2)</span></Link></li>
                                    <li><Link href="#" className="no-underline">Logo Design <span>(5)</span></Link></li>
                                </ul>
                            </div>
                            <div className="widget widget_tag_cloud">
                                <h3 className="widget-title text-[#6c6c6f]">Tags</h3>
                                <div className="tag-cloud text-[15px]">
                                    <Link href="#" className="no-underline"><i className="ti-tag"></i> banking</Link>
                                    <Link href="#" className="no-underline"><i className="ti-tag"></i> article</Link>
                                    <Link href="#" className="no-underline"><i className="ti-tag"></i> money</Link>
                                    <Link href="#" className="no-underline"><i className="ti-tag"></i> saving</Link>
                                    <Link href="#" className="no-underline"><i className="ti-tag"></i> invest</Link>
                                    <Link href="#" className="no-underline"><i className="ti-tag"></i> safety</Link>
                                    <Link href="#" className="no-underline"><i className="ti-tag"></i> credit</Link>
                                    <Link href="#" className="no-underline"><i className="ti-tag"></i> debit</Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                    
                </div>
            </div>
        </section>
        </>
    )
}

export default Page

