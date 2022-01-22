import React, { useEffect, useState } from "react";
import { useQuery } from "urql";
import { MdArrowRightAlt, MdSearch } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
const BlogsQuery = `
  query {
    blogs {
      _id,
      title,
      category {
          label,
          value
      },
      info,
      like,
      author
  }
  }
`;
const setBlog = (data) => {
  return data ? data.blogs : [];
};

export default function Blogs() {
  const router = useRouter();
  const [result, reexecuteQuery] = useQuery({
    query: BlogsQuery,
  });
  const [search, setSearch] = useState("");
  const { data, fetching, error } = result;
  const [blogs, setBlogs] = useState(data ? data.blogs : []);
  useEffect(() => {
    setBlogs(data ? data.blogs : []);
  }, [data]);
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim().length === 0) {
      setBlogs(data?.blogs);
      return;
    }
    setBlogs(
      data.blogs.filter((blog) => {
        return (
          blog.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
        );
      })
    );
  };
  if (fetching) return <Loading />;
  if (error) {
    console.log("Error is here: ", error);
    return <Error />;
  }
  return (
    <div>
      <div className="text-[40px] text-yellow text-center mt-[20px] font-light">
        Blogs
      </div>
      <div className="mx-[20px] flex items-center">
        <BsSearch size={40} className="text-blue" />
        <input
          className="text-[23px] p-[10px] rounded-md border-[1px] border-black bg-blue text-black block mx-[20px] focus:outline-0"
          value={search}
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="Enter Blog to search"
        />
      </div>
      <div className="text-[white]">
        {blogs.map((blog) => {
          return (
            <div
              key={blog._id}
              className="p-[15px] m-[20px] bg-[#F7F7F7] text-black border-[3px] border-[#FEA82F] rounded-md cursor-pointer"
              onClick={() => router.push(`/blogs/${blog._id}`)}
            >
              <div className="text-[30px] font-[700]">{blog.title}</div>
              <div className="font-[700]">by {blog.author}</div>
              <div className="my-[10px] text-[20px]">{blog.info}</div>
              <div className="flex gap-[15px] font-[300]">
                {/* {blog.category.map((item) => {
                  return (
                    <div
                      className="flex gap-[5px] items-center font-bold"
                      key={item.value}
                    >
                      {item.label}
                    </div>
                  );
                })} */}
                {blog.category.map((item) => item.label).join(", ")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
