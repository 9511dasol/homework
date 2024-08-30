import { Dispatch, SetStateAction, useState } from "react";
import "./Modify.css";
import { items, Item } from "./ingredients"; // 데이터이스 연결후 삭제 예정
// import { useParams } from "react-router-dom";
// now={now} setNow={setNow}
interface prop {
  closemodi: Dispatch<SetStateAction<boolean>>;
  setNow: Dispatch<SetStateAction<Item[]>>;
  number: number;
  now: Item[];
}


function Modify({closemodi, setNow, number, now}:prop) {
  let show = now.filter((v) => v.order === number + "")[0];
  const [title, setTitle] = useState<string>(show.title);
  const [content, setContent] = useState<string>(show.content);

  const modify = () =>{
    show.title = title;
    show.content = content;
    setNow(prev => [...prev.filter(v =>v.order !== number + ""), show])
    closemodi(false);
  } 

  return (
    <div className="screen">
      <div className="check">
        <div className="check__input1">
          <label htmlFor="company">
            <span>회사</span>
            <select id="company" style={{ width: "150px" }} disabled>
              <option value={show.company}>{show.company}</option>
            </select>
          </label>
          <label htmlFor="enroll__date">
            <span>등록일자</span>{" "}
            <input type="date" id="enroll__date" value={show.date.toISOString().split('T')[0]} readOnly />
          </label>
          <label htmlFor="enroll">
            <span>등록자</span>{" "}
            <input type="text" id="enroll" value={show.enroller} readOnly />
          </label>
        </div>
        <div className="input2">
          <label htmlFor="title">
            <span>제목</span>
            <input
              maxLength={100}
              style={{ width: "500px" }}
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="content">
        <div className="con">
          <span>내용</span>
        </div>
        <textarea
          name="content"
          maxLength={1000}
          style={{
            width: "900px",
            height: "100px",
            resize: "none",
            fontSize: "20px",
            color: "black",
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="count">
          <span>{content.length}/1000</span>
        </div>
      </div>
      <div className="buttons">
        <button onClick={() =>modify()}>수정</button>
        <button onClick={()=>closemodi(false)}>닫기</button>
      </div>
    </div>
  );
}

export default Modify;
