import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const NavContainer = styled.nav`
    width: 634px;
    display: flex;
    margin: 60px auto 30px;
    @media (max-width: 700px) {
        display: grid;
        grid-template-columns: 1fr;
        height: 200px;
        width: 290px;
        align-items: center;
        margin-top: 30px;
    }
    /* @media (max-width: 300px) {
        position: static;
        display: grid;
        grid-template-columns: 1fr;
        height: 200px;
        align-items: center;
    } */
`

const Li = styled.li`
    list-style: none;
`

const StyledLink = styled(Link)`
    background-color: #fafafa;
    color: #000;
    text-decoration: none;
    font-size: 18px;
    padding: 14px 16px;
    &:hover{
        background-color: skyblue;
        box-shadow: 1px 2px 2px #aaaaaa;
    }
    @media (max-width: 700px) {
        /* padding: 30px 40px; */
        display: grid;
        justify-content: center;
        padding: 4px 6px;
    }
`

class Navigation extends React.Component{
    render(){
        return(
            <NavContainer>
                <Li><StyledLink to={"/"}>Food Manager</StyledLink></Li>
                <Li><StyledLink to={"/mypurchases"}>My Purchases</StyledLink></Li> 
                <Li><StyledLink to={"/myfridge"}>My Fridge</StyledLink></Li>
                <Li><StyledLink to={"foodtrack/"}>Food Track</StyledLink></Li>
                <Li><StyledLink to={"/history"}>History</StyledLink></Li>               
            </NavContainer>
        )
    }
}

export default Navigation