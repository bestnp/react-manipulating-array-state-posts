import { useEffect, useState } from "react";
import { postData } from "../raw-data/post-data"; // ใช้ตามเดิม ไม่แก้ไฟล์นี้

function Posts() {
  // เก็บจำนวน like แยกเป็น map โดยไม่แก้ postData
  const [likesById, setLikesById] = useState({});

  // ตั้งค่าเริ่มต้นจาก postData หนึ่งครั้ง
  useEffect(() => {
    const init = {};
    for (const p of postData) init[p.id] = p.likes;
    setLikesById(init);
  }, []);

  const like = (id) => {
    setLikesById((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const dislike = (id) => {
    setLikesById((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  return (
    <div className="app-wrapper">
      <h1 className="app-title">Posts</h1>

      <div className="post-list">
        {postData.map((post) => {
          const likes = likesById[post.id] ?? post.likes; // fallback ถ้ายังไม่ init
          return (
            <article key={post.id} className="post-item">
              <div className="post-header">
                <h2 className="post-title">{post.title}</h2>
                <div className="post-social-media-stats">
                  <span className="stats-topic">Likes: </span>
                  <span className="post-likes">{likes}</span>
                </div>
              </div>

              <p className="post-content">{post.content}</p>

              <div className="post-actions">
                <button className="like-button" onClick={() => like(post.id)}>
                  Like
                </button>
                <button
                  className="dislike-button"
                  onClick={() => dislike(post.id)}
                >
                  Dislike
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
