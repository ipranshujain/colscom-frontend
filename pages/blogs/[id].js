import React from "react";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useQuery } from "urql";
import { Content } from "../../components/Content";
import { convertFromRaw } from "draft-js";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import styles from "../../styles/Blogs.module.scss";
const BlogQuery = `
  query($id: ID!) {
    blog(id: $id) {
      _id,
      title,
      description,
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
export default function ViewBlog() {
  const router = useRouter();
  const { id } = router.query;
  const [result, reexecuteQuery] = useQuery({
    query: BlogQuery,
    variables: { id },
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loading />;
  if (error) return <Error />;

  console.log("Data is: ", data);
  const { blog } = data;
  const content = stateToHTML(convertFromRaw(JSON.parse(blog.description)));
  return (
    <div>
      <div
        key={blog._id}
        className="p-[15px] m-[10px] text-blue flex flex-col justify-center items-center"
      >
        <div className="text-[45px] font-[300]">{blog.title}</div>
        <div className="font-[700] ml-[5px]">by {blog.author}</div>
        {/* <div className="my-[10px] text-[20px]">{blog.info}</div> */}
        <div className="flex gap-[15px] font-[300] mt-[10px]">
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
          {/* {blog.category.map((item) => item.label).join(", ")} */}
        </div>

        {/* <pre>{content}</pre> */}
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className={`bg-[#F7F7F7]   p-[30px] text-black border-[1px] border-[#FEA82F] ${styles.container}`}
      ></div>
    </div>
  );
}
