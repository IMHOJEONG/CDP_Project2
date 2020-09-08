import React, { useState } from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
    background: linear-gradient(#00eeee, #9198e5);
    box-shadow: inset 12px 12px 2px 1px rgba(0, 0, 255, .2);
    font-family: 'Diplomata', cursive;
    padding: 10px 0;
    text-align: center;
    border-radius: 1em;
`; 

function Header(props){
    return (
        <HeaderDiv>
            Astronomy Picture Of The Day 
        </HeaderDiv>
    );
}

export default Header;