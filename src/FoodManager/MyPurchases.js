import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Titile from '../Forms/Title';
import DefaultInput from '../Forms/Input'
import DefaultButton from '../Forms/Button'
import Navigation from '../Navigations/Navigation'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ReactComponent as DefaultMinusSVG} from '../Icons/minus.svg'
import {ReactComponent as DefautPlusSVG} from '../Icons/plus.svg'


const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
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

const ItemItself = styled.h2`
    padding-left: 25px;
    padding-right: 4px;
    font-size: 17px;
    @media (max-width: 900px) {
        margin-bottom: 5px;
        padding: 0;
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

const PlusSVG = styled(DefautPlusSVG)`
    width: 25px;
`

const Input = styled(DefaultInput)`
    padding: 12px 14px;
    width: 57px;
`

const ItemName = styled.h2`
    font-size: 25px;
`

const MinusSVG = styled(DefaultMinusSVG)`
    width: 25px;
`
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
            <ListContainer>
                <ItemName>{this.props.purchaseItem.name}</ItemName>
                <ItemItself>Quantity</ItemItself>
                <ButtonWrapper>
                    <Button onClick={() => this.props.decrementPurchaseItem(this.props.purchaseItem.id)}><MinusSVG/></Button>
                    <Input type="number" value={this.props.purchaseItem.quantity} />
                    <Button onClick={() => this.props.incrementPurchaseItem(this.props.purchaseItem.id)}><PlusSVG/></Button>
                </ButtonWrapper>
                {/* <form onSubmit={this.props.handleSubmit}> */}
                    <ItemItself>Price</ItemItself>
                    <Input type="number" value={this.props.purchaseItem.price} onChange={(e) => this.props.pricehandleChange(this.props.purchaseItem.id, e.target.value)} />
                    {/* <Button>$$$</Button> */}
                {/* </form> */}
                    <ItemItself>expiry Date</ItemItself>
                <DatePicker
                    selected={moment(this.props.purchaseItem.expirytDate)}
                    onChange={(date) => {console.log(date);this.props.dateHandleChange(this.props.purchaseItem.id,date)}}
                />
                <ButtonToClick onClick={(e)=>this.props.putInTheFridge(e,this.props.purchaseItem.id, this.props.purchaseItem, this.props.purchaseItem.quantity)}>Save In My Fridge</ButtonToClick>
                <ButtonToClick onClick={(e)=>this.props.deletefrompurchases(e,this.props.purchaseItem)}>Delete</ButtonToClick>
            </ListContainer>
        )
    }
}



class MyPurchases extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search: ''
        };
    }

    updateSearch = (e) => {
        this.setState({
            search: e.target.value.substr(0,20)
        })
        //console.log(e.target.value)
    }

    render(){
        // const { purchaseList } = this.props
        // console.log('purchaseList', purchaseList)
        //console.log(this.props.purchasesList)
        console.log('MyPurchases this.props',this.props)
        let filterItem = this.props.purchasesList.filter(
            (purchaseItem) => {
                return purchaseItem.name.toLowerCase().indexOf(
                    this.state.search.toLowerCase()) !== -1
            }
        )
        return(
            <div>
                <Navigation/>
                <ContentContainer>
                    <Titile>My Purchases</Titile>
                        <h2>Search</h2><Input  type="text" 
                                value={this.state.search} 
                                onChange={this.updateSearch}/>
                        <Ul>
                            {filterItem.map((line) => 
                                <PurchaseItem  
                                key={line.id}
                                purchaseItem={line}
                                dateHandleChange={this.props.dateHandleChange}
                                pricehandleChange={this.props.pricehandleChange}
                                incrementPurchaseItem={this.props.incrementPurchaseItem}
                                decrementPurchaseItem={this.props.decrementPurchaseItem}
                                deletefrompurchases={this.props.deletefrompurchases}
                                putInTheFridge={this.props.putInTheFridge}
                            />)}
                        </Ul>
                </ContentContainer>
                
            </div>
        )
    }
}

export default MyPurchases
