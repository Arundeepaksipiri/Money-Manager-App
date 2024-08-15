// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {eachMoneyDetail, Balance, Income, Expenses} = props
  const {id, moneyDetailsImg, name} = eachMoneyDetail
  let classColor
  let enquiry
  let testData
  if (id === 'balance') {
    classColor = 'back-green'
    enquiry = Balance
    testData = 'balanceAmount'
  } else if (id === 'income') {
    classColor = 'back-blue'
    enquiry = Income
    testData = 'incomeAmount'
  } else if (id === 'expenses') {
    classColor = 'back-violet'
    enquiry = Expenses
    testData = 'expensesAmount'
  }

  return (
    <li className={`list-items ${classColor}`}>
      <img src={moneyDetailsImg} alt={id} className="image-size" />
      <div>
        <p>Your {name}</p>
        <p data-testid={testData}>Rs {enquiry}</p>
      </div>
    </li>
  )
}
export default MoneyDetails
