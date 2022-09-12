import React, { useRef } from "react";
import {GiBookshelf, GiArchiveResearch} from "react-icons/gi"
import {BsMenuApp, BsVectorPen} from "react-icons/bs"
import styles from "../styles/Navbar.module.scss"
import {MdMenu} from "react-icons/md"
import { useRouter } from "next/router";
const navbarItems = [
  { name: "All Blogs", href: "/blogs", id: 1, icon: <BsVectorPen/>  },
  { name: "View Books", href: "/books", id: 2, icon: <GiBookshelf/> },
  { name: "View Syllabus", href: "/syllabus", id: 3, icon: <GiArchiveResearch/> },
  { name: "Contact", href: "https://pranshujain.vercel.app/contact", id: 4},
];
export default function Navbar() {
  const router = useRouter()
  const ref = useRef()
  return (
    <div className=" pb-[8px] bg-blue font-roboto-mono  w-full border-b-[2px] border-yellow">
      <div className="w-full  flex justify-around items-center pt-[10px]">
      <div className="text-[30px] font-medium text-yellow bg-black font-[200] border-b-[2px] border-yellow px-[10px] rounded-xl tracking-[3px] cursor-pointer hover:bg-[grey]" onClick={()=>{router.push("/")}}>ancowo</div>
         <div className={`flex gap-[4px] md:gap-[20px] text-[16px] md:text-[15px] px-[10px] md:px-[40px] bg-black rounded-[40px] md:rounded-t-[80px] p-[10px] ${styles.items}`} ref={ref}>
          {navbarItems.map((navbarItem) => {
            return (
              <div key={navbarItem.id} className="p-[3px]  md:pt-[5px] md:px-[15px] bg-yellow text-[#26282B] rounded-xl md:rounded-t-[20px] font-bold hover:bg-blue tracking-[3px]">
                <div onClick={()=>{
                  router.push(navbarItem.href)
                  ref.current.classList.remove(styles.show)}}>
                  <div className="flex justify-center items-center gap-[10px] cursor-pointer">
                  {navbarItem.icon && navbarItem.icon}
                  <div>
                  {navbarItem.name.toUpperCase()}
                  </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.menu} onClick={()=>ref.current.classList.toggle(styles.show)}><MdMenu/></div>
      </div>
    </div>
  );
}
