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
      const doneShoppingListItem = this.state.shoppingList.filter(item => {
          return item.id === itemtcompleted.id
      })[0]

      
      this.setState({
          purchasesList : [...this.state.purchasesList, {
            id: doneShoppingListItem.id,
            name: doneShoppingListItem.name, // 'banana'
            datePurchased: new Date(),
          }]
      })

      this.fMappDeletehandleOnClick2(e, itemtcompleted)

  }

  //-----------------------------------------------//

  mypurchasesHandleSubmit = (e,price) => {
    const purchasesList = [].concat(this.state.shoppingList)
    purchasesList.push({
      price: price,
    })
  
    this.setState({
        shoppingList: purchasesList
    })
}

  render() {
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
                 mypurchasesHandleSubmit = {this.mypurchasesHandleSubmit}
                 {...props} />} />
              <Route path="/myfridge" component={MyFridge} />
              <Route path="/foodtrack" component={FoodTrack} />
              <Route path="/history" component={History} />
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
