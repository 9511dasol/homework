import React, { Dispatch, SetStateAction } from "react";
import "./Content.css";
// import { useParams } from "react-router-dom";
import { items, Item } from "./ingredients";

interface prop {
  setSpectify: Dispatch<SetStateAction<boolean>>;
  number: number;
  now: Item[];
}

function Content({ setSpectify, number, now }: prop) {

  const show = now.filter((v) => v.order === number + "")[0];

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
            <input
              type="text"
              id="enroll__date"
              value={show.date.toISOString().split("T")[0]}
              readOnly
            />
          </label>
          <label htmlFor="enroll">
            <span>등록자</span>{" "}
            <input type="text" id="enroll" value={show.enroller} readOnly />
          </label>
        </div>
        <div className="input2">
          <label htmlFor="title">
            <span>제목</span>{" "}
            <input
              style={{ width: "300px" }}
              type="text"
              id="title"
              value={show.title}
              readOnly
            />
          </label>
        </div>
      </div>
      <div className="content">
        <div className="con">
          <span>내용:</span>
        </div>
        <textarea
          name="content"
          style={{
            width: "900px",
            height: "100px",
            resize: "none",
            fontSize: "20px",
            color: "black",
          }}
          value={show.content}
          readOnly
        ></textarea>
        <div className="count">
          <span>{show.content.length}/1000</span>
        </div>
      </div>
      <div className="button">
        <button onClick={()=>setSpectify(false)}>닫기</button>
      </div>
    </div>
  );
}

export default Content;
