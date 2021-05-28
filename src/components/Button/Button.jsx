import React from 'react';

function Button({ name, action }) {
    return (
        <div className="btn" onClick={() => action()}>
            {name}
        </div>
    );
}

export default Button;
