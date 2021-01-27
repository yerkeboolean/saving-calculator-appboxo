import moment from "moment";
import { createSlice } from "@reduxjs/toolkit";
// Slice
const slice = createSlice({
  name: "calculator",
  initialState: {
    isByAmount: false,
    amount: null,
    months: 1,
    finishDate: moment().add(1, "months").format("MMMM, YYYY"),
    total: 0,
  },
  reducers: {
    methodSwitchSuccess: (state) => {
      state.isByAmount = !state.isByAmount;
    },
    handleAmountSuccess: (state, action) => {
      state.amount = action.payload;
    },
    getTotalSuccess: (state) => {
      if (state.isByAmount) {
        state.total = state.amount / state.months;
      } else if (!state.isByAmount) {
        state.total = state.amount * state.months;
      }
    },
    addOneMonthSuccess: (state) => {
      state.finishDate = moment(state.finishDate)
        .add(1, "months")
        .format("MMMM, YYYY");
    },
    subtractOneMonthSuccess: (state) => {
      state.finishDate = moment(state.finishDate)
        .subtract(1, "months")
        .format("MMMM, YYYY");
    },
    getMonthsSuccess: (state) => {
      state.months = monthDiff(moment(), moment(state.finishDate));
    },
  },
});
export default slice.reducer;

const {
  methodSwitchSuccess,
  handleAmountSuccess,
  getTotalSuccess,
  addOneMonthSuccess,
  subtractOneMonthSuccess,
  getMonthsSuccess,
} = slice.actions;

export const handleAmount = (event) => async (dispatch) => {
  try {
    const value = event.target.value.replace(/[^0-9]+/g, "");
    dispatch(handleAmountSuccess(value));
    dispatch(getTotalSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
export const methodSwitch = () => async (dispatch, getState) => {
  try {
    dispatch(methodSwitchSuccess());
    dispatch(getTotalSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
export const addOneMonth = () => async (dispatch) => {
  try {
    dispatch(addOneMonthSuccess());
    dispatch(getMonthsSuccess());
    dispatch(getTotalSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
export const subtractOneMonth = () => async (dispatch) => {
  try {
    dispatch(subtractOneMonthSuccess());
    dispatch(getMonthsSuccess());
    dispatch(getTotalSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};

const monthDiff = (dateFrom, dateTo) => {
  return (
    dateTo.month() - dateFrom.month() + 12 * (dateTo.year() - dateFrom.year())
  );
};
