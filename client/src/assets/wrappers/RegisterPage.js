import styled from 'styled-components'
import img from '../images/kale.jpg'

const Wrapper = styled.section`
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${img}) center/cover no-repeat;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    /* color: #333; */
    background: #222;
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  .form input {
    border: none;
    border-bottom: 1px solid white;
    color: white;
  }
  .form input:focus {
    border-color: var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .btn-test {
    border-color: white;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: #333;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`
export default Wrapper
