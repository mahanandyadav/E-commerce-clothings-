

// export const selectCategoriesMap = (state) => state.categories.categories
// .reduce((acc, category) => {
//     const { title, items } = category
//         acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});


import { createSelector } from 'reselect'

const selectCategoryReducer = (state) => {
    return state.categories}

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        // console.log('selector 2 called')
        return categoriesSlice.categories
    }
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        return categories.reduce((acc, category) => {
            const { title, items } = category
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
    }
)
