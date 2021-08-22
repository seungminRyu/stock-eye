import React from 'react';

function SearchResultItem(props) {
    const { name, code } = props;

    return (
        <li className="search-result-item">
            <div className="search-result-item-wrapper">
                <p>{name}</p>
                <p>{code}</p>
            </div>
        </li>
    )
}

export default SearchResultItem;