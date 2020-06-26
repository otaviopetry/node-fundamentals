import Transaction from '../models/Transaction';

// Create Balance DTO
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

// Create Transaction DTO
interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

// Create the repository
class TransactionsRepository {
  // create private variable and set its type
  private transactions: Transaction[];

  // start a container array for transactions
  constructor() {
    this.transactions = [];
  }

  // return all transactions
  public all(): Transaction[] {
    return this.transactions;
  }

  // return balance between incomes and outcomes
  public getBalance(): Balance {
    // store income transactions
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    // store outcome transactions
    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    // start total income variable
    let incomeSum = 0;

    // for each income transaction, add the value to incomeSum
    incomeTransactions.forEach(transaction => {
      incomeSum += transaction.value;
    });

    // start total outcome variable
    let outcomeSum = 0;

    // for each outcome, add the value to outcomeSum
    outcomeTransactions.forEach(transaction => {
      outcomeSum += transaction.value;
    });

    return {
      income: incomeSum,
      outcome: outcomeSum,
      total: incomeSum - outcomeSum,
    };
  }

  // make a transaction
  public create({ title, type, value }: TransactionDTO): Transaction {
    // create new instance of Transaction
    const transaction = new Transaction({ title, type, value });

    // insert transaction into array
    this.transactions.push(transaction);

    // return the created transaction
    return transaction;
  }
}

export default TransactionsRepository;
