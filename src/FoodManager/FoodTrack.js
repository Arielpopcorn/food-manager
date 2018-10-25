import React from 'react'
import styled from 'styled-components'
import Navigation from '../Navigations/Navigation';
import Titile from '../Forms/Title';
import Button from '../Forms/Button';

class FoodWasted extends React.Component{

    render(){
        console.log(this.props.foodwastedItem)

        if(this.props.foodwastedItem.remain == 0){
            return null
        }else{
        return(
            <div>
                {this.props.foodwastedItem.remain}{this.props.foodwastedItem.name}
            </div>
        )}
    }
}

class FoodConsumed extends React.Component{
    render(){
        console.log('FoodConsumed:', this.props.foodconsumedItem)
         
        if(this.props.foodconsumedItem.used == 0){
            return null
        }else{
            return(
                <div>
                    {this.props.foodconsumedItem.used}{this.props.foodconsumedItem.name}
                </div>
        )}
    }
}

class FoodTrack extends React.Component{

    render(){
        // console.log(this.howMuchWasted())
        console.log(this.props.foodconsumedList)
        
        return(
            <div>
                <Navigation />
                <Titile>Food Track</Titile>
                <ul>
                    <h2>Consumed</h2>
                    {this.props.foodconsumedList.map((line) => {
                        return(
                        <li><FoodConsumed 
                            foodconsumedItem={line}    
                            />
                        </li>)
                    })}
                </ul>
{/* --------------------------------------------- */}
                <ul>
                    <h2>Wasted</h2>
                    <p>You have wasted {this.props.howMuchWasted()}</p>
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