import React, { useState } from 'react';

const FilterForm = () => {

  const [username, setUsername] = useState(false);

  const myChangeHandler = (event) => {
    setUsername(event.target.value);
  }
  
  return (
    <>
      <form>
        <h1>Hello {username}</h1>
        <p>Enter your name:</p>
        <input
          type='text'
          onChange={myChangeHandler}
        />
      </form>
    </>
  )
}

export default FilterForm
