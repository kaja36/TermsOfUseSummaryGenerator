import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Summary {
  isTermsOfUse: boolean;
  serviceName: string | null;
  companyName: string | null;
  enforcedDate: string | null;
  description: string[];
  features: string[];
  userRequirements: string[];
  prohibitedActions: string[];
  faq: [string, string][];
}

export interface summaryType {
  summary: Summary | null;
  original: string;
}

const initialState: summaryType = {
  summary: null,
  original: "",
};

export const summarySlice = createSlice({
  name: "summaryData",
  initialState,
  reducers: {
    setJsonData(state, action) {
      state.summary = action.payload;
    },
    setOriginal(state, action) {
      state.original = action.payload;
    },
    clear(state) {
      state.summary = null;
      state.original = "";
    },
  },
});

export const { setJsonData, setOriginal, clear } = summarySlice.actions;
export const selectSummary = (state: RootState) => state.summaryData.summary;
// export const selectOriginal = (state: RootState) => state.summaryData.original;
// export const summaryReducer = summarySlice.reducer;
export default summarySlice.reducer; 
