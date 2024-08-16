// Write your code here
import './index.css'

const TransactionItem = props => {
  const {History, DeleteHistory} = props
  const {id, titleInput, sourceInput, amountInput} = History
  const onClickDelete = () => {
    DeleteHistory(id, amountInput, sourceInput)
  }
  return (
    <ul>
      <hr className="line-horizontal" />
      <li className="list-item-transaction">
        <p className="each-one-item">{titleInput}</p>
        <p className="each-one-item">{amountInput}</p>
        <p className="each-one-item">{sourceInput}</p>
        <button data-testid="delete" onClick={onClickDelete}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-button"
          />
        </button>
      </li>
    </ul>
  )
}
export default TransactionItem
