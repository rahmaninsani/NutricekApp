import {combineReducers} from 'redux';

const initialFoodNutritionState = {
  foodNutrition: {
    id: null,
    foodName: null,
    foodNutritions: null,
    imagePath: null,
  },
};

const initialUserSessionState = {
  userSession: {
    name: null,
    email: null,
    accessToken: null,
    isSignedIn: false,
  },
};

const FoodNutritionReducer = (state = initialFoodNutritionState, action) => {
  switch (action.type) {
    case 'SET_FOOD_NUTRITION':
      return {
        ...state,
        foodNutrition: {
          ...state.foodNutrition,
          ...action.payload,
        },
      };
  }
  return state;
};

const UserSessionReducer = (state = initialUserSessionState, action) => {
  switch (action.type) {
    case 'SET_USER_SESSION':
      return {
        ...state,
        userSession: {
          ...state.userSession,
          ...action.payload,
        },
      };
  }

  return state;
};

const reducer = combineReducers({UserSessionReducer, FoodNutritionReducer});

export default reducer;
