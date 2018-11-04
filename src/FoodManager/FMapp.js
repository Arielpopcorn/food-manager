import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Title from '../Forms/Title'
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Navigation from '../Navigations/Navigation'
import { ReactComponent as DefaultBuySVG } from '../Icons/buy.svg'
import {ReactComponent as DefautdeleteSVG} from '../Icons/delete.svg'
// import Stepper from '../Forms/Stepper';

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

const BuySVG = styled(DefaultBuySVG)`
    width: 25px;
`

const DeleteSVG = styled(DefautdeleteSVG)`
    width: 25px;
`

const Ul = styled.ul`
    text-decoration: none;
    list-style: none;
    padding-left: 0;
`

const ButtonName = styled.p`
    margin: 0;
`

const PutInList = styled(Button)`
    height: 50px; 
    color: black
    background: skyblue;

    &:hover {
        cursor: pointer;
    }  
    ${p => p.empty ? `
        background: #ccc;
        color: white
        &:hover {
            cursor: auto;
        }  
    `: null}
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const ItemName = styled.h2`
    padding-right: 27px;
    font-size: 20px;
`

const Li = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px;
`


class FMapp extends React.Component{

        constructor(props){
            super(props);
            this.state = {
                inputValue: '',
                isEmpty: true
            };

        }

        handleChange = (e) =>{
            const isEmpty = e.target.value.length === 0
            this.setState({
                inputValue: e.target.value,
                isEmpty
            })
        }

        handleSubmit = (e) => {


            this.props.fMappHandleSubmit(e, this.state.inputValue)

            this.setState({
                inputValue: ""
            })
        }


        render(){
            //const { shoppingList, fMappDeletehandleOnClick, fMappHandleSubmit, fMappCompletedhandleOnClick } = this.props
            //console.log(shoppingList)
            console.log(this.props.item)
        return(
            <div>
                {/* <Stepper /> */}
                <Navigation />
                <ContentContainer>
                    <Title>Food Manager</Title>
                    <ListContainer>
                        <form onSubmit={this.handleSubmit}>
                            <Input type="text" value={this.state.inputValue} onChange={this.handleChange}/>
                            <PutInList empty={this.state.isEmpty}>Put In List</PutInList>
                        </form> 
                        <Ul>
                            {this.props.shoppingList.map((item) =>
                                <Li key={item.id}><ItemName>{item.name}</ItemName>
                                    <Button onClick={(e) => this.props.fMappDeletehandleOnClick(e, item)}><DeleteSVG /><ButtonName>Delete</ButtonName></Button>
                                    <Button onClick={(e) =>  this.props.fMappCompletedhandleOnClick(e,item)}><BuySVG /><ButtonName>Buy</ButtonName></Button>
                                </Li>
    
                
                            )}
                        </Ul>
                    </ListContainer>
                </ContentContainer>
            </div>
        )
    }
}

export default FMapp


//filter:
// const array = ['apples', 'pears', 'bananas']

// const filteredArray = array.filter(item => {
// 	console.log(item)
//   	// must return true or false
//     // true will keep it in the array // pears and bananas to be true
//     // f /alse will delete it/ apples to be false
//   return item !== "apples"
// })
                                   
// console.log(filteredArray)


//shows:
// > "apples"
// > "pears"
// > "bananas"
// > Array ["pears", "bananas"]