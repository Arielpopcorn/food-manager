import React from 'react'
import styled from 'styled-components'
import Button from './Button';
import Input from './Input';

class Stepper extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            number: 0
        }
    }

    incrementValue = () => {
        const addnumber = this.state.number + 1;
        this.setState({
            number: addnumber 
        })
    }

    decrementValue = () => {
        const minusnumber = this.state.number - 1;
        this.setState({
            number: minusnumber 
        })
    }



    render(){
        return(
        <div>
            <Button onClick={this.decrementValue}> - </Button>
            <Input type="number" value={this.state.number} />
            <Button onClick={this.incrementValue}> + </Button>
        </div>
        )
    }
}

export default Stepper