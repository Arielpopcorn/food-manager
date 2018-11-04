import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import FMapp from './FoodManager/FMapp'
import MyPurchases from './FoodManager/MyPurchases';
import MyFridge from './FoodManager/MyFridge';
import FoodTrack from './FoodManager/FoodTrack';
import History from './FoodManager/History';
import uuidv4 from 'uuid/v4'
import moment from 'moment';
import OneWeekTrack from './FoodManager/OneWeekTrack';


const localStorage = window.localStorage

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      shoppingList: [],
      purchasesList: [],
      fridgeList: [],
      foodwastedList: [],
      foodconsumedList: [],
      wastedHistoryList: [],
      consumedHistoryList: [],
      // totalmoneywasted: 0,
    }
  }

  componentDidMount(){
    this.localStorageIntervalId = setInterval(() => {
      localStorage.setItem('foodManagerState', JSON.stringify(this.state))
    }, 1000)

    const foodManagerState = JSON.parse(localStorage.getItem('foodManagerState'))

    this.setState(foodManagerState)
  }

  componentWillUnmount(){
    clearInterval(this.localStorageIntervalId)
  }

  /*
    arrayName: String
    itemId: Number

    returns: item to update
  */
  getItem = (arrayName, itemId) => {
    return this.state[arrayName].find(item => item.id === itemId)
  }
  /*  
    arrayName: String
    itemId: Number

    returns: undefined
  */
  updateItem = (arrayName, newItem) => {
    const newArray = this.state[arrayName].map(item => {
      if(newItem.id === item.id){
        return newItem
      } else {
        return item
      }
    })

    this.setState({
      [arrayName]: newArray
    })
  }

  deleteItem(arrayName,itemShouldBeDelete){
    return this.state[arrayName].filter(item => item.id !== itemShouldBeDelete.id)
  }


  fMappHandleSubmit =(e, name) => {

    if(name == ''){
      return
    }
      this.setState({
          shoppingList: [...this.state.shoppingList,{
            ...this.shoppingList,
            id: uuidv4(),
            name: name, // 'banana'
          }]
      });
      e.preventDefault();
  }


  fMappDeletehandleOnClick = (e, itemShouldBeDelete) => {
      const filteredShoppingList = this.deleteItem('shoppingList', itemShouldBeDelete)
      
      this.setState({
          shoppingList:filteredShoppingList
      })
  }

  fMappCompletedhandleOnClick = (e, itemtcompleted) => {
      this.setState({
          purchasesList : [...this.state.purchasesList, {
          ...itemtcompleted, 
          price: '',
          quantity: 0,
          dayputinfridge: Date.now(),
          expirytDate: Date.now()
        }]
      })

      this.fMappDeletehandleOnClick(e, itemtcompleted)

  }

  //Purchases page-----------------------------------------------//

  //stepper
  
  incrementPurchaseItem = (itemId) => {
    const newItem = this.getItem('purchasesList', itemId)
    newItem.quantity = newItem.quantity + 1
    this.updateItem('purchasesList', newItem)
  }

  decrementPurchaseItem = (itemId) =>{
    const newItem = this.getItem('purchasesList',itemId)
    newItem.quantity = newItem.quantity -1
    this.updateItem('purchasesList', newItem)
    // newItem.quantity = newItem.quantity - 1
    // const newItemMinus = this.state.purchasesList.map(item => {
    //   if(itemId == item.id){
    //     return newItem
    //   }else{
    //     return item
    //   }
    // })

    // this.setState({
    //   purchasesList: newItemMinus
    // })
  }

  deletefrompurchases = (e,itemShouldBeDelete) => {
    const newpurchasesList = this.deleteItem('purchasesList',itemShouldBeDelete)

    this.setState({
      purchasesList: newpurchasesList
    })
  }

  //Price input

  pricehandleChange = (itemId, itemprice) => {
    const newItem = this.getItem('purchasesList',itemId)
    newItem.price = itemprice
    this.updateItem('purchasesList', newItem)
  }


  //for my calender(used npm install from: https://www.npmjs.com/package/react-datepicker)
  dateHandleChange = (itemId,itemDate) => {
    const newItem = this.getItem('purchasesList',itemId)
    newItem.expirytDate = itemDate.valueOf()
    this.updateItem('purchasesList',newItem)
  }

  //this function will add a new item to your fridge
  putInTheFridge = (e,itemId,itemShouldBeDelete,remaining) => {
      const newItem = this.getItem('purchasesList',itemId)
      newItem.remaining = remaining

      // console.log(gonnaputinfridgeitem)

      const moveditem = this.deleteItem('purchasesList', itemShouldBeDelete)


      this.setState({
        purchasesList: moveditem,
        fridgeList: [...this.state.fridgeList, newItem]
      })      
  }


  //stepper
  fridgeIncresementValue = (itemId) => {
    const newItem = this.getItem('fridgeList',itemId)
    newItem.remaining = newItem.remaining + 1
    this.updateItem('fridgeList', newItem)
}  

  fridgeDecresementValue = (itemId) => {
    const newItem = this.getItem('fridgeList',itemId)
    newItem.remaining = newItem.remaining - 1
    this.updateItem('fridgeList', newItem)
  }


  deletefromFridge = (e,itemShouldBeDelete) => {
    const newfridgeList = this.deleteItem('fridgeList',itemShouldBeDelete)

    this.setState({
      fridgeList: newfridgeList
    })
  }

  putInFoodConsumed = (e, used, gonnaputinfoodconsumed) => {
    const foodconsumed = this.getItem('fridgeList',gonnaputinfoodconsumed.id)
    console.log(foodconsumed)

    foodconsumed.used = used

    const itemCanceledFromFridge = this.deleteItem('fridgeList',gonnaputinfoodconsumed)
    
    this.setState({
      fridgeList: itemCanceledFromFridge,
      foodconsumedList: [...this.state.foodconsumedList, foodconsumed],
      consumedHistoryList: [...this.state.consumedHistoryList, foodconsumed]
    })
  }

//put in food wasted

  putInFoodWasted = (e, gonnaputinfoodwasted) => {
    const foodwasted = this.getItem('fridgeList',gonnaputinfoodwasted.id)
    console.log(foodwasted)
    // const consumedHistoryList = [...this.state.consumedHistoryList]

    // foodwasted.used = used

    const itemCanceledFromFridge = this.deleteItem('fridgeList',gonnaputinfoodwasted)

    // if(foodwasted.remaining !== foodwasted.quantity){
    //   const foodconsumed = this.putInFoodConsumed(e,used, gonnaputinfoodwasted)
    //   console.log('FOOD CONSUMED', foodconsumed)
    // }
    
    this.setState({
      fridgeList: itemCanceledFromFridge,
      foodwastedList: [...this.state.foodwastedList, foodwasted],
      wastedHistoryList: [...this.state.wastedHistoryList, foodwasted]
    })
  }

  decideConsumedOrWasted = (e, used, fridgeItem) => {
    if(fridgeItem.remaining === fridgeItem.quantity){
      this.putInFoodWasted(e,fridgeItem)
    } else if(fridgeItem.remaining === 0){
      this.putInFoodConsumed(e, used, fridgeItem)
    } else {
      this.putInFoodWasted(e,fridgeItem)
      this.putInFoodConsumed(e, used, fridgeItem)
    }
  }

  //save to history
  clearFoodTrack = () => {
    this.setState({
      foodwastedList: [],
      foodconsumedList: [],
    })
  }

  clearHistory = () => {
    this.setState({
      wastedHistoryList: [],
      consumedHistoryList: [],
    })
  }

  howMuchWasted = () => {
    let total = 0

    for(var i=0;i<this.state.foodwastedList.length;i++){

        total = total + ((this.state.foodwastedList[i].price/this.state.foodwastedList[i].quantity)*this.state.foodwastedList[i].remaining)   
    }
      return total
   }

   howMuchWastedHistory = () => {
    let total = 0

    for(var i=0;i<this.state.wastedHistoryList.length;i++){

        total = total + ((this.state.wastedHistoryList[i].price/this.state.wastedHistoryList[i].quantity)*this.state.wastedHistoryList[i].remaining)   
    }
      return total
   }




  render() {
    console.log('MY APP STATE', this.state)
    return (
      <Router>
          <>
              {/* <Route path="/" exact component={() => <div>Hello</div>} /> */}
              <Route path="/" exact render={(props) => 
                <FMapp 
                  fMappHandleSubmit={this.fMappHandleSubmit}
                  fMappDeletehandleOnClick={this.fMappDeletehandleOnClick} 
                  fMappCompletedhandleOnClick={this.fMappCompletedhandleOnClick} 
                  shoppingList={this.state.shoppingList} {...props}/>} 
                />
              <Route path="/mypurchases" component={(props) =>
                 <MyPurchases 
                 purchasesList={this.state.purchasesList} 
                 putInTheFridge={this.putInTheFridge}
                 incrementPurchaseItem={this.incrementPurchaseItem}
                 decrementPurchaseItem = {this.decrementPurchaseItem}
                 deletefrompurchases = {this.deletefrompurchases}
                 pricehandleChange = {this.pricehandleChange}
                 dateHandleChange = {this.dateHandleChange}
                 handleSubmit = {this.handleSubmit}
                 {...props} />} />
              <Route path="/myfridge" component={(props) => 
                <MyFridge
                fridgeList={this.state.fridgeList} 
                decideConsumedOrWasted={this.decideConsumedOrWasted}
                fridgeIncresementValue={this.fridgeIncresementValue}
                fridgeDecresementValue={this.fridgeDecresementValue}   
                deletefromFridge={this.deletefromFridge}       
                {...props} />} />
              <Route path="/foodtrack" component={(props) =>
                <FoodTrack
                foodconsumedList={this.state.foodconsumedList}
                foodwastedList={this.state.foodwastedList}  
                cleanFoodTrackOnClick={this.clearFoodTrack}
                howMuchWasted={this.howMuchWasted}
                {...this.props} />} />
              <Route path="/history" component={(props) => 
                <History
                wastedHistoryList={this.state.wastedHistoryList}
                consumedHistoryList={this.state.consumedHistoryList}
                howMuchWasted={this.howMuchWastedHistory}
                clearHistory={this.clearHistory}
                {...this.props}/>} />
                
              {/* <Route path="/oneweektrack" component={
                <OneWeekTrack
                filterTime={this.filterTime}
                {...this.props}/>} /> */}
          </>
      </Router>
    );
  }
}

// function func(a, b, c, d){
//   // a == fMappHandleSubmit
// }

// func(fMappHandleSubmit, fMappDeletehandleOnClick, fMappCompletedhandleOnClick, shoppingList)

export default App;
