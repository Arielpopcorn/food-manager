import React from 'react'
import styled from 'styled-components'
import Navigation from '../Navigations/Navigation';
import Titile from '../Forms/Title';
import Button from '../Forms/Button';
import { now } from '../../../../Library/Caches/typescript/2.9/node_modules/moment';

class FridgeItem extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            quantity: props.fridgeItem.quantity
        }
    }

    fridgeIncresementValue = () => {
        const addnumber = this.state.quantity + 1;

        if(this.state.quantity == this.props.fridgeItem.quantity){
            return
        }
        
        this.setState({
            quantity: addnumber 
        })
    }   

    fridgeDecresementValue = () => {
        const minusnumber = this.state.quantity - 1;

        if(this.state.quantity == 0){
            return
        }

        this.setState({
            quantity: minusnumber 
        })
    }
    
    // console.log(this.props.fridgeItem)

    render(){

        console.log(this.props.fridgeItem)
        let binbutton

        if(this.state.quantity == 0){
                binbutton = <Button onClick={(e) => {
                    this.props.newConsumedClick(e, this.props.fridgeItem, this.props.fridgeItem.quantity - this.state.quantity)
                }}>Archive</Button>
            }else{
                binbutton = <Button onClick={(e) => {
                    this.props.newWastedClick(e, this.props.fridgeItem, this.state.quantity)}
                }>Throw in the bin</Button>
            }

        // if(this.state.quantity == this.props.fridgeItem.quantity){
        //     console.log()
        // }

        return(
        <div>
            {this.props.fridgeItem.name}
            <Button onClick={this.fridgeDecresementValue}> - </Button>{this.state.quantity}/{this.props.fridgeItem.quantity}<Button onClick={this.fridgeIncresementValue}> + </Button>
            <h2>{this.props.fridgeItem.expirytDate.endOf('day').fromNow()} days until expiry date.</h2>
            {/* {console.log(this.props.fridgeItem.expirytDate.unix(), Date.now())} */}
            {binbutton}
        </div>)
    }
}



class MyFridge extends React.Component{
    render(){

        console.log(this.props)

        return(
            <div>
                <Navigation />
                <Titile>My Fridge</Titile>
                <ul>
                    {this.props.fridgeList.map((line) => 
                <li>
                    <FridgeItem 
                    fridgeItem = {line}
                    newConsumedClick = {this.props.putInFoodConsumedOnclick}
                    newWastedClick = {this.props.putInFoodWastedOnclick}
                    />
                </li>    
                )}
                </ul>
            </div>
        )
    }
}

export default MyFridge