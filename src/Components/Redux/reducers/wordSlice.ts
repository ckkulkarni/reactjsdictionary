import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface previousWords {
    words: string[];
}
const wordSlice = createSlice({
    name: "words",
    initialState: { words: [] } as previousWords,
    reducers: {
        addWord(state, action: PayloadAction<string>) {
            if (state.words.includes(action.payload)) {
                return state;
            }
            else {
                
                state.words.push(action.payload);
            }
        },
        clearWord(state, action: PayloadAction<string>) {
            state.words = state.words.filter((word) => word !== action.payload);
        },
        clearAllWords(state) {
            state.words = [];
        }
    }
})

export const { addWord, clearWord, clearAllWords } = wordSlice.actions;
export default wordSlice.reducer;