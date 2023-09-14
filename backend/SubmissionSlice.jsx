
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getsubmission_data: [],
  getsubmissionforms_data: []
};

const SubmissionSlice = createSlice({
  name: 'Submission',
  initialState,
  reducers: {
    getsubmissionSliceAction: (state, action) => {
      state.getsubmission_data = action.payload;
    },
    getsubmissionformsSliceAction: (state, action) => {
      state.getsubmissionforms_data = action.payload;
    },
  },
});

const { actions, reducer } = SubmissionSlice;

// Export individual actions
export const { getsubmissionSliceAction, getsubmissionformsSliceAction } = actions;

export default reducer;
