import React, { useEffect, useState } from "react";
import { useQuery } from "urql";
import { MdArrowRightAlt, MdInfo } from "react-icons/md";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
const BooksQuery = `
  query {
    books {
        _id,
        name,
        author,
        purpose,
        link,
        semester {
            label,
            value
        },
        branch {
            label,
            value
        }
  }
  }
`;
export default function Books() {
  const router = useRouter();
  const [result, reexecuteQuery] = useQuery({
    query: BooksQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loading />;
  if (error) return <Error />;
  return (
    <div>
      <div className="flex justify-center items-center gap-[20px] text-[40px] text-yellow text-center mt-[20px] font-light">
        <div>Books</div>{" "}
        <MdInfo title={bookInfo} className="cursor-pointer text-blue" />
      </div>
      <div className="text-[white]">
        {data.books.map((book) => {
          return (
            <div
              key={book._id}
              className="p-[15px] m-[20px] bg-[#F7F7F7] text-black border-[3px] border-[#FEA82F] rounded-md cursor-pointer"
            >
              <div className="text-[30px] font-[700]">{book.name}</div>
              <div className="font-[700]">by {book.author}</div>
              <div className="md:flex md:items-center gap-x-[10px]">
                <div className="my-[3px] text-[20px] capitalize">
                  {book.semester.label} Semester,
                </div>
                <div className="text-[20px] capitalize">
                  {book.branch.label}
                </div>
              </div>
              <div className=" text-[20px]">{book.purpose}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const bookInfo =
  "Currently download links to books are not provided intentionally. We are working on finding ways to provide them in a legal way. If you are publisher and wanted to allow us to publish your books download links legally please contact us that will be really helpful.";
