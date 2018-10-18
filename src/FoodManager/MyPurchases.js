import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Titile from '../Forms/Title';
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import Navigation from '../Navigations/Navigation'
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';

//the purchases line which is including name, quantity, expire date, button to put in the fridge)
class PurchaseItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            price: '',
            quantity: 0,
            fridgeday: Date.now(),
            expirytDate: moment(),
        }
    }
    //for my stepper
    incresementValue = () => {
        const addnumber = this.state.quantity + 1;
        this.setState({
            quantity: addnumber 
        })
    }   

    decresementValue = () => {
        const minusnumber = this.state.quantity - 1;
        this.setState({
            quantity: minusnumber 
        })
    }

    pricehandleChange = (e) => {
    
        this.setState({
            price: e.target.value
        })
    }

    handleSubmit = (e) => {

        this.props.purchasesList(e, this.state.price)

        this.setState({
            
        })
    }

//for my calender(used npm install from: https://www.npmjs.com/package/react-datepicker)
    handleChange = (date) => {

        this.setState({
          expirytDate: date
        });
      }

    render(){
        console.log(this.props.purchaseItem)
        console.log(this.props.weCanNamethisanything)
        return(
            <div>
                {this.props.purchaseItem.name}
                <Button onClick={this.decresementValue}> - </Button>
                <Input type="number" value={this.state.quantity} />
                <Button onClick={this.incresementValue}> + </Button>
                <form onSubmit={this.handleSubmit}>
                    <h2>Price</h2>
                    <Input type="text" onChange = {this.pricehandleChange} />
                    {/* <Button>$$$</Button> */}
                </form>
                    <h2>expiry Date</h2>
                <DatePicker
                    selected={this.state.expirytDate}
                    onChange={this.handleChange}
                />

                <Button onClick={(e)=>this.props.weCanNamethisanything(e, this.props.purchaseItem, this.state.price, this.state.quantity, this.state.fridgeday, this.state.expirytDate)}>Save In My Fridge</Button>
            </div>
        )
    }
}



class MyPurchases extends React.Component{



    render(){
        // const { purchaseList } = this.props
        // console.log('purchaseList', purchaseList)
        //console.log(this.props.purchasesList)
        console.log('MyPurchases this.props',this.props)
        
        return(
            <div>
                <Navigation/>
                <Titile>My Purchases</Titile>
                {/* <PurchaseItem /> */}
                <ul>
                    {this.props.purchasesList.map((line) => 
                    <li>
                        <PurchaseItem  
                        purchaseItem={line}
                        weCanNamethisanything={this.props.putInTheFridgeOnclick}
                        />
                        
                        {/* {item.name} */}
                    </li>)}
                </ul>
                
                
            </div>
        )
    }
}

export default MyPurchases
