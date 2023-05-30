import styled from 'styled-components'

const Wrapper = styled.div`
  h1 {
    color: white;
  }
  .select-amount {
    position: fixed;
    /* top: 2rem; */
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(35, 35, 35);
    color: #333;
    color: white;
    box-shadow: 2px 2px 5px #000;
    /* display: inline-block; */
    /* height: 20rem; */
    /* width: 20rem; */
    width: 90vw;
    max-width: 600px;
    min-height: 75vh;
    /* max-width: 800px; */
    padding: 0.25rem 1rem;
    padding: 2rem 3rem;
    /* padding: 2rem; */
    /* text-transform: lowercase; */
    letter-spacing: var(--spacing);
  }

  .food-description {
    color: var(--primary-500);
    margin-bottom: 1.5rem;
  }

  .btn {
    /* margin-top: 4rem; */
    /* margin-top: 2rem; */
    padding: 0.4rem 1rem;
    text-transform: uppercase;
    letter-spacing: var(--spacing);
    /* border: 1px solid white;
    cursor: pointer;
    transition: var(--transition); */
  }

  .food-details {
    /* width: 15rem; */
    margin-left: auto;
    /* align-items: bottom; */
    display: flex;
    justify-content: right;
    /* margin-right: 2rem; */
    margin-right: 0rem;
  }

  .serving {
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
  }
  .quantity {
    /* margin-bottom: 1rem; */
    margin-bottom: 2rem;
    margin-left: 1rem;
    display: flex;
    justify-content: space-between;
  }

  label {
    padding-right: 0.5rem;
  }

  #quantity {
    background: #333;
    width: 5rem;
    color: white;
    letter-spacing: var(--spacing);
    border: none;
    border-bottom: 2px solid white;
    padding: 0.25rem;
    outline: none;
    text-align: center;
  }
  #quantity:focus {
    border-bottom: 2px solid var(--primary-500);
  }

  select {
    text-align: center;
    background: #333;
    color: white;
    letter-spacing: var(--spacing);
    border: none;
    border-bottom: 2px solid white;
    /* padding: 0.25rem; */
    outline: none;
  }

  select:focus {
    border: none;
    border-bottom: 2px solid var(--primary-500);
  }

  .btns-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
  }
  .nutrients {
    /* display: flex; */
    text-align: right;
  }
  .nutrients p {
    /* margin: 0;
    display: inline-block; */
  }
  ul {
    columns: 2;
  }
  .green {
    color: var(--primary-600);
  }
  .delete-btn {
    background: #f74141;
    margin-right: 1rem;
  }
  .delete-btn:hover {
    background: #dc0909;
  }
  .btn-container {
    display: flex;
    justify-content: flex-end;
  }
  .close-btn {
    background: #f74141;
    border: none;
    padding: 0.05rem 0.5rem;
    padding-top: 0.2rem;
    cursor: pointer;
  }
  .close-btn:hover {
    background: #dc0909;
  }
`
export default Wrapper
