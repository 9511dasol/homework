import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./Paging.css";
import styled from "styled-components";
             
const Page = styled.div`
  display:flex;
  button{
    outline: none;
    border: none;
    cursor: pointer;
  }
`

interface Props {
  limit: number;
  page: number;
  total: number;
  setPage: Dispatch<SetStateAction<number>>;
}

function Paging({ limit, page, total, setPage }: Props) {
  const [totalPage, setTotalPage] = useState<number>(Math.ceil(total / limit));
  const [pageStart, setPageStart] = useState<number>(1);
  const [pageEnd, setPageEnd] = useState<number>(10);

  useEffect(() => {
    // 페이지 시작을 설정하는 로직
    if (page % 10 === 0) {
      setPageStart(page - 9);
    } else {
      setPageStart(page - (page % 10) + 1);
    }
  }, [page]);


  useEffect(() => {
    // 페이지 끝을 설정하는 로직
    if (pageStart + 9 > totalPage) {
      setPageEnd(totalPage);
    } else {
      setPageEnd(pageStart + 9);
    }
  }, [pageStart, totalPage]);

  const handleClick = (pageNumber:number) => setPage(pageNumber);
 
  return (
    <Page>
      <button onClick={() => handleClick(1)}>{`<<`}</button>
      <div>
        {pageStart > 1 && (
          <button onClick={() => handleClick(pageStart - 1)}>Previous</button>
        )}
        {Array.from({ length: pageEnd - pageStart + 1 }, (_, i) => (
          <button
            key={pageStart + i}
            onClick={() => handleClick(pageStart + i)}
            style={{
              fontWeight: page === pageStart + i ? "bold" : "normal",
            }}
          >
            {pageStart + i}
          </button>
        ))}
        {pageEnd < totalPage && (
          <button onClick={() => handleClick(pageEnd + 1)}>Next</button>
        )}
      </div>
      <button onClick={() => handleClick(totalPage)}>{`>>`}</button>
    </Page>
  );
}

export default Paging;
