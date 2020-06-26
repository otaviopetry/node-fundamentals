import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

// create the Router instance
const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  // must return object with all transactions and balance
  try {
    // execute public method all() and store it
    const transactions = transactionsRepository.all();

    // execute public method getBalance()
    const balance = transactionsRepository.getBalance();

    // return all transactions
    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // get data from body
    const { title, type, value } = request.body;

    // create instance of service
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    // execute the service
    const transaction = createTransaction.execute({ title, type, value });

    // return the created transaction
    return response.json(transaction);
    // if try unsuccessful
  } catch (err) {
    // return proper error
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
