import Sender from "./Reaction";
import './Post.css'
import Reaction from "./Reaction";

export default function Post() {
  return (
    <>
      <div className="post">
        <div className="post-row header">
          <img src="https://avatar.iran.liara.run/username?username=astawus&length=1" className="avatar" />
          <div>
            <div className="name">John Doe</div>
            <div className="date">2 hours ago</div>
          </div>
        </div>

        <div className="post-row content">
          <p>This is a post content written using row-based CSS.</p>
          <img src="/post.jpg" className="post-image" />
        </div>
          <Reaction />
        </div>
    </>
  )
}
