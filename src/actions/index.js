export const addTodo = newList => ({
    type: 'ADD_TODO',
    newList: newList,
})
export const toggleNavBar = {
    type: 'TOGGLE_NAV_BAR',
}
export const setCurrentList = currentList => ({
    type: 'SET_CURRENT_LIST',
    currentList: currentList,
})
export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
})