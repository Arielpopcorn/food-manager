import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Title from '../Forms/Title'
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Navigation from '../Navigations/Navigation'
import { ReactComponent as DefaultBuySVG } from '../Icons/buy.svg'
import {ReactComponent as DefautdeleteSVG} from '../Icons/delete.svg'
// import Stepper from '../Forms/Stepper';
import { Spring } from 'react-spring'
import { Transition } from 'react-spring'
import Guide from './Guide'

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`

const BuySVG = styled(DefaultBuySVG)`
	width: 25px;
`

const DeleteSVG = styled(DefautdeleteSVG)`
	width: 25px;
`

const Ul = styled.ul`
	text-decoration: none;
	list-style: none;
	padding-left: 0;
`

const ButtonName = styled.p`
	margin: 0;
`

const PutInList = styled(Button)`
	height: 50px; 
	color: black;
	background: skyblue;

	&:hover {
		cursor: pointer;
	}  
	${p => p.empty ? `
		background: #ccc;
		color: white
		&:hover {
			cursor: auto;
		}  
	`: null}
`

const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const ItemName = styled.h2`
	text-align: left;
	padding-right: 20px;
	font-size: 20px;
	width: 70px;
	padding-left: 20px;

`

const Li = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-top: 10px;
`

// const GuideCard = styled.div`
// 	position: relative;
// 	background: pink;
// 	height: 400px;
// 	width: 600px;
// 	box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
// 	z-index: 1;
// `
// const CloseButton = styled.button`
// 	position: absolute;
// 	right: 0;
// 	top: 0;
// `

// const CardBackground = styled.div`
// 	position: absolute;
// 	height: 100%;
// 	width: 100%;
// 	background: black;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	opacity: 0.9;
// `

class FMapp extends React.Component{

		constructor(props){
			super(props);
			this.state = {
				inputValue: '',
				isEmpty: true,
				
			};

		}

		handleChange = (e) =>{
			const isEmpty = e.target.value.length === 0
			this.setState({
				inputValue: e.target.value,
				isEmpty
			})
		}

		handleSubmit = e => {


			this.props.fMappHandleSubmit(e, this.state.inputValue)

			this.setState({
				inputValue: ""
			})
		}
		
		componentDidMount(){
			this.props.toggleGuide()
		}


		render(){
			//const { shoppingList, fMappDeletehandleOnClick, fMappHandleSubmit, fMappCompletedhandleOnClick } = this.props
			//console.log(shoppingList)
			console.log('toggleGuide', this.props.toggleGuide)
		return(
			<div>
				{/* <Stepper /> */}				 
				<ContentContainer>   
				<Navigation toggleGuide={this.props.toggleGuide}/>     
					<Spring from={{opacity: 0,
									transform: 'scale(0)'}}
							to={{opacity:1,
								transform: 'scale(1)'}}>
						{(props) => <Title style={props}>Food shoppingList</Title>}
					</Spring>
					<ListContainer>
						<form onSubmit={this.handleSubmit}>
							<Input type="text" value={this.state.inputValue} onChange={this.handleChange}/>
							<PutInList empty={this.state.isEmpty}>Put In List</PutInList>
						</form> 
						<Ul>
							{/* {this.props.shoppingList.map((item) => */}
							{console.log(this.props.shoppingList)}
							<Transition items={this.props.shoppingList}
										keys={item => item.id}
										from={{
											opacity: 0,
											transform:'translate(0px, -100px) scale(1)'
										}}
										enter={{
											opacity: 1,
											transform:'translate(0px, 0px) scale(1);'
										}}
										leave={{
											opacity: 0,
											transform:'translate(0px, 400px) scale(1)'
											
										}}
										>
								{item => props => <Li style={props} key={item.id}><ItemName>{item.name}</ItemName>
									<Button onClick={(e) => this.props.fMappDeletehandleOnClick(e, item)}><DeleteSVG /><ButtonName>Delete</ButtonName></Button>
									<Button onClick={(e) =>  this.props.fMappCompletedhandleOnClick(e,item)}><BuySVG /><ButtonName>Buy</ButtonName></Button>
								</Li>}
							</Transition>
						</Ul>
					</ListContainer> 
					<Guide show={this.props.show} toggleGuide={this.props.toggleGuide}/>
				</ContentContainer>
			</div>
		)
	}
}

export default FMapp


//filter:
// const array = ['apples', 'pears', 'bananas']

// const filteredArray = array.filter(item => {
// 	console.log(item)
//   	// must return true or false
//     // true will keep it in the array // pears and bananas to be true
//     // f /alse will delete it/ apples to be false
//   return item !== "apples"
// })
								   
// console.log(filteredArray)


//shows:
// > "apples"
// > "pears"
// > "bananas"
// > Array ["pears", "bananas"]