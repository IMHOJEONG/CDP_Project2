const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const API_KEY = "rvU2JWqSHNFizqfke1599aJG4Ax3GvKmQYXPfSld";
const dateNow = new Date();
dateNow.setDate(dateNow.getDate()-1);
const dateYesterday = dateNow.getFullYear() +"-"+ (dateNow.getMonth()+1) +"-"+ dateNow.getDate();
app.use(cors());

app.use(express.static(path.join(__dirname, '../build')));

app.use('/search', (req, res)=> {
    const api = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&hd=true`;
    // 데이터 data 변수로 변환 
    axios.get(api,   
            {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': 'https://master-cdp-project2-imhojeong.endpoint.ainize.ai/',
                    'Content-Type' : 'application/json',
                    'Acces-Control-Allow-Credentials': 'true'
                },
                withCredentials: true,
                credentials: 'same-origin',
            },)
        .then((makedata)=>{
            console.log(dateNow.getDate()-1);
            
                res.send({
                    data: makedata.data
                });
            
        }).catch(function(error){
            console.log(error);
            const api2 = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&hd=true&date=${dateYesterday}`;
            // 데이터 data 변수로 변환 
                        axios.get(api2,   
                                {
                                    method: 'GET',
                                    mode: 'no-cors',
                                    headers: {
                                        'Access-Control-Allow-Origin': 'https://master-cdp-project2-imhojeong.endpoint.ainize.ai/',
                                        'Content-Type' : 'application/json',
                                        'Acces-Control-Allow-Credentials': 'true'
                                    },
                                    withCredentials: true,
                                    credentials: 'same-origin',
                                },)
                                .then((makedata)=>{
                                    res.send({
                                        data: makedata.data
                                    });
                                }).catch(function(error){
                                    console.log(error);
                                });
        });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const port = 3000;
app.listen(port, ()=>{console.log(
    `Listening on port ${port}`);
    console.log("127.0.0.1:3000");
    }
);