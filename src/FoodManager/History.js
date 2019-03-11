import React from 'react'
import styled from 'styled-components'
import Navigation from '../Navigations/Navigation';
import Title from '../Forms/Title'
import Button from '../Forms/Button';
import {Link} from 'react-router-dom'
import moment from 'moment'
import DefaultButton from '../Forms/Button'
import Guide from './Guide'

const ButtonToClick = styled(DefaultButton)`
    background-color: skyblue;
    padding: 10px 14px;
    margin: 0 10px;
`

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
`

const ButtonContainer = styled.div`
    display: flex;
`

// class ConsumedHistory extends React.Component{
//     render(){
//         console.log(this.props.consumedHistory)

//         if(this.props.consumedHistory.used == 0){
//             return null
//         }else{
//         return(
//             <div>
//                 {this.props.consumedHistory.used}
//                 {this.props.consumedHistory.name}
//             </div>
//         )}
//     }
// }

// class WastedHistory extends React.Component{
    
//     render(){
//         console.log(this.props.wastedHistory)

//         if(this.props.wastedHistory.remain == 0){
//             return null
//         }else{
//         return(
//             <div>
//                 {this.props.wastedHistory.remain}
//                 {this.props.wastedHistory.name}
//                 {/* {this.props.wastedHistory} */}
//             </div>
//         )}
//     }
// }




class History extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            filter: {
                value: 3,
                unit: 'days'
            }
        }
    }

    wastedFilterTime = (time,unit) => {

        //console.log(filtredWastedHistory)
        if(this.state.filter.value === undefined){
            return this.props.wastedHistoryList
        }

        const filtredWastedHistory = this.props.wastedHistoryList.filter(item =>{
    
            return item.dayputinfridge > moment().subtract(time, unit).unix()
        })
        return filtredWastedHistory

        // filtredWastedHistory={this.props.filtredWastedHistory}
    }

    consumedFilterTime = (time,unit) => {

        //console.log(filtredWastedHistory)
        if(this.state.filter.value === undefined){
            return this.props.consumedHistoryList
        }

        const filtredConsumedHistory = this.props.consumedHistoryList.filter(item =>{
    
            return item.dayputinfridge > moment().subtract(time, unit).unix()
        })

        return filtredConsumedHistory

        // filtredWastedHistory={this.props.filtredWastedHistory}
    }
   

    render(){
        //console.log(this.filtredWastedHistory)
        return(
            
            <div>
                <ContentContainer>
                    <Navigation toggleGuide={this.props.toggleGuide}/>
                    <Title>History</Title>
                    {/* <ul>
                        <h2>Wasted</h2>
                        <p>You have wasted {this.props.howMuchWasted()}</p>
                        {this.props.wastedHistoryList.map((line) =>{
                            return(
                            <li>
                                <WastedHistory
                                wastedHistory={line} />
                            </li>
                            )})
                        }
                    </ul>
                    <ul>
                        <h2>Consumed</h2>
                        {this.props.consumedHistoryList.map((line)=>{
                            return(
                                <li>
                                    <ConsumedHistory
                                    consumedHistory={line} />
                                </li>
                            )})
                        }
                    </ul> */}
                    <ConsumeWasteContainer>
                        <Ul>
                            <h2>Wasted</h2>
                            <p>You have wasted {this.props.howMuchWasted()}</p>
                            {this.wastedFilterTime(this.state.filter.value, this.state.filter.unit).map((item) => {
                                return(
                                <Li>{item.remaining} {item.name}</Li>
                                )})
                            }
                        </Ul>
                        <Ul>
                            <h2>Consumed</h2>
                            {this.consumedFilterTime(this.state.filter.value, this.state.filter.unit).map((item) => {
                                return(
                                <Li>{item.used} {item.name}</Li>
                                )})
                            }
                        </Ul>
                    </ConsumeWasteContainer>
                    <ButtonContainer>
                        <ButtonToClick onClick={() => this.setState({
                            filter: {
                                value: 7,
                                unit: 'days'
                            }})}>In A Week</ButtonToClick>
                        <ButtonToClick onClick={() => this.setState({
                            filter: {
                                value: 1,
                                unit: 'months'
                            }
                        })}>In A Month</ButtonToClick>
                        <ButtonToClick onClick={() => this.setState({
                            filter: {
                                valur: 3,
                                unit: 'months'
                            }
                        })}>In 3 Months</ButtonToClick>
                        <ButtonToClick onClick={this.props.clearHistory}>Clear History</ButtonToClick>
                    </ButtonContainer>
                    <Guide show={this.props.show} toggleGuide={this.props.toggleGuide}/>
                </ContentContainer>
            </div>
        )
    }
}

export default History