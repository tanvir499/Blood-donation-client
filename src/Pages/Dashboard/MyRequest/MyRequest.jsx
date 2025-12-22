import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRequest = () => {
  const [totalRequest, seTotalRequest] = useState(0);
  const [myRequest, setMyRequest] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequest(res.data.request);
        seTotalRequest(res.data.totalRequest);
      });
  }, [axiosSecure, currentPage, itemsPerPage]);

  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  // console.log(myRequest);
  // console.log(totalRequest);
//   console.log(pages);

const handlePrev =() =>{
    if(currentPage > 1){
        setCurrentPage(currentPage -1)
    }

}
const handleNext = () =>{
    if(currentPage < pages.length){
        setCurrentPage(currentPage + 1)
    }
}

  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Hospital-Name</th>
              <th>BloodGroup</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
             {
                myRequest.map((request, index) =>  <tr>
              <th>{(currentPage*10)+(index+1)-10}</th>
              <td>{request.recipientName}</td>
              <td>{request.hospital}</td>
              <td>{request.bloodGroup}</td>
              <td>Blue</td>
            </tr>)
             }
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-12 gap-4 relative z-10">
        <button onClick={handlePrev} className="btn btn-accent">prev</button>
        {
            pages.map(page=>
                <button
                className={`btn ${page === currentPage ? 'bg-[#435585] text-white' : ''}`}
                 onClick={() => setCurrentPage(page)}>
                    {page}
                </button>
            )
        }
        <button onClick={handleNext} className="btn btn-accent">Next</button>
      </div>
      
    </div>
  );
};

export default MyRequest;
