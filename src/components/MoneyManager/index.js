import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
const moneyDetails = [
  {
    id: 'balance',
    moneyDetailsImg:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    name: 'Balance',
  },
  {
    id: 'income',
    moneyDetailsImg:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    name: 'Income',
  },
  {
    id: 'expenses',
    moneyDetailsImg:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    name: 'Expenses',
  },
]
class MoneyManager extends Component {
  state = {
    historyDetails: [],
    titleInput: '',
    amountInput: '',
    sourceInput: transactionTypeOptions[0].optionId,
    balance: 0,
    income: 0,
    expenses: 0,
  }

  addTransaction = event => {
    event.preventDefault()
    const {amountInput, sourceInput, titleInput} = this.state
    const newHistory = {
      id: uuidv4(),
      titleInput,
      amountInput,
      sourceInput:
        sourceInput === transactionTypeOptions[0].optionId
          ? transactionTypeOptions[0].displayText
          : transactionTypeOptions[1].displayText,
    }
    if (sourceInput === 'INCOME') {
      this.setState(prevState => ({
        balance: prevState.balance + parseInt(amountInput),
        income: prevState.income + parseInt(amountInput),
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.balance - parseInt(amountInput),
        expenses: prevState.expenses + parseInt(amountInput),
      }))
    }

    this.setState(prevState => ({
      historyDetails: [...prevState.historyDetails, newHistory],
      amountInput: '',
      sourceInput: transactionTypeOptions[0].optionId,
      titleInput: '',
    }))
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeSource = event => {
    this.setState({sourceInput: event.target.value})
  }

  onDeleteHistory = (id, amountInput, sourceInput) => {
    if (sourceInput === 'Income') {
      this.setState(prevState => ({
        balance: prevState.balance - parseInt(amountInput),
        income: prevState.income - parseInt(amountInput),
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.balance + parseInt(amountInput),
        expenses: prevState.expenses - parseInt(amountInput),
      }))
    }
    this.setState(prevState => ({
      historyDetails: prevState.historyDetails.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  render() {
    const {
      historyDetails,
      titleInput,
      amountInput,
      sourceInput,
      balance,
      income,
      expenses,
    } = this.state
    return (
      <div className="bg-container">
        <div className="bg-name-container">
          <h1 className="name-heading">Hi, Richard</h1>
          <p className="paragraph">
            Welcome back to your{' '}
            <span className="money-manager">Money Manager</span>
          </p>
        </div>
        <ul className="unorder-items">
          {moneyDetails.map(eachDetail => (
            <MoneyDetails
              key={eachDetail.id}
              eachMoneyDetail={eachDetail}
              Balance={balance}
              Income={income}
              Expenses={expenses}
            />
          ))}
        </ul>
        <div className="bottom-container">
          <div className="form-container">
            <h1>Add Transaction</h1>
            <form onSubmit={this.addTransaction}>
              <label htmlFor="title">TITLE</label>
              <br />
              <input
                value={titleInput}
                onChange={this.onChangeTitle}
                id="title"
                placeholder="TITLE"
              />
              <br />
              <label htmlFor="amount">AMOUNT</label>
              <br />
              <input
                value={amountInput}
                onChange={this.onChangeAmount}
                id="amount"
                placeholder="AMOUNT"
              />
              <br />
              <label htmlFor="typeSource">TYPE </label>
              <br />
              <select
                value={sourceInput}
                id="typeSource"
                onChange={this.onChangeSource}
              >
                {transactionTypeOptions.map(eachType => (
                  <option key={eachType.optionId} value={eachType.optionId}>
                    {eachType.displayText}
                  </option>
                ))}
              </select>
              <button type="submit">Add</button>
            </form>
          </div>
          <div className="history-container">
            <h1>History</h1>
            <ul className="list-container">
              <li className="history-items">
                <p className="each-list">Title</p>
                <p className="each-list">Amount</p>
                <p className="each-list">Type</p>
              </li>
              <li className="item-pays">
                {historyDetails.map(eachDetail => (
                  <TransactionItem
                    History={eachDetail}
                    key={eachDetail.id}
                    DeleteHistory={this.onDeleteHistory}
                  />
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
