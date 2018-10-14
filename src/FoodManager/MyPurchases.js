import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Titile from '../Forms/Title';
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import Navigation from '../Navigations/Navigation'

class MyPurchases extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            price: ''
        }
    }

    handleChange = (e) => {
    
        this.setState({
            price: e.target.value
        })
    }

    handleSubmit = (e) => {

        this.props.purchasesList(e, this.state.price)

        this.setState({
            
        })
    }

    render(){
        // const { purchaseList } = this.props
        // console.log('purchaseList', purchaseList)
        return(
            <div>
                <Navigation/>
                <Titile>My Purchases</Titile>
                <form onSubmit={this.handleSubmit}>
                    <h1>{}</h1>
                    <Input type="text" onChange = {this.handleChange} />
                    <Button>$$$</Button>
                <ul>
                    {this.props.purchasesList.map((item) => 
                    <li>
                        {item.name}
                    </li>)}
                </ul>
                </form>
            </div>
        )
    }
}

export default MyPurchases