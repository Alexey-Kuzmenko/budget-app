import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DialogState {
    isDialogOpen: boolean
}

const initialState: DialogState = {
    isDialogOpen: false
};

type DialogAction = 'open' | 'hidden';

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        showDialog: (state, { payload }: PayloadAction<DialogAction>) => {

            if (payload === 'open') {
                state.isDialogOpen = true;
            } else {
                state.isDialogOpen = false;
            }

        },
    }
});

export const { showDialog } = dialogSlice.actions;

export default dialogSlice.reducer;