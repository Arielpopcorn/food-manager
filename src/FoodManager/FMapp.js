import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Title from '../Forms/Title'
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Navigation from '../Navigations/Navigation'
// import Stepper from '../Forms/Stepper';

class FMapp extends React.Component{

        constructor(props){
            super(props);
            this.state = {
                inputValue: '',
            };

        }

        handleChange = (e) =>{
            this.setState({
                inputValue: e.target.value 
            })
        }

        handleSubmit = (e) => {
            this.props.fMappHandleSubmit(e, this.state.inputValue)

            this.setState({
                inputValue: ""
            })
        }


        render(){
            //const { shoppingList, fMappDeletehandleOnClick, fMappHandleSubmit, fMappCompletedhandleOnClick } = this.props
            //console.log(shoppingList)

            console.log(this.props.shoppingList)
        return(
            <div>
                {/* <Stepper /> */}
                <Navigation />
                <Title>Food Manager</Title>
                <form onSubmit={this.handleSubmit}>
                    <Input type="text" value={this.state.inputValue} onChange={this.handleChange}/>
                    <Button>Put In List</Button>
                </form> 
                <ul>
                    {this.props.shoppingList.map((item) =>
                    
                    <li key={item.id}>{item.name}
                        <Button onClick={(e) => this.props.fMappDeletehandleOnClick(e, item)}>Delete</Button>
                        <Button onClick={(e) =>  this.props.fMappCompletedhandleOnClick(e,item)}>Buy</Button>
                    </li>
        
                    )}
                </ul>
                
            </div>
        )
    }
}

export default FMapp


//filter:
// const array = ['apples', 'pears', 'bananas']

// const filteredArray = array.filter(item => {
// 	console.log(item)
//   	// must return true or false
//     // true will keep it in the array // pears and bananas to be true
//     // f /alse will delete it/ apples to be false
//   return item !== "apples"
// })
                                   
// console.log(filteredArray)


//shows:
// > "apples"
// > "pears"
// > "bananas"
// > Array ["pears", "bananas"]