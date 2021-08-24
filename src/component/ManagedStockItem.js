function ManagedStockItem(props) {
    const { name, code } = props;

    return (
        <li className="managed-stock-item">
            <div className="stock-info">
                <span>{ code }</span>
                <p>{ name }</p>
            </div>
            <div className="stock-delete-button">
                <button className="delete-button">
                    삭제하기
                </button>
            </div>
        </li>
    )
}

export default ManagedStockItem;