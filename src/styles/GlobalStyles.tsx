import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .title {
    font: 700 36px 'Outfit', sans-serif;
  }
  .highlighted-light {
    font: 400 18px 'Outfit', sans-serif;
  }
  .highlighted-bold {
    font: 700 18px 'Outfit', sans-serif;
  }
  .body {
    font: 400 18px 'Open Sans', sans-serif;
  }
`

export default GlobalStyles
