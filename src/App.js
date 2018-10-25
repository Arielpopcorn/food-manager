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
import { isMoment } from '../../../Library/Caches/typescript/2.9/node_modules/moment';
import moment from 'moment';
import OneWeekTrack from './FoodManager/OneWeekTrack';



let id = 1;

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
 
      const newShoppingList = [].concat(this.state.shoppingList)
      newShoppingList.push({
          id: id,
          name: name, // 'banana'
      })
      
      id++

      this.setState({
          shoppingList: newShoppingList,
      });
      e.preventDefault();
  }

  fMappDeletehandleOnClick = (e, itemtobedelete) => {
      const filteredShoppingList = this.state.shoppingList.filter(item =>{
          return item.id !== itemtobedelete.id
      })
      
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
          expirytDate: moment()
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

  //Price input

  pricehandleChange = (itemId, itemprice) => {
    const newItem = this.getItem('purchasesList',itemId)
    newItem.price = itemprice
    this.updateItem('purchasesList', newItem)
  }


  //for my calender(used npm install from: https://www.npmjs.com/package/react-datepicker)
  dateHandleChange = (itemId,itemDate) => {
    const newItem = this.getItem('purchasesList',itemId)
    newItem.expirytDate = itemDate
    this.updateItem('purchasesList',newItem)
  }

  //this function will add a new item to your fridge
  putInTheFridge = (e,itemId,itemShouldBeDelete,remain) => {
      const newItem = this.getItem('purchasesList',itemId)
      newItem.used = 0
      newItem.remain = remain

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
    newItem.remain = newItem.remain + 1
    this.updateItem('fridgeList', newItem)
}  

  fridgeDecresementValue = (itemId) => {
    const newItem = this.getItem('fridgeList',itemId)
    newItem.remain = newItem.remain - 1
    this.updateItem('fridgeList', newItem)
  }


  deleteFromFridge(e,gonnadelete){
    const itemCanceledFromFridge = this.state.fridgeList.filter(item => item.id !== gonnadelete.id
    )

    this.setState({
      fridgeList: itemCanceledFromFridge
    })
  }

  //put in food consumed
  putInFoodConsumed = (e, gonnaputinfoodconsumed) => {
    const foodconsumed = this.state.fridgeList.filter(item =>{
      return item.id == gonnaputinfoodconsumed.id
    })[0]

    console.log(foodconsumed)

    this.deleteFromFridge(e,gonnaputinfoodconsumed)
    
    this.setState({
      foodconsumedList: [...this.state.foodconsumedList, foodconsumed],
      consumedHistoryList: [...this.state.consumedHistoryList, foodconsumed]
    })
  }

//put in food wasted

  putInFoodWasted = (e, gonnaputinfoodwasted) => {
    const foodwasted = this.state.fridgeList.filter(item => {
      return item.id == gonnaputinfoodwasted.id
    })[0]
    console.log(foodwasted)
    console.log(this.foodconsumed)
    
    // const { consumedHistoryList } = this.state
    // console.log(consumedHistoryList)

    this.deleteFromFridge(e,gonnaputinfoodwasted)
    if(foodwasted.remain !== foodwasted.quantity){
      this.putInFoodConsumed(e, gonnaputinfoodwasted)
    }
    
    this.setState({
      foodwastedList: [...this.state.foodwastedList, foodwasted],
      wastedHistoryList: [...this.state.wastedHistoryList, foodwasted]
      // consumedHistoryList: [...this.state.consumedHistoryList, this.foodconsumed]
    })
  }

  // calculateConsumedAndWasted(){
  //   putInFoodWasted(e, gonnaputinfoodwasted, remain)
  //   putInFoodConsumed(e, gonnaputinfoodconsumed, used)

  // }
  //save to history
  clearFoodTrack = () => {

    // console.log(this.state.foodconsumedList)

    // let wastedToHistory 
    // for(var i=0; i<this.state.foodwastedList.length;i++){
    //   wastedToHistory = wastedToHistory + this.state.foodwastedList[i]
    // }

    // let consumedToHistory
    // for(var i=0; i<this.state.foodconsumedList.length;i++){
    //   consumedToHistory = consumedToHistory + this.state.foodconsumedList[i]
    // }

    this.setState({
      foodwastedList: [],
      foodconsumedList: [],
      // wastedHistoryList: [...this.state.wastedHistoryList, wastedToHistory],
      // foodconsumedList: [this.state.foodconsumedList, consumedToHistory]
    })
  }

  howMuchWasted = () => {
    let total = 0

    for(var i=0;i<this.state.foodwastedList.length;i++){

        total = total + ((this.state.foodwastedList[i].price/this.state.foodwastedList[i].quantity)*this.state.foodwastedList[i].remain)   
    }

    return total
    
    // this.setState({
    //   totalmoneywasted: totalmoneywasted + total,
    // })
   }

   howMuchWastedHistory = () => {
    let total = 0

    for(var i=0;i<this.state.wastedHistoryList.length;i++){

        total = total + ((this.state.wastedHistoryList[i].price/this.state.wastedHistoryList[i].quantity)*this.state.wastedHistoryList[i].remain)   
    }

    return total
    
    
   }

  //  filterTime = (time,unit) => {
  //   //console.log(filtredWastedHistory)
  //   if(this.state.filter.value === undefined){
  //       return this.props.wastedHistoryList
  //   }

  //   const filtredWastedHistory = this.props.wastedHistoryList.filter(item =>{

  //       return item.dayputinfridge.unix() > moment().subtract(time, unit).unix()
  //   })
  //   return filtredWastedHistory

  //   // filtredWastedHistory={this.props.filtredWastedHistory}
  //   }


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
                 pricehandleChange = {this.pricehandleChange}
                 dateHandleChange = {this.dateHandleChange}
                 handleSubmit = {this.handleSubmit}
                 {...props} />} />
              <Route path="/myfridge" component={(props) => 
                <MyFridge
                fridgeList={this.state.fridgeList} 
                putInFoodConsumed={this.putInFoodConsumed}
                putInFoodWasted={this.putInFoodWasted} 
                fridgeIncresementValue={this.fridgeIncresementValue}
                fridgeDecresementValue={this.fridgeDecresementValue}          
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
