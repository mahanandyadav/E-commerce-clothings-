
import { useDispatch } from 'react-redux/lib/exports';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesFailed, fetchCategoriesSuccess } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';

/* export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart())
    try {
        //from db
        const categoriesArray = await getCategoriesAndDocuments('categories');
        dispatch(fetchCategoriesSuccess(categoriesArray))
    } catch (e) {
        dispatch(fetchCategoriesFailed(e))
    }
}*/

export function* fetchCategoriesAsync(){
    try {
        //from db
        const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
        yield put(fetchCategoriesSuccess(categoriesArray))
        //put replacess dipatch insinde gen-funciton
        // dispatch(fetchCategoriesSuccess(categoriesArray)) some thing above in sagaways
    } catch (e) {
        yield put(fetchCategoriesFailed(e))
        // dispatch(fetchCategoriesFailed(e)) saga way above
    }
}
export function* onFectchCategories() {
    //takeLatest listenes to actiion type and takes the last
    yield takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync)
}
export function* categoriesSaga() {
    yield all([call(onFectchCategories)])//all: run everythin inside takes array(gen-fun)
}