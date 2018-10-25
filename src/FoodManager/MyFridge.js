import React from 'react'
import styled from 'styled-components'
import Navigation from '../Navigations/Navigation';
import Titile from '../Forms/Title';
import Button from '../Forms/Button';
import { now } from '../../../../Library/Caches/typescript/2.9/node_modules/moment';
import Input from '../Forms/Input';

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

        if(this.props.fridgeItem.remain == 0){
                binbutton = <Button onClick={(e) => {
                    this.props.putInFoodConsumed(e, this.props.fridgeItem)
                }}>Archive</Button>
            }else{
                binbutton = <Button onClick={(e) => {
                    this.props.putInFoodWasted(e, this.props.fridgeItem)}
                }>Throw in the bin</Button>
            }

        return(
        <div>
            {this.props.fridgeItem.name}
            <Button onClick={() => this.props.fridgeDecresementValue(this.props.fridgeItem.id)}> - </Button>
            {this.props.fridgeItem.remain}/{this.props.fridgeItem.quantity}
            <Button onClick={() => this.props.fridgeIncresementValue(this.props.fridgeItem.id)}> + </Button>
            <h2>{this.props.fridgeItem.expirytDate.endOf('day').fromNow()} days until expiry date.</h2>
            {/* {console.log(this.props.fridgeItem.expirytDate.unix(), Date.now())} */}
            {binbutton}
        </div>)
    }
}



class MyFridge extends React.Component{
    render(){

        console.log(this.props.purchasesList)

        return(
            <div>
                <Navigation />
                <Titile>My Fridge</Titile>
                <ul>
                    {this.props.fridgeList.map((line) => 
                <li>
                    <FridgeItem
                    fridgeItem = {line}
                    fridgeIncresementValue = {this.props.fridgeIncresementValue}
                    fridgeDecresementValue = {this.props.fridgeDecresementValue}
                    putInFoodConsumed = {this.props.putInFoodConsumed}
                    putInFoodWasted = {this.props.putInFoodWasted}
                    />
                </li>    
                )}
                </ul>
                
            </div>
        )
    }
}

export default MyFridge