
const defaultList = {
    name: "Tasks",
    id: 0,
    tasks: [],
    enteredName: "Tasks",
  }
const initialState = {
    isNavBarOpen: false,
    isTaskDetailsOpen: false,
    lists:[defaultList],
    currentList: defaultList,
    currentTask: {},
}

const lists = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                lists: [...state.lists, action.newList], 
                currentList: action.newList,
            }
        case 'TOGGLE_NAV_BAR':
            return {
                ...state, 
                isNavBarOpen: !state.isNavBarOpen,
            }
        case 'SET_CURRENT_LIST':
            return {
                ...state, 
                currentList: action.currentList,
            }
        case 'TOGGLE_TODO':
            return state
        default:
            return state
    }
  }
  
  export default lists