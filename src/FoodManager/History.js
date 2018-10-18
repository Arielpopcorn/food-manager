import React from 'react'
import styled from 'styled-components'
import Navigation from '../Navigations/Navigation';
import Title from '../Forms/Title'

class ConsumedHistory extends React.Component{
    render(){
        console.log(this.props.consumedHistory)
        return(
            <div>
                {this.props.consumedHistory.used}
                {this.props.consumedHistory.name}
            </div>
        )
    }
}

class WastedHistory extends React.Component{
    
    render(){
        console.log(this.props.wastedHistory)

        return(
            <div>
                {this.props.wastedHistory.remain}
                {this.props.wastedHistory.name}
                {/* {this.props.wastedHistory} */}
            </div>
        )
    }
}




class History extends React.Component{
    render(){
        return(
            <div>
                <Navigation />
                <Title>History</Title>
                <ul>
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
                    {this.props.consumedHistoryList.map((line)=>{
                        return(
                            <li>
                                <ConsumedHistory
                                consumedHistory={line} />
                            </li>
                        )})
                    }
                </ul>
            </div>
        )
    }
}

export default History