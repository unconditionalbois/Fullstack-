const { useState } = React;

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  return React.createElement('div', { className: 'app' },
    React.createElement('header', null,
      React.createElement('h2', null, 'React Counter '),
      React.createElement('p', null, 'decrement  | reset  | Increment ')
    ),
    React.createElement(Counter, { 
      count, 
      increment, 
      decrement, 
      reset 
    })
  );
}
