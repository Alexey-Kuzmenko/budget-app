import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { currencyApiConfig } from '../api/currencyapi.config';
import axios from 'axios';
import { FormData } from '../components/Converter/Converter';
import { AppDispatch } from '.';

const { url, apiKey } = currencyApiConfig;

interface CurrencyState {
    currencies: Array<string>
    value: number
    isLoad: boolean | null
    error: string | boolean | null
}

interface Currencies {
    data: {
        [key: string]: {
            symbol: string,
            name: string,
            code: string,
            name_plural: string
        }
    }
}

interface CurrencyRate {
    data: {
        [key: string]: {
            code: string
            value: string
        }
    }
}

const initialState: CurrencyState = {
    currencies: [],
    value: 0,
    isLoad: null,
    error: null
};

export const fetchCurrencies = createAsyncThunk<Currencies, void, { rejectValue: boolean }>(
    'currency/fetchCurrencies',
    async function (_, { rejectWithValue }) {
        try {
            const response = await axios.get<Currencies>(`${url}/currencies?apikey=${apiKey}`);
            const data = response.data;
            return data;

        } catch (error) {
            return rejectWithValue(true);
        }

    }
);

export const getRates = createAsyncThunk<undefined, FormData, { dispatch: AppDispatch, rejectValue: boolean }>(
    'currency/convert',
    async function ({ baseCurrency, targetCurrency, value }, { rejectWithValue, dispatch }) {
        try {
            const response = await axios.get<CurrencyRate>(`${url}/latest?apikey=${apiKey}&base_currency=${baseCurrency}&currencies=${targetCurrency}`);
            const data = response.data;
            dispatch(convertRate({ userValue: value, rate: data.data }));

        } catch (error) {
            return rejectWithValue(true);
        }
    });

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        convertRate(state, { payload }: PayloadAction<{ userValue: string, rate: { [key: string]: { code: string, value: string } } }>) {
            const { userValue, rate } = payload;

            const { value } = (Object.values(rate))[0];

            if (userValue && value) {
                state.value = Math.floor((+userValue * +value));
            }

        },
        resetValue(state) {
            state.value = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrencies.pending, (state) => {
                state.error = null;
                state.isLoad = false;
            })
            .addCase(fetchCurrencies.fulfilled, (state, action) => {
                const currencies = Object.values(action.payload.data).map(({ code, name_plural }) => {
                    return `${code} | ${name_plural}`;
                });
                state.currencies = currencies;
                state.isLoad = true;
            })
            .addCase(getRates.pending, (state) => {
                state.error = null;
                state.isLoad = false;
            })
            .addCase(getRates.fulfilled, (state) => {
                state.isLoad = true;
            })
            .addMatcher(isError, (state, action: PayloadAction<boolean>) => {
                state.error = action.payload;
                state.isLoad = true;
            });
    },
});

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

export const { convertRate, resetValue } = currencySlice.actions;

export default currencySlice.reducer;