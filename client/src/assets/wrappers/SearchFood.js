import styled from 'styled-components'

const Wrapper = styled.section`
  /*! width: 75vw;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 8rem; */

  .search {
    width: 75vw;
    max-width: 500px;
    margin: 0 auto;
  }
  form {
    padding: 0;
    width: 75vw;
    max-width: 500px;
    margin: 0 auto;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }

  form input {
    height: 1.75rem;
    display: block;
    /* width: 12rem; */
    /* width: 20rem; */
    /* width: 80vw;
    max-width: 500px; */
    width: 75vw;
    max-width: 500px;
    margin: 0 auto;
    padding: 0.75rem;
    padding: 1rem;
    transition: var(--transition);
    letter-spacing: 0.1rem;
    border: none;
    border-bottom: 0.2rem solid var(--primary-500);
    margin-bottom: 1rem;
  }

  ::placeholder {
    color: #ccc;
    color: #333;
  }

  form input:hover {
    /* transform: scale(1.05); */
  }

  form input:focus {
    outline: none;
    /* transform: scale(1.05); */
  }

  .results {
    /* width: 80vw;
  max-width: 500px; */
    /* ! */
    width: 75vw;
    max-width: 500px;
    margin: 0 auto;
    margin-bottom: 8rem;
  }
  .result {
    /* background: rgb(222, 222, 222); */
    display: flex;
    justify-content: space-between;
    border-bottom: 0.1rem solid #fff;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    padding-left: 1rem;
    cursor: pointer;
    transition: var(--transition);
    /* color: #333; */
  }
  .result:hover {
    color: var(--primary-500);
    border-color: var(--primary-500);
    /* transform: scale(1.05); */
  }

  .result-dropdown i {
    padding-left: 0.5rem;
  }
  .foods {
    width: 75vw;
    max-width: 600px;
    margin: 0 auto;
  }
  .error-message {
    margin-top: 1rem;
    text-align: center;
  }
`
export default Wrapper
