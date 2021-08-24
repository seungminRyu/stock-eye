import React from 'react';

function SearchResultItem(props) {
    const { name, code } = props;

    return (
        <li className="search-result-item">
            <div className="stock-info">
                <span>{ code }</span>
                <p>{ name }</p>
            </div>
            <div className="stock-add-button">
                <button className="add-button">
                    추가하기
                </button>
            </div>
        </li>
    )
}

export default SearchResultItem;