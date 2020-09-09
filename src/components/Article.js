import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ArticleDiv = styled.div`
    display : flex; 
    flex-direction: column;
`;

const WordDiv = styled.div`
    display : flex; 
    flex-direction: column;
    background : #ece6cc;
    border-radius: 1em;
`;

const ImageDiv = styled.img`
    height: 20em;
    padding:3px;
   border:3px solid #021a40;
   background-color:linear-gradient(#f6b73c, #4d9f0c);
   border-radius: 1em;
`;

const TitleDiv = styled.div`
    text-align: center;
    font-size: 35px;
    font-family: 'Passion One', cursive;
`;

const ExplanationDiv = styled.div`
    font-family: 'Kufam', cursive;
    font-size: 25px;
    border: thick double #32a1ce;
`;


function Article(props) {

    const [data, setDatas] = useState(
        {
            date: "",
            explanation: [],
            hdurl: "",
            url:"",
            title: "",
        }
    );
    
    const getData = async () => {
        let check = false;
        const api = await axios.get("https://master-cdp-project2-imhojeong.endpoint.ainize.ai/search")
        // const api = await axios.get("http://127.0.0.1:3000/search")
        .then((res)=>{
            return res.data
        });

        if(!check) {
            console.log(api.data)
            setDatas(
                {
                    date: api.data.date,
                    explanation: api.data.explanation.split(". "),
                    hdurl: api.data.hdurl,
                    title: api.data.title,
                    url: api.data.url,
                }
            )
        }
    
    };


    useEffect(() => {
        let check = false;
        getData();   
    }, [data.title]);

    return (
        <ArticleDiv>
            <ImageDiv src={data.url} />
            <WordDiv>
                <TitleDiv>{data.date} : {data.title}</TitleDiv>                
                { data.explanation.map((item) => {
                    return <ExplanationDiv>
                        {item}
                        </ExplanationDiv>; 
                })}
            </WordDiv>
        </ArticleDiv>
    );
}

export default Article;