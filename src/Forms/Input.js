import styled from 'styled-components'

const Input = styled.input`
    width: 100px;
    padding: 15px 15px;
    border: 2px solid rgba(0,0,0,0.2);
    font-size: 17px;
    border-radius: 4px 0 0 4px;
    &:focus {
      outline: 0;
      border: 2px solid rgba(0,0,0,0.3);
  }
`
export default Input