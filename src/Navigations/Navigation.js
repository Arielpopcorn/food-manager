import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const NavContainer = styled.nav`
    display: flex;
    float: right;
`

const Li = styled.li`

`

const StyledLink = styled(Link)`

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