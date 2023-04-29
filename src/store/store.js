import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './cardsSlice';

export default configureStore({
    reducer: {
        addCard: cardReducer,
    }
})
