import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Navigation from '../Navigations/Navigation';
import Titile from '../Forms/Title';
import DefaultButton from '../Forms/Button';
import { now } from '../../../../Library/Caches/typescript/2.9/node_modules/moment';
import Input from '../Forms/Input';
import {ReactComponent as DefaultminusSVG} from '../Icons/minus.svg'
import {ReactComponent as DefaultplusSVG} from '../Icons/plus.svg'

const PlusSVG = styled(DefaultplusSVG)`
    width: 25px;
`

const MinusSVG = styled(DefaultminusSVG)`
    width: 25px;
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

const ItemName = styled.h2`
    font-size: 25px;
`
const ListContainer = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 890px) {
        flex-direction: column;
    }
`

const Ul = styled.ul`
    text-decoration: none;
    list-style: none;
    padding: 0 20px;
    @media (max-width: 900px) {
        display: grid;
        grid-template-columns: repeat(2,1fr);
    }

    @media (max-width: 500px) {
        grid-template-columns: repeat(1,1fr);
        
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 900px) {
        display: flex;
        align-items: center;
    }
`

const Li = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 20px;
    background-color: #e6e6e6;
    margin: 20px auto;
    @media (max-width: 900px) {
        margin: 20px;
    }
    @media (max-width: 500px) {
        margin: 20px;
        padding: 5px 40px;
    }
`

const Button = styled(DefaultButton)`
    background-color: #e6e6e6;
    height: 25px;
    border: none;
`

const ButtonToClick = styled(DefaultButton)`
    background-color: skyblue;
    padding: 10px 14px;
    margin: 0 10px;
    @media (max-width: 900px) {
        margin: 10px 0;
    }
`

class FridgeItem extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            quantity: props.fridgeItem.quantity
        }
    }

    render(){

        console.log(this.props.fridgeItem)
        let binbutton

        if(this.props.fridgeItem.remaining == 0){
                binbutton = <ButtonToClick onClick={(e) => {
                    this.props.decideConsumedOrWasted(e, this.props.fridgeItem.quantity-this.props.fridgeItem.remaining,this.props.fridgeItem)
                }}>Archive</ButtonToClick>
            }else{
                binbutton = <ButtonToClick onClick={(e) => {
                    this.props.decideConsumedOrWasted(e, this.props.fridgeItem.quantity-this.props.fridgeItem.remaining,this.props.fridgeItem)}
                }>Throw in the bin</ButtonToClick>
            }

        return(
        <div>
            <ListContainer>
                <ItemName>{this.props.fridgeItem.name}</ItemName>
                <ButtonWrapper>
                    <Button onClick={() => this.props.fridgeDecresementValue(this.props.fridgeItem.id)}><MinusSVG/></Button>
                    {this.props.fridgeItem.remaining}/{this.props.fridgeItem.quantity}
                    <Button onClick={() => this.props.fridgeIncresementValue(this.props.fridgeItem.id)}><PlusSVG/></Button>
                </ButtonWrapper>
                <p>{moment(this.props.fridgeItem.expirytDate).endOf('day').fromNow()} days until expiry date.</p>
                {/* {console.log(this.props.fridgeItem.expirytDate.unix(), Date.now())} */}
                {binbutton}
                <ButtonToClick onClick={(e)=>this.props.deletefromFridge(e,this.props.fridgeItem)}>Delete</ButtonToClick>
            </ListContainer>
        </div>)
    }
}



class MyFridge extends React.Component{
    render(){

        console.log(this.props.purchasesList)

        return(
            <div>
                <Navigation />
                <ContentContainer>
                    <Titile>My Fridge</Titile>
                    <Ul>
                        {this.props.fridgeList.map((line) => 
                    <Li>
                        <FridgeItem
                        fridgeItem = {line}
                        fridgeIncresementValue = {this.props.fridgeIncresementValue}
                        fridgeDecresementValue = {this.props.fridgeDecresementValue}
                        decideConsumedOrWasted = {this.props.decideConsumedOrWasted}
                        deletefromFridge = {this.props.deletefromFridge}
                        />
                    </Li>    
                    )}
                    </Ul>
                </ContentContainer>
            </div>
        )
    }
}

export default MyFridge