import React from 'react'
import styled from 'styled-components'
import Navigation from '../Navigations/Navigation';
import Title from '../Forms/Title'
import Button from '../Forms/Button';
import {Link} from 'react-router-dom'
import moment from 'moment'

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
                <Navigation />
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
                <ul>
                    <h2>Wasted</h2>
                    {this.wastedFilterTime(this.state.filter.value, this.state.filter.unit).map((item) => {
                        return(
                        <li>{item.remaining}{item.name}</li>
                        )})
                    }
                </ul>
                <ul>
                    <h2>Consumed</h2>
                    {this.consumedFilterTime(this.state.filter.value, this.state.filter.unit).map((item) => {
                        return(
                        <li>{item.used}{item.name}</li>
                        )})
                    }
                </ul>

                <Button onClick={() => this.setState({
                    filter: {
                        value: 7,
                        unit: 'days'
                    }})}>In A Week</Button>
                <Button onClick={() => this.setState({
                    filter: {
                        value: 1,
                        unit: 'months'
                    }
                })}>In A Month</Button>
                <Button onClick={() => this.setState({
                    filter: {
                        valur: 3,
                        unit: 'months'
                    }
                })}>In 3 Months</Button>
            </div>
        )
    }
}

export default History