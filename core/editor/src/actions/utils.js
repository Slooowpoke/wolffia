// Adapted from https://stackoverflow.com/questions/42645116/how-to-refactor-redux-thunk-actions-constants#42648503
export const createActionTypes = (type) => ({
    request:  `${type}_REQUEST`,
    received: `${type}_SUCCESS`,
    failed:   `${type}_FAILURE`,
});

export const requestCreator = (apiCall, actionType) => (
    async dispatch => {
        dispatch({type: actionType.request})
        try {
            const response = await apiCall();
            dispatch({ type: actionType.received, response });
        } catch (e) {
            dispatch({type: actionType.failed, error: e.message});
        }
    }
);