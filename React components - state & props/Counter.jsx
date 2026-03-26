function Counter({ count, increment, decrement, reset }) {
  return React.createElement('div', { className: 'counter-container' },
    React.createElement('h1', { 
      className: 'counter-display',
      onMouseEnter: (e) => e.target.classList.add('pulse'),
      onMouseLeave: (e) => e.target.classList.remove('pulse')
    }, count),
    React.createElement('div', { className: 'buttons' },
      React.createElement('button', { 
        className: 'btn decrement', 
        onClick: decrement 
      }, '-'),
      React.createElement('button', { 
        className: 'btn reset', 
        onClick: reset 
      }, 'Reset'),
      React.createElement('button', { 
        className: 'btn increment', 
        onClick: increment 
      }, '+')
    )
  );
