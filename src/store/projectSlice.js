import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  description: '',
  benefits: '',
  risks: '',
  image: '',
  impacted:'',
  expert:'',
  impactOrganisation:'',
  decisionDelay:'',
  conflictDelay:'',
  decisionEndDelay:''

};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setBenefits: (state, action) => {
      state.benefits = action.payload;
    },
    setRisks: (state, action) => {
      state.risks = action.payload;
    },
    setImpacted: (state, action) => {
      state.impacted = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setExpert: (state, action) => {
        state.expert = action.payload;
      },
    setImpactOrganisation: (state, action) => {
        state.impactOrganisation = action.payload;
      },
    setDecisionDelay: (state, action) => {
        state.decisionDelay = action.payload;
      },
    setConflictDelay: (state, action) => {
        state.conflictDelay = action.payload;
      },
    setDecisionEndDelay: (state, action) => {
        state.decisionEndDelay = action.payload;
      },
  },
});

export const {
      setTitle,
      setDescription,
      setBenefits,
      setRisks,
      setImpacted,
      setImage,
      setExpert,
      setImpactOrganisation,
      setDecisionDelay,
      setConflictDelay,
      setDecisionEndDelay,
} = projectSlice.actions;

export default projectSlice.reducer;