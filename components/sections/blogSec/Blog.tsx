import React from "react";
import Posts from "../../Posts";
import { db } from "@/lib/db";

const Blog = async() => {
  const GetBlog = await db.blog.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  console.log("££££££££££££3", GetBlog)
  return (
    // Blog section start
    <section className="blog">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 m-auto">
            <div className="sec-heading">
              <h3 className="sec-title">Latest From Blog</h3>
              <p>
                To doesn't his appear replenish together called he of mad place
                won't wherein blessed second every wherein were meat kind
                wherein and martcin
              </p>
            </div>
          </div>
        </div>

        {/* Posts */}
        <Posts blogs={GetBlog} />
      </div>
    </section>
    // Blog section end
  );
};

export default Blog;