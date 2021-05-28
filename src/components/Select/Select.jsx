import React from 'react';

function Select({ changeSelectValue }) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className="select">
            <span>Wybierz ilość rund  </span>
            <select onChange={(e) => changeSelectValue(e)} defaultValue="5">
                {numbers.map((item) => <option value={`${item}`}>{item}</option>)}
            </select>
        </div>
    );
}

export default Select;
