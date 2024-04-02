import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  description: '',
  benefits: '',
  risks: '',
  image: '',
  expertImpacted:'',
  impactOrganisation:'',
  decisionDelay:'',
  conflictDelay:'',
  decisionEndDelay:'',
  country:''

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
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setExpertImpacted: (state, action) => {
        state.expertImpacted = action.payload;
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
    setCountry: (state, action) => {
        state.country = action.payload;
      },
  },
});

export const {
      setTitle,
      setDescription,
      setBenefits,
      setRisks,
      setExpertImpacted,
      setImage,
      setImpactOrganisation,
      setDecisionDelay,
      setConflictDelay,
      setDecisionEndDelay,
      setCountry
} = projectSlice.actions;

export default projectSlice.reducer;