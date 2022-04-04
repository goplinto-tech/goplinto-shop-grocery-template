import styled from "styled-components";

export const ProductImage=styled.img`
width: 168px;
height: 168px;


border-radius: 8px;
opacity: 1;
`
export const ProductName=styled.h3`
text-align: left;
font-size: 20px;
font-weight: 500;
letter-spacing: 0.48px;
color: #242424;
opacity: 1;
`
export const Star=styled.span`
display: inline-block;  
cursor: pointer;
color:${props => props.active?"#D85A5A":"#24242440"} `

export const Price=styled.p`
font-weight:600;
font-size:24px;
font: normal normal 600 24px/32px Montserrat;
letter-spacing: 0.58px;
color: #242424;
opacity: 1;
display:flex;
align-items: center;

`
export const Old=styled.p`
font-weight:normal;
font-size:18px;
text-decoration: line-through;
font: normal normal normal 18px/24px Montserrat;
letter-spacing: 0.43px;
color: #242424BF;
opacity: 1;
display:flex;
align-items: center;

`
export const Discount=styled.p`
font-weight:normal;
font-size:18px;
font: normal normal normal 18px/24px Montserrat;
letter-spacing: 0.43px;
color: #00A100;
opacity: 1;
display:flex;
align-items: center;

`
export const AddButton=styled.button`
background: #FFFFFF 0% 0% no-repeat ;
border: 2px solid #D85A5A;
border-radius: 4px;
opacity: 1;
text-align: center;

letter-spacing: 0.58px;
color: #242424;

font-size: 18px;
font-weight: 600;

font-family: Montserrat;
`
export const Blocker=styled.div`
width:102.74px;
height:38.98px;
`
export const ProductDescription=styled.p`
font: normal normal normal 18px/28px Montserrat;
letter-spacing: 0.43px;
color: #242424BF;
`