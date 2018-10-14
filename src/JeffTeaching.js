import React from 'react'

class ClickableThing extends React.Component {
    render() {
        const { href, handleClick, iconAddress, text } = this.props
        return <>
            <a href={href} onClick={handleClick}>
                <img src={iconAddress} />
                <div>{text}</div>
            </a>
        </>
    }
}

class App extends React.Component {
    render() {
        return <ClickableThing 
            text="Add one" 
            iconAddress="http://someicon.com/img.png" 
            href="http://youtube.com" 
            handleClick={() => console.log('im being clicked')}
        />
        <ClickableThing text="Subtract one"/>
    }
}


////////////////////////////////////// state

class Button extends React.Component {
    render() {
        const { text } = this.props
        return <>
            <button onClick={this.props.handleClick}>
                {text}
            </button>
        </>
    }
}

//// nav


import Button from './Button'

class Nav extends React.Component {
    render() {
        return <div>
            <Button text="go to differen page" handleClick={this.props.navCLick}/>
        </div>
    }
}

/////

import Nav from './Nav'
import Button from './Button'

class App extends React.Component {
    constructor() {
        this.state = {
            counter: 0
        }
    }

    addOne = () =>{
        this.setState({
            counter: this.state.counter + 1
        })
    }
    render() {
        return <Button 
            text="Add one" 
            handleClick={this.addOne}
        />
        <Button text="Subtract one"/>
        <Nav navClick={() => console.log('hiiiii')} />
    }
}





