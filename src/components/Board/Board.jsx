import React from 'react';
import Field from '../Field/Field';

function Board({ isComputerBoard, activeField, activeBoard, selectField }) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    return (
        <div className={`${isComputerBoard ? 'computerBoard' : 'playerBoard'} ${activeBoard ? 'active' : ''}`}>
            {
                numbers.map((item) => <Field key={item} selectField={selectField} isComputerBoard={isComputerBoard} fieldNumber={item} activeField={activeField} activeBoard={activeBoard}></Field>)
            }
        </div>
    );
}

export default Board;
