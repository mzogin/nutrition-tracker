import styled from 'styled-components'

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: #333;
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    background: #333;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  button {
    height: 35px;
    margin-top: 1rem;
  }
  /* 
  .container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-right: 0;
    padding-top: 1rem;
  } */
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }

  .form-input,
  .form-textarea,
  .form-select {
    width: 100%;
    padding: 0.375rem 0.75rem;
    /* border-radius: var(--borderRadius); */
    background: #333;
    border: none;
    border-bottom: 1px solid white;
    color: white;
  }
  .form-input:focus {
    border-color: var(--primary-500);
  }
  .form-textarea:focus {
    border-color: var(--primary-500);
  }
  .form-select:focus {
    border-color: var(--primary-500);
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: end;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
    /* .container {
      width: 49%;
    } */
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
      justify-content: end;
    }
    .form-center button {
      margin-top: 0;
    }
    /* .container {
      width: 32.5%;
    } */
  }
`

export default Wrapper
