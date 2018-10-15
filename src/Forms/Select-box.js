import React from 'react'
import styled from 'styled-components'

class SelectBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: this.props.items || []
        }
    }


    render(){
        return(
            <div>
                {this.state.items.map = (item) => <div key={item.key}>{item.month}</div>}
            </div>
        )
    }
    
}

export default SelectBox