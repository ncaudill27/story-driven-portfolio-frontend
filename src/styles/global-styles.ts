import { createGlobalStyle } from "styled-components"
import { BLUE } from "./constants"

export default createGlobalStyle`
  /*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
*/
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  ul, ol {
    list-style: none;
    padding: 0;
  }

  html, body {
    height: 100%;
  }

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: smooth;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    background-color: ${BLUE[100]};
    color: ${BLUE[800]};
    font-size: 32px;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  a {
    text-decoration-skip-ink: auto;
  }

  /* turn this on to break word
    p, h1, h2, h3, h4, h5, h6 {
      overflow-wrap: break-word;
    }
  */

  #root, #___gatsby  {
    isolation: isolate;
  }
  /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
    scroll-behavior: auto;
    }
    
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`
