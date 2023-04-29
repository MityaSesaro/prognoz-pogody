import { createSlice } from '@reduxjs/toolkit';

const cardsSlice = createSlice({
    name: 'cards',
    initialState: {
        cards: []
    },
    reducers: {
        addCards(state, action) {
            state.cards.push(action.payload.text)
        },
        removeCards(state, action) {
            let index = state.cards.indexOf(action);
            state.cards.splice(index, 1);
        },
        removeAll(state, action) {
            state.cards = []
        }
    }
});

export const { addCards, removeCards, removeAll } = cardsSlice.actions;

export default cardsSlice.reducer;