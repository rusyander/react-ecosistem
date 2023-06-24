import { createSlice } from '@reduxjs/toolkit';
import { BreadCrumbsSchema } from '../..';

const initialState: BreadCrumbsSchema = {
  pathList: [
    {
      id: '1',
      name: 'Главная',
      path: '/',
    },
  ],
};

const BreadCrumbs = createSlice({
  name: 'breadCrumbs',
  initialState,
  reducers: {
    addPathList: (state, action) => {
      const pathList = [...state.pathList, action.payload];
      const uniquePaths = [
        ...new Set(pathList.map((item) => JSON.stringify(item))),
      ].map((item) => JSON.parse(item));
      state.pathList = uniquePaths;
      console.log('state.pathList', state.pathList);
    },

    removePathListItem: (state, action) => {
      const pathList = state.pathList.filter(
        (item) => item.id !== action.payload
      );
      state.pathList = pathList;
    },
  },
});

export const { actions: BreadCrumbsActions } = BreadCrumbs;
export const { reducer: BreadCrumbsReducer } = BreadCrumbs;
