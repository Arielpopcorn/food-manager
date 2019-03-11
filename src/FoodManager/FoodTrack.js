import React from 'react'
import styled from 'styled-components'
import Navigation from '../Navigations/Navigation';
import Titile from '../Forms/Title';
import Button from '../Forms/Button';
import DefaultButton from '../Forms/Button'
import Guide from './Guide'

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

const ConsumeWasteContainer = styled.div`
    display: flex;
    @media (max-width: 900px) {
        flex-direction: column;
    }
`

const ButtonToClick = styled(DefaultButton)`
    background-color: skyblue;
    padding: 10px 14px;
    margin: 0 10px;
`
const Ul = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    background-color: #e6e6e6;
    margin: 30px 40px;
    padding: 20px 30px;
    @media (max-width: 900px) {
        width: auto;
    }
`

const Li = styled.div`
    display: flex;
    align-items: center;
    /* padding: 5px 20px; */
    /* margin: 20px auto; */
`

class FoodWasted extends React.Component{

    render(){
        console.log(this.props.foodwastedItem)

        if(this.props.foodwastedItem.remaining == 0){
            return null
        }else{
        return(
            <div>
                {this.props.foodwastedItem.remaining} {this.props.foodwastedItem.name}
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
                    {this.props.foodconsumedItem.used} {this.props.foodconsumedItem.name}
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
                <ContentContainer>
                    <Navigation toggleGuide={this.props.toggleGuide}/>
                    <Titile>Food Track</Titile>
                    <ConsumeWasteContainer>
                        <Ul>
                            <h2>Consumed</h2>
                            {this.props.foodconsumedList.map((line) => {
                                return(
                                <Li><FoodConsumed 
                                    foodconsumedItem={line}    
                                    />
                                </Li>)
                            })}
                        </Ul>
        {/* --------------------------------------------- */}
                        <Ul>
                            <h2>Wasted</h2>
                            <p>You have wasted {this.props.howMuchWasted()}</p>
                            {this.props.foodwastedList.map((line) =>{ 
                                return(
                                <Li>
                                    <FoodWasted
                                    foodwastedItem={line}
                                    />
                                </Li>)
                            })}
                        </Ul>
                    </ConsumeWasteContainer>
                <ButtonToClick onClick={this.props.cleanFoodTrackOnClick}>Clear</ButtonToClick> 
                <Guide show={this.props.show} toggleGuide={this.props.toggleGuide}/>   
                </ContentContainer>
            </div>
        )
    }
}

export default FoodTrack