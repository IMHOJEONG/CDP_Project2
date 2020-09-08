import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ArticleDiv = styled.div`
    display : flex; 
`;

const WordDiv = styled.div`
    display : flex; 
    flex-direction: column;
    background : #ece6cc;
    border-radius: 1em;
`;

const ImageDiv = styled.img`
    width: 10em;
    height: 20em;
    padding:3px;
   border:3px solid #021a40;
   background-color:linear-gradient(#f6b73c, #4d9f0c);
   border-radius: 1em;
`;

const TitleDiv = styled.div`
    text-align: center;
    font-size: 25px;
    font-family: 'Passion One', cursive;
`;

const ExplanationDiv = styled.div`
    font-family: 'Kufam', cursive;
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
        const api = await axios.get("http://192.168.122.11:3000/search/",{
            mode: 'no-cors',
            method: 'GET',
            withCredentials: true,
            credentials: 'same-origin',
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then((res)=>{
            return res.data
        });

        if(!check) {
            console.log(api);
            setDatas(
                {
                    date: api.date,
                    explanation: api.explanation.split("."),
                    hdurl: api.hdurl,
                    title: api.title,
                    url: api.url,
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
                <TitleDiv>{data.title} - {data.date}</TitleDiv>                
                { data.explanation.map((item) => {
                    return <ExplanationDiv>{item}.</ExplanationDiv>; 
                })}
            </WordDiv>
        </ArticleDiv>
    );
}

export default Article;