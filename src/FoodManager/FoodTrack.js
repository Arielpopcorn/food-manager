import React from 'react'
import styled from 'styled-components'
import Navigation from '../Navigations/Navigation';
import Titile from '../Forms/Title';
import Button from '../Forms/Button';

class FoodWasted extends React.Component{

    render(){
        console.log(this.props.foodwastedItem)
        return(
            <div>
                {this.props.foodwastedItem.remain}{this.props.foodwastedItem.name}
            </div>
        )
    }
}

class FoodConsumed extends React.Component{
    render(){
        console.log('FoodConsumed:', this.props.foodconsumedItem)
         
        return(
            <div>
                {this.props.foodconsumedItem.used}{this.props.foodconsumedItem.name}
            </div>
        )
    }
}

class FoodTrack extends React.Component{

    howMuchWasted(){
        let total = 0

        for(var i=0;i<this.props.foodwastedList.length;i++){

            total = total + ((this.props.foodwastedList[i].price/this.props.foodwastedList[i].quantity)*this.props.foodwastedList[i].remain)   
        }

        return total
    }

    render(){
        console.log(this.howMuchWasted())
        console.log(this.props.foodwastedList)
        return(
            <div>
                <Navigation />
                <Titile>Food Track</Titile>
                <ul>
                {this.props.foodconsumedList.map((line) => {
                    return(
                    <li><FoodConsumed 
                        foodconsumedItem={line}    
                        />
                    </li>)
                })}
                </ul>

                <ul>
                <h2>You have wasted {this.howMuchWasted()}</h2>
                {this.props.foodwastedList.map((line) =>{ 
                    return(
                    <li>
                        <FoodWasted
                        foodwastedItem={line}
                        />
                    </li>)
                })}
                </ul>

                <Button onClick={this.props.cleanFoodTrackOnClick}>Clear</Button>
            </div>
        )
    }
}

export default FoodTrack