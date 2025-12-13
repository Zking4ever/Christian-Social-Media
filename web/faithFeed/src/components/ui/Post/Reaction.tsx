import { FaRegHeart } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { FaShare } from "react-icons/fa6";

export default function Reaction() {
  return (
   <div className="post-row actions">
        <FaRegHeart />
        <MdOutlineMessage />
        <FaShare />
    </div>
  )
}
