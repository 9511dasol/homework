interface Header {
    text: string;
    value: string;
}

export const headers:Header[] = [
    {
        text: "선택",
        value: "checkBox",
    },
    {
        text: "회사",
        value: "company",
    },
    {
        text: "순번",
        value: "order",
    },
    {
        text: "제목",
        value: "title",
    },
    {
        text: "등록자",
        value: "enroller",
    },
    {
        text: "등록일자",
        value: "date",
    },
];

export interface Item {
    company: string;
    content: string;
    password: string;
    date: Date;
    enroller: string;
    order: string;
    title: string;
}

export interface Item2 {
    company: string;
    content: string;
    password: string;
    reg_Date: string;
    reg_User: string;
    seq: string;
    title: string;
}

export const items:Item[] = [
    {
        company: "삼성",
        order: "1",
        date: new Date("2024-07-29"),
        enroller: "이건희",
        title: "삼성과 함께하는 프로젝트",
        content: "삼성과 함께라면 뭐든 좋습니다요1",
        password: "1234",
    },
    {
        company: "삼성",
        order: "2",
        date: new Date("2024-06-29"),
        enroller: "이건희",
        title: "삼성과 함께하는 프로젝트",
        content: "삼성과 함께라면 뭐든 좋습니다요2",
        password: "1234",
    },
    {
        company: "삼성",
        order: "3",
        date: new Date("2024-05-29"),
        enroller: "이건희",
        title: "삼성과 함께하는 프로젝트",
        content: "삼성과 함께라면 뭐든 좋습니다요3",
        password: "1234",
    },
    {
        company: "삼성",
        order: "4",
        date: new Date("2024-04-29"),
        enroller: "이건희",
        title: "삼성과 함께하는 프로젝트",
        content: "삼성과 함께라면 뭐든 좋습니다요4",
        password: "1234",
    },
    {
        company: "삼성",
        order: "5",
        date: new Date("2024-03-29"),
        enroller: "이건희",
        title: "삼성과 함께하는 프로젝트",
        content: "삼성과 함께라면 뭐든 좋습니다요5",
        password: "1234",
    },
];

export const companies = [
    { label: "EPPS", value: "EPPS" },
    { label: "삼성", value: "Samsung" },
    { label: "현대", value: "Hyundae" },
    { label: "SKT", value: "SKT" },
    { label: "LG", value: "LG" },
];