import { createSlice } from '@reduxjs/toolkit';
import {
  addIncome,
  getIncomeStats,
  getIncomeCategories,
  addExpense,
  getExpenseStats,
  getExpenseCategories,
  removeTransaction,
  getSpecificPeriodTrans,
} from './transactionOperations';

import { handleUserBalance, getFullUserInfo } from 'redux/Auth/authOperations';

const pending = state => {
  state.isLoading = true;
};
const rejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const initialState = {
  incomes: {
    transactions: [],
    stats: {},
    categories: [],
  },
  expences: {
    transactions: [],
    stats: {},
    categories: [],
  },
  transactionsByPeriod: {
    expenses: { total: null, incomesData: null },
    incomes: { total: null, incomesData: null },
  },
  isLoading: false,
  error: null,
  newBalance: 0,
  allTransactions: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  extraReducers: builder =>
    builder
      //   --------------------   transactions  ------------------------------
      .addCase(addIncome.pending, pending)
      .addCase(addIncome.rejected, rejected)
      .addCase(getIncomeStats.pending, pending)
      .addCase(getIncomeStats.rejected, rejected)
      .addCase(getIncomeCategories.pending, pending)
      .addCase(getIncomeCategories.rejected, rejected)
      .addCase(addExpense.pending, pending)
      .addCase(addExpense.rejected, rejected)
      .addCase(getExpenseStats.pending, pending)
      .addCase(getExpenseStats.rejected, rejected)
      .addCase(getExpenseCategories.pending, pending)
      .addCase(getExpenseCategories.rejected, rejected)
      .addCase(removeTransaction.pending, pending)
      .addCase(removeTransaction.rejected, rejected)
      .addCase(getSpecificPeriodTrans.pending, pending)
      .addCase(getSpecificPeriodTrans.rejected, rejected)
      .addCase(addIncome.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.incomes.transactions.unshift(payload.transaction);
        state.newBalance = payload.newBalance;
        state.allTransactions.push(payload.transaction);
      })
      .addCase(getIncomeStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.incomes.transactions = payload.incomes;
        state.incomes.stats = payload.monthsStats;
      })
      .addCase(getIncomeCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.incomes.categories = payload;
      })
      .addCase(addExpense.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.expences.transactions.unshift(payload.transaction);
        state.newBalance = payload.newBalance;
        state.allTransactions.push(payload.transaction);
      })
      .addCase(getExpenseStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.expences.transactions = payload.incomes;
        state.expences.stats = payload.monthsStats;
      })
      .addCase(getExpenseCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.expences.categories = payload;
      })
      .addCase(removeTransaction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.newBalance = payload.newBalance;
        state.expences.transactions = state.expences.transactions.filter(
          trans => trans._id !== payload.id
        );
        state.incomes.transactions = state.incomes.transactions.filter(
          trans => trans._id !== payload.id
        );
        state.allTransactions = state.allTransactions.filter(
          trans => trans._id !== payload.id
        );
      })
      .addCase(getSpecificPeriodTrans.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.transactionsByPeriod.expenses.total = payload.expenses.total;
        state.transactionsByPeriod.expenses.incomesData =
          payload.expenses.incomesData;
        state.transactionsByPeriod.incomes.total = payload.incomes.total;
        state.transactionsByPeriod.incomes.incomesData =
          payload.incomes.incomesData;
      })
      .addCase(handleUserBalance.fulfilled, (state, { payload }) => {
        state.newBalance = payload.newBalance;
      })
      .addCase(getFullUserInfo.fulfilled, (state, { payload }) => {
        state.newBalance = payload.newBalance;
        state.allTransactions = payload.transactions;
      }),
});

export default transactionSlice.reducer;