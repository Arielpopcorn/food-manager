import { injectGlobal } from 'styled-components'

injectGlobal`
    html, body {
        font-family: 'Muli', sans-serif;
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
}

    }
 
`