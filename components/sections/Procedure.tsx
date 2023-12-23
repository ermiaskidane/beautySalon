"use client";

import React, { Component, useEffect, useState } from "react";
import Loader from "../Loader";
import Post from "../post";
import { Blog } from "@prisma/client";

interface procedureProps {
  blogs: Blog[]
}

// const getBlog = async() => {
//   const response = await axios.get(`${REACT_APP_CURRENT_URL}`);
// }

const Procedure = ({blogs} : procedureProps) => {
  const [procedures, setProcedures] = useState<Blog[] | null>(blogs);

  useEffect(() => {
    // axios
    //   .get("/procedures.json")
    //   .then((res) => {
    //     setProcedures(res.data.slice(0, 3));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  // URL should be signle service page -> '/services/'+procedure.id

  let renderProcedures: React.ReactNode = <Loader />;
  if (procedures !== null) {
    renderProcedures = procedures.slice(0, 3).map((procedure) => {
      return (
        <Post
          key={procedure.id}
          id={procedure.id}
          title={procedure.title}
          excerpt={procedure.desc}
          body={procedure.desc}
          url={"/"}
        />
      );
    });
  }

  return (
    // Procedures section start
    <section className="procedures">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 m-auto">
            <div className="sec-heading">
              <h3 className="sec-title">Popular Procedures</h3>
              <p>
                To doesn&apos;t his appear replenish together called he of mad place
                won&apos;t wherein blessed second every wherein were meat kind
                wherein and martcin
              </p>
            </div>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div className="row">{renderProcedures}</div>
        </div>
      </div>
    </section>
    // Procedures section end
  );
};

export default Procedure;
