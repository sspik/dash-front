import * as React from 'react';

function App() {
  const handleClick = () => {
    window.open('http://localhost:4000/auth/client', '_blank')
  };
  return (
    <div>
     <button onClick={handleClick}>Залогиниться</button>
    </div>
  );
}

export default App;
