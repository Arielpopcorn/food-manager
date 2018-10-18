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
    }
  }

  fMappHandleSubmit =(e, name) => {
      // this.setState({
      //     value: '',
      //     shoppinglist: this.state.shoppinglist.Push(this.handleChange.value)  
      // });
      // const newShoppingList = [...this.state.shoppinglist, {
      //   id: id,
      //     name: name, // 'banana'
      //     amount: '',
      //     datePurchased: new Date(),
      //     price: ''
      // }]
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

  fMappDeletehandleOnClick2 = (e, itemtobedelete) => {
      const filteredShoppingList = this.state.shoppingList.filter(item =>{
          return item.id !== itemtobedelete.id
      })
      
      this.setState({
          shoppingList:filteredShoppingList
      })
  }

  fMappCompletedhandleOnClick = (e, itemtcompleted) => {
      // const doneShoppingListItem = this.state.shoppingList.filter(item => {
      //     return item.id === itemtcompleted.id
      // })[0]

      
      this.setState({
          purchasesList : [...this.state.purchasesList, itemtcompleted]
      })

      this.fMappDeletehandleOnClick2(e, itemtcompleted)

  }

  //Purchases page-----------------------------------------------//
  //this function will add a new item to your fridge
  putInTheFridge = (e,gonnaputinfridgeitem, price, quantity, fridgeday, expirytDate) => {
      //setState and add item to fridge
      // const putinthefridgeitem = this.state.purchasesList.filter(item =>{
      //   return item.id == gonnaputinfridgeitem.id
      // })[0]

      console.log(gonnaputinfridgeitem)

      const moveditem = this.state.purchasesList.filter(item => {
        return item.id !== gonnaputinfridgeitem.id
      })

      this.setState({
        purchasesList: moveditem,
        fridgeList: [...this.state.fridgeList, {
          name: gonnaputinfridgeitem.name,
          id: gonnaputinfridgeitem.id,
          price: parseInt(price),
          quantity: parseInt(quantity),
          expirytDate: expirytDate,
        }]
      })      
  }


  deleteFromFridge(e,gonnadelete){
    const itemCanceledFroFridge = this.state.fridgeList.filter(item =>{
      return item.id !== gonnadelete.id
    })

    this.setState({
      fridgeList: itemCanceledFroFridge
    })
  }

  //put in food consumed
  putInFoodConsumed = (e, gonnaputinfoodconsumed,used) => {
    const foodconsumed = this.state.fridgeList.filter(item =>{
      return item.id == gonnaputinfoodconsumed.id
    })[0]

    console.log(foodconsumed)

    foodconsumed.used = used

    this.deleteFromFridge(e,gonnaputinfoodconsumed)
    
    this.setState({
      foodconsumedList: [...this.state.foodconsumedList, foodconsumed],
      consumedHistoryList: [...this.state.consumedHistoryList, foodconsumed]
    })
  }

//put in food wasted

  putInFoodWasted = (e, gonnaputinfoodwasted, remain) => {
    const foodwasted = this.state.fridgeList.filter(item => {
      return item.id == gonnaputinfoodwasted.id
    })[0]
    console.log(foodwasted)
    // const { wastedHistoryList } = this.state
    // console.log(wastedHistoryList)

    foodwasted.remain = remain

    this.deleteFromFridge(e,gonnaputinfoodwasted)

    this.setState({
      foodwastedList: [...this.state.foodwastedList, foodwasted],
      wastedHistoryList: [...this.state.wastedHistoryList, foodwasted]
    })
  }

  //save to history
  clearFoodTrack = () => {

    let wastedToHistory 
    for(var i=0; i<this.state.foodwastedList.length;i++){
      wastedToHistory = wastedToHistory + this.state.foodwastedList[i]
    }

    let consumedToHistory
    for(var i=0; i<this.state.foodconsumedList.length;i++){
      consumedToHistory = consumedToHistory + this.state.foodconsumedList[i]
    }

    this.setState({
      foodwastedList: [],
      foodconsumedList: [],
      // history: [...this.state.historyList, wastedToHistory, consumedToHistory]
    })
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
                  fMappDeletehandleOnClick={this.fMappDeletehandleOnClick2} 
                  fMappCompletedhandleOnClick={this.fMappCompletedhandleOnClick} 
                  shoppingList={this.state.shoppingList} {...props}/>} 
                />
              <Route path="/mypurchases" component={(props) =>
                 <MyPurchases 
                 purchasesList={this.state.purchasesList} 
                 putInTheFridgeOnclick={this.putInTheFridge}
                 {...props} />} />
              <Route path="/myfridge" component={(props) => 
                <MyFridge
                fridgeList={this.state.fridgeList} 
                putInFoodConsumedOnclick={this.putInFoodConsumed}
                putInFoodWastedOnclick={this.putInFoodWasted}              
                {...props} />} />
              <Route path="/foodtrack" component={(props) =>
                <FoodTrack
                foodconsumedList={this.state.foodconsumedList}
                foodwastedList={this.state.foodwastedList}  
                cleanFoodTrackOnClick={this.clearFoodTrack}
              {...this.props} />} />
              <Route path="/history" component={(props) => 
                <History
                wastedHistoryList={this.state.wastedHistoryList}
                consumedHistoryList={this.state.consumedHistoryList}
            {...this.props}/>} />
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
