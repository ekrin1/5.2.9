import type { JobType } from '../services/types';
import { fetchVacancies } from '../services/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface VacanciesState {
    items: JobType[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    skills: string[];
    search: string;
    city: string;
}

const initialState: VacanciesState = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    skills: ["JavaScript", "React", "Redux", "ReduxToolkit", "Nextjs"],
    search: "",
    city: "",
}

interface VacanciesResponse {
  items: JobType[];
  found: number;
}

export const fetchVacanciesThunk = createAsyncThunk<VacanciesResponse,void,{ state: { vacancies: VacanciesState } }>(
  'vacancies/fetchVacancies',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { page, skills, search, city } = state.vacancies;

      try {
        const data = await fetchVacancies({ page, skills, search, city });

        const totalPages = Math.ceil(data.found / 10);

        if (page > totalPages && totalPages > 0) {
          return rejectWithValue('Такой страницы не существует');
        }
        return data;
        } catch {
      return rejectWithValue('Ошибка загрузки вакансий');
    }
  }
);

const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    },
    
    extraReducers: (builder) => {
        builder
        .addCase(fetchVacanciesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacanciesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalPages = Math.ceil(action.payload.found / 10);
      })
      .addCase(fetchVacanciesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.items = [];
      });
    }
});

export const { setPage, setSkills, setSearch, setCity } = vacanciesSlice.actions;

export default vacanciesSlice.reducer;