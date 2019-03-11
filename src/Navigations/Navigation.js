import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { ReactComponent as DefaultQuestionSVG } from '../Icons/question.svg'
import Button from '../Forms/Button';
import Guide from '../FoodManager/Guide';

const NavContainer = styled.nav`
    width: 740px;
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

const QuestionSVG = styled(DefaultQuestionSVG)`
    height: 23px;
    text-align: center;
`

const Li = styled.li`
    list-style: none;
`

const StyledLink = styled(Link)`
    display: flex;
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
        console.log(this.props.toggleGuide)
        return(
            <NavContainer>
                <Li><StyledLink to={"/"}>Food shoppingList</StyledLink></Li>
                <Li><StyledLink to={"/mypurchases"}>My Purchases</StyledLink></Li> 
                <Li><StyledLink to={"/myfridge"}>My Fridge</StyledLink></Li>
                <Li><StyledLink to={"foodtrack/"}>Food Track</StyledLink></Li>
                <Li><StyledLink to={"/history"}>History</StyledLink></Li>
                <Button onClick={this.props.toggleGuide}><QuestionSVG /></Button>
            </NavContainer>
        )
    }
}

export default Navigation