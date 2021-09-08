const INCREMENT = "INCREMENT";

const initialState = {
    count: 5
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT: {
            return {
                ...state,
                count: state.count++
            };
        }
        default:
            return state;
    }
};

export default appReducer;
export const increment = () => ({type: INCREMENT})

