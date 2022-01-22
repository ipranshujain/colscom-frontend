import Head from "next/head";
import Image from "next/image";
import research from "../public/research.svg";

export default function Home() {
  return (
    <div className="h-[95vh] w-full flex flex-wrap justify-center items-center bg-[#26282B] gap-[20px]">
      <div className="md:flex-[30%] hidden md:block">
        <Image className="icon" src={research} alt="research" height={200} />
      </div>
      <div className="text-[30px] text-[white] md:flex-[50%] p-[20px]">
        <div>Welcome to </div>
        <div className="text-[40px] font-[600]">
          <span className="text-yellow">Col</span>lege{" "}
          <span className="text-yellow">S</span>tudent{" "}
          <span className="text-yellow">Com</span>munity
        </div>
        <div className="text-[20px] font-[600]">
          A Place for students to find resources and learn.
        </div>
      </div>
    </div>
  );
}
