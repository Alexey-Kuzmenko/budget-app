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

export const fetchCurrencies = createAsyncThunk<Currencies, void, { rejectValue: string }>(
    'currency/fetchCurrencies',
    async function (_, { rejectWithValue }) {
        const response = await axios.get<Currencies>(`${url}/currencies?apikey=${apiKey}`);
        const data = response.data;

        if (response.status / 100 !== 2) {
            return rejectWithValue(response.statusText);
        }

        return data;

    }
);

export const getRates = createAsyncThunk<undefined, FormData, { dispatch: AppDispatch, rejectValue: string }>(
    'currency/convert',
    async function ({ baseCurrency, targetCurrency, value }, { rejectWithValue, dispatch }) {

        const response = await axios.get<CurrencyRate>(`${url}/latest?apikey=${apiKey}&base_currency=${baseCurrency}&currencies=${targetCurrency}`);

        if (response.status !== 200) {
            return rejectWithValue(response.statusText);
        }

        const data = response.data;

        dispatch(convertRate({ userValue: value, rate: data.data }));

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
            })
            .addCase(getRates.pending, (state) => {
                state.error = null;
                state.isLoad = false;
            })
            .addCase(getRates.fulfilled, (state) => {
                state.isLoad = true;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
            });
    },
});

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

export const { convertRate, resetValue } = currencySlice.actions;

export default currencySlice.reducer;