import React, { useEffect, useState } from "react";
import { useQuery } from "urql";
import { MdArrowRightAlt, MdDownload, MdInfo } from "react-icons/md";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Link from "next/link";
const SyllabusQuery = `
  query {
    syllabus {
        _id,
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
export default function Syllabus() {
  const router = useRouter();
  const [result, reexecuteQuery] = useQuery({
    query: SyllabusQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <Loading />;
  if (error) return <Error />;
  return (
    <div>
      <div className="flex justify-center items-center gap-[20px] text-[40px] text-yellow text-center mt-[20px] font-light">
        <div>Syllabus</div>{" "}
        <MdInfo title={syllabusInfo} className="cursor-pointer text-blue" />
      </div>
      <div className="text-[white]">
        {data.syllabus.map((syll) => {
          return (
            <div
              key={syll._id}
              className="p-[15px] m-[20px] bg-[#F7F7F7] text-black border-[3px] border-[#FEA82F] rounded-md cursor-pointer"
            >
              <div className="md:flex gap-[10px] items-center font-bold">
                <div className="my-[3px] text-[20px] capitalize">
                  {syll.semester.label} Semester,
                </div>
                <div className="text-[20px] capitalize">
                  {syll.branch.label}
                </div>
              </div>
              <div className="text-[20px] bg-yellow w-fit p-[8px] rounded-md mt-[8px] font-bold hover:bg-blue">
                <Link href={syll.link} passHref>
                  <div className="flex items-center gap-[6px] ">
                    <div className="flex items-center mt-[4px]">
                      <MdDownload />
                    </div>{" "}
                    <div>View/Download</div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const syllabusInfo =
  "Currently only RGPV based syllabus is displayed here. All the syllabus and its authority belongs to RGPV we are just helping students in finding syllabus.";
