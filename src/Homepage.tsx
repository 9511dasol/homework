import { ChangeEvent, useEffect, useState } from "react";
import "./Homepage.css";
// import { Link } from "react-router-dom";
import { headers, items, companies, Item, Item2 } from "./Component/ingredients"; // 데이터이스 연결후 삭제 예정
import Modal from "react-modal";
import Create from "./Component/Create";
import Modify from "./Component/Modify";
import Content from "./Component/Content";
import Paging from "./Component/Paging";
import axios from "axios";
Modal.setAppElement("#root");

function Homepage() {
  const [selection, setSelection] = useState<string[]>([]);
  const [now, setNow] = useState<Item[]>(items);
  const [len, setLen] = useState<number>(now.length > 0 ? now.length : 0);
  const [company, setCompany] = useState<string>("");
  const [enroller, setEnroller] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const today: Date = new Date();
  const oneMonthAgo: Date = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);
  const [date1, setDate1] = useState<Date>(oneMonthAgo);
  const [date2, setDate2] = useState<Date>(today);
  const [make, setMake] = useState<boolean>(false);
  const [modi, setModi] = useState<boolean>(false);
  const [spectify, setSpectify] = useState<boolean>(false);
  const [num, setNum] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const limit = 10; // 0 ~ 7
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [now1, set1Now] = useState<Item2[]>([]);

  const getInfo = async () => {
    try {
      const response = await axios.get<Item2[]>('/api/epps');
      let tenp:Item2[] = []; 

      for (let i = (page - 1) * limit; i < limit * page && i < response.data.length; i++) {
        tenp.push(response.data[i]);
      }

      set1Now(tenp);
      setIsLoading(false);
      setLen(response.data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getInfo();


  }, [make, modi]);



  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    // 체크된 상태에서 배열에 값을 추가하거나 제거
    if (checked) {
      setSelection((prev) => [...prev, value]);
    } else {
      setSelection((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleDate1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setDate1(new Date(selectedDate));
  };

  const handleDate2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setDate2(new Date(selectedDate));
  };

  const companyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCompany(event.target.value);
  };

  const del = () => {
    if (selection.length === 0) {
      alert("체크된 게 없습니다. 확이인하여 주세요");
      return;
    } else {
      for (let i = 0; i < selection.length; ++i) {
        const PW = now[+selection[i]].password;
        if (PW === prompt("비밀번호:")) {
          setNow((prev) =>
            prev.filter((v, idx) => !selection[i].includes(idx + ""))
          );
        } else {
          alert("비밀번호가 틀립니다.")
        }
      }
    }

    setSelection([]);
  };

  const checking = () => {
    let temped = items; // 원본 데이터로 필터링 시작

    // 날짜 범위 필터링
    if (date1 && date2) {
      temped = temped.filter((v) => {
        const rowDate = v.date.getTime();
        return date1.getTime() <= rowDate && rowDate <= date2.getTime();
      });
    }

    // 회사 필터링
    if (company) {
      temped = temped.filter((v) => v.company === company);
    }

    // 등록자 필터링
    if (enroller) {
      temped = temped.filter((v) => v.enroller === enroller);
    }

    // 제목 필터링
    if (title) {
      temped = temped.filter((v) => v.title.includes(title));
    }

    // 필터링된 결과를 now 상태에 반영
    setNow(temped);

    // 디버깅 정보 출력
    console.log("Filtered items:", temped);
  };

  const openmake = () => setMake(true);
  const closemake = () => setMake(false);

  const openmodi = (num: number) => {
    setModi(true);
    setNum(num);
  };
  const closemodi = () => setModi(false);

  const confirm = (num: number) => {
    setNum(num);
    setSpectify(true);
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
              <option value={""}>모두</option>
              {companies.map((v, idx) => (
                <option key={idx} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="enroll__date">
            <span>등록일자</span>
            <input
              type="date"
              id="enroll__date"
              value={date1 ? date1.toISOString().split("T")[0] : ""}
              onChange={handleDate1Change}
            />
            ~
            <input
              type="date"
              id="enroll__date"
              value={date2 ? date2.toISOString().split("T")[0] : ""}
              onChange={handleDate2Change}
            />
          </label>
          <label htmlFor="enroll">
            <span>둥록자</span>{" "}
            <input
              type="text"
              id="enroll"
              value={enroller}
              onChange={(e) => setEnroller(e.target.value)}
            />
          </label>
        </div>
        <div className="input2">
          <label htmlFor="title">
            <span>제목</span>{" "}
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
        <div className="check__btn">
          <button onClick={checking}>조회</button>
        </div>
      </div>
      {isLoading ? "Loding" : <div className="table">
      <table>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>
                {header.text} {/* 컬럼명 바인딩 */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {now1.map(({ company, reg_Date, reg_User, title, seq }, index) => (
            <tr key={index}>
              <td className="ch">
                <input
                  type="checkbox"
                  checked={selection.includes(index + "")}
                  onChange={handleCheckboxChange}
                  value={index}
                />
              </td>
              <td>{company}</td>
              <td>{seq}</td>
              <td>
                <span
                  onClick={() => confirm(seq ? +seq : 0)}
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {title}
                </span>
              </td>
              <td>{reg_User}</td>
              <td>{reg_Date.split("T")[0]}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={headers.length + 1} style={{ textAlign: "center" }}>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  <Paging
                    limit={limit}
                    page={page}
                    total={now1.length}
                    setPage={setPage}
                  />
                </span>
                <span>Total Items: {len}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>}

      <div className="buttons">
        <button onClick={openmake}>등록</button>
        <button
          onClick={() => {
            if (selection.length === 1) {
              openmodi(+selection[0]);
            } else {
              alert("체크된 항목이 0개 또는 2개 이상입니다.");
              return;
            }
          }}
        >
          수정
        </button>
        <button onClick={del}>삭제</button>
      </div>
      <Modal isOpen={make} onRequestClose={() => closemake()}>
        <Create len={len} setNow={setNow} closemake={closemake} />
      </Modal>
      <Modal isOpen={modi} onRequestClose={() => closemodi()}>
        <Modify
          now={now}
          setNow={setNow}
          closemodi={closemodi}
          number={num + 1}
        />
      </Modal>
      <Modal isOpen={spectify} onRequestClose={() => setSpectify(false)}>
        <Content now={now} number={num} setSpectify={setSpectify} />
      </Modal>
    </div>
  );
}

export default Homepage;
