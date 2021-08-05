import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items,action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((basketitem) => basketitem.id===action.payload.id);
      let newBasket =[...state.items] 
      if(index>=0){
        newBasket.splice(index, 1);
      }
     
      state.items=newBasket;
    },
   
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state)=>state.basket.items.reduce((total,items)=>total+items.price, 0)

export default basketSlice.reducer;
