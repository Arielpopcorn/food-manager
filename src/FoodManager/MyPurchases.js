import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Titile from '../Forms/Title';
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import Navigation from '../Navigations/Navigation'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//the purchases line which is including name, quantity, expire date, button to put in the fridge)
class PurchaseItem extends React.Component{

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         price: '',
    //         quantity: 0,
    //         fridgeday: Date.now(),
    //         expirytDate: moment(),
    //     }
    // }
    //for my stepper

    // decresementValue = () => {
    //     const minusnumber = this.state.quantity - 1;

    //     if(this.state.quantity == 0){
    //         return
    //     }

    //     this.setState({
    //         quantity: minusnumber 
    //     })
    // }

    // pricehandleChange = (e) => {
    
    //     this.setState({
    //         price: e.target.value
    //     })
    // }

    // handleSubmit = (e) => {

    //     this.props.purchasesList(e, this.state.price)

    //     this.setState({
            
    //     })
    // }

//for my calender(used npm install from: https://www.npmjs.com/package/react-datepicker)
    // handleChange = (date) => {

    //     this.setState({
    //       expirytDate: date
    //     });
    //   }

    render(){
        console.log(this.props.PurchaseItem)
        return(
            <div>
                {this.props.purchaseItem.name}
                <Button onClick={() => this.props.decrementPurchaseItem(this.props.purchaseItem.id)}> - </Button>
                <Input type="number" value={this.props.purchaseItem.quantity} />
                <Button onClick={() => this.props.incrementPurchaseItem(this.props.purchaseItem.id)}> + </Button>
                {/* <form onSubmit={this.props.handleSubmit}> */}
                    <h2>Price</h2>
                    <Input type="text" value={this.props.purchaseItem.price} onChange={(e) => this.props.pricehandleChange(this.props.purchaseItem.id, e.target.value)} />
                    {/* <Button>$$$</Button> */}
                {/* </form> */}
                    <h2>expiry Date</h2>
                <DatePicker
                    selected={moment(this.props.purchaseItem.expirytDate)}
                    onChange={(date) => {console.log(date);this.props.dateHandleChange(this.props.purchaseItem.id,date)}}
                />
                <Button onClick={(e)=>this.props.putInTheFridge(e,this.props.purchaseItem.id, this.props.purchaseItem, this.props.purchaseItem.quantity)}>Save In My Fridge</Button>
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
                    <li key={line.id}>
                        <PurchaseItem  
                        purchaseItem={line}
                        dateHandleChange={this.props.dateHandleChange}
                        pricehandleChange={this.props.pricehandleChange}
                        incrementPurchaseItem={this.props.incrementPurchaseItem}
                        decrementPurchaseItem={this.props.decrementPurchaseItem}
                        putInTheFridge={this.props.putInTheFridge}
                        />
                        
                        {/* {item.name} */}
                    </li>)}
                </ul>
                
                
            </div>
        )
    }
}

export default MyPurchases
