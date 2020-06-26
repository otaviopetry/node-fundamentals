import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

// create request interface
interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    // store current balance
    const { total } = this.transactionsRepository.getBalance();

    // check if have sufficient balance to make outcome transaction
    if (type === 'outcome' && total < value) {
      throw Error('Insufficient funds.');
    }

    // call repository CREATE method
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
