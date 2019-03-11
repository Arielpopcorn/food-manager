import React from 'react'
import styled from 'styled-components'
import { Spring } from 'react-spring'


const GuideCard = styled.div`
    overflow: scroll;
    padding: 0px 20px;
    text-align: left;
	position: relative;
	background: pink;
	height: 400px;
	width: 600px;
	box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
	z-index: 1;
`
const CloseButton = styled.button`
	position: absolute;
	right: 0;
	top: 0;
`

const CardBackground = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	background: black;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.9;
`

class Guide extends React.Component{

    // state={
    //     pageon: true,
    // }

    // closeToggle = () => {
    //     this.setState({
    //         pageon: !this.state.pageon
    //     })
    // }

    render(){
        return(
            <>
            {this.props.show ? 
                <CardBackground onClick={this.props.toggleGuide}>
                    <Spring from={{opacity: '0'}}
                            to={{opacity: '1'}}>
                        {props => 
                            <GuideCard style={props}>
                                <h1>This is the Guide of Fridge Manager.</h1>
                                <p>Do you  have the problem that you always forget the expiry date of your food in the fridge?<br/>
                                This app help you to record them, you will never forget them anymore!</p>
                                <p>Step 1(Food ShoppingList):<br/> Listing food you want to buy in the food shopping list.<br/>
                                    When you buy it you can click "Buy", if you want to delete it, click "Delete".
                                </p>
                                <p>Step 2(My Prchases):<br/> Finished buying food?<br/>
                                    Choose the Quantity, Price, Expiry Date for your food before put them into the fridge!                               
                                </p>
                                <p>Step 3(My Fridge):<br/>Check your food here without open the fridge.<br/>
                                    It will show every food you put in the fridge, the reminde will turn red before the item goes off.<br/>
                                    You also can record each item you used here, like one egg out of ten.<br/>
                                    Umless you finish the food, You can click "Archive", otherwise you can only click "Throw in the bin".<br/>
                                    You also can use "Search" to find to food.
                                </p>
                                <p>Step 4(Food Track):<br/>Everything out of your fridge will be save in here.<br/></p>
                                <CloseButton onClick={this.props.toggleGuide}>X</CloseButton>
                            </GuideCard>
                        }
                    </Spring>
                </CardBackground>
                 : null}
            </>)
            }
}


export default Guide