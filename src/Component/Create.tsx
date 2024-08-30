import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { companies, Item } from "./ingredients";
import "./Create.css";
interface prop {
  closemake: () => void;
  setNow: Dispatch<SetStateAction<Item[]>>;
  len: number;
}

function Create({ closemake, setNow, len }: prop) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [enroller, setEnroller] = useState<string>("");
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [password, setPassword] = useState<string>("");
  const companyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCompany(event.target.value);
  };

  const refresh = () => {
    setTitle("");
    setContent("");
    setCompany("");
    setEnroller("");
    setPassword("");
  };

  const save = () => {
    if (company && enroller && title && password && content) {
      let item: Item = {
        company: company,
        order: len + 1 + "",
        date: date,
        content: content,
        enroller: enroller,
        title: title,
        password: password,
      };
      setNow((prev) => [...prev, item]);
      refresh();
      closemake();
    } else {
      alert("다시 확인하시고 저장 버튼 눌러주세요.");
      return;
    }
  };

  return (
    <div className="screen">
      <div className="check">
        <div className="check__input1">
          <label htmlFor="company">
            <span>회사</span>{" "}
            <select
              style={{ width: "150px" }}
              className="form-select"
              onChange={companyChange}
              value={company}
            >
              <option value={""}>선택</option>
              {companies.map((v, idx) => (
                <option key={idx} value={v.label}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="enroll__date">
            <span>등록일자</span>{" "}
            <input
              type="date"
              id="enroll__date"
              value={date.toISOString().split("T")[0]}
              readOnly
            />
          </label>
          <label htmlFor="enroll">
            <span>등록자</span>{" "}
            <input
              type="text"
              id="enroll"
              value={enroller}
              onChange={(e) => setEnroller(e.target.value)}
            />
          </label>
        </div>
        <div className="check__input2">
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
          <label htmlFor="password">
            <span>비밀번호</span>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <button onClick={save}>저장</button>
        <button onClick={() => closemake()}>닫기</button>
      </div>
    </div>
  );
}

export default Create;
