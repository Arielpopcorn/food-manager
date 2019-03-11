import React, { Component } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px; 
  align-items: center;
  margin: 0 auto;
`

const Label = styled.label`
  color: #fff;
  font-family: 'Open Sans', sans-serif;
  padding: 8px 0 3px;
`

const Submit = styled.button`
  color: #fff;
  margin-top: 28px;
  background-color: rgba(25,99,93,.9);
  border-radius: 5px;
  padding: 6px 10px;
`

export default class NewCustomerForm extends Component {

  static defaultProps = {
    customerDetail: {}
  };

  state = {
    id: this.props.customerDetail.id || '',
    customerName: this.props.customerDetail.customerName || '',
    phoneNumber: this.props.customerDetail.phoneNumber || '',
    address: this.props.customerDetail.address || '',
    facebook: this.props.customerDetail.facebook || '',
  }

  handelInput = (e) => {
    const nameOfProperty = e.target.name
    this.setState({
      [nameOfProperty] : e.target.value
    })   
  } 

  onSubmit = (e) => {
    console.log('Hi')
    const {onSubmit, toggle} = this.props
    const {customerName, phoneNumber, address, facebook, id} = this.state
    e.preventDefault();
    onSubmit({
      variables: {
        customerName,
        phoneNumber: Number(phoneNumber),
        address,
        facebook,
        id
      }
    })
    .then(() => {
        this.setState({
            customerName: '',
            phoneNumber: '',
            address: '',
            facebook: ''
        })
        toggle()
    })
    .catch(e => console.log(e))
  }

  render() {
    const {customerName, phoneNumber, address, facebook} = this.state
    return (
        <Form 
        onSubmit={this.onSubmit}>
          <Label>Name</Label>
          <input type="text" placeholder="name" onChange={this.handelInput} value={customerName} name="customerName" />
          <Label>phone Number</Label>
          <input type="number" placeholder="phone number" onChange={this.handelInput} value={phoneNumber} name="phoneNumber" />
          <Label>Address</Label>
          <input type="text" placeholder="address" onChange={this.handelInput} value={address} name="address" />
          <Label>Facebook</Label>
          <input type="text" placeholder="facebook" onChange={this.handelInput} value={facebook} name="facebook" />
          <Submit>Submit</Submit>
        </Form>
    )
  }
}
