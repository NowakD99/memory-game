import React from 'react';

function Field({ isComputerBoard, fieldNumber, activeField, activeBoard, selectField }) {
    return (
        <div onClick={() => selectField(fieldNumber)} className={`${isComputerBoard ? 'computerField' : 'playerField'} ${activeField === fieldNumber && activeBoard ? ' active' : ''}`}>
            {fieldNumber}
        </div>
    );
}

export default Field;
