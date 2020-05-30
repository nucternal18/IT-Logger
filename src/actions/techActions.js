import { database } from '../firebase';
import { GET_TECHS, ADD_TECH, DELETE_TECH, SET_LOADING, TECHS_ERROR } from './Types';

//Get techs from server
export const getTechs = () => async dispatch => {
    try {
        setLoading();

         const techsRef = await database.collection('techs').get();
         const techsArray = [];
        techsRef.forEach((doc) => {
           techsArray.push({
             data: doc.data(),
           });
         });

        dispatch({
            type: GET_TECHS,
            payload: techsArray
        })
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.message,
        })
    }
    
}

//Add Technician
export const addTech = (tech) => async dispatch => {
    try {
        setLoading();

        const setTechs = await database.collection('techs').add(tech);
        const techs = await setTechs.get();
        const techsArray = [];
        techs.forEach((doc) => {
            console.log(doc.data())
          techsArray.push({
            data: doc.data(),
          });
        });
        dispatch({
            type: ADD_TECH,
            payload: techsArray
        })
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.message,
        })
    }
    
}

//Delete Technician
export const deleteTech = (id) => async dispatch => {
    try {
        setLoading();
        let deleteId;
        const deleteTechs = await database.collection('techs').get();
        deleteTechs.forEach((doc) => {
            const data = doc.data();
            console.log(data.id)
          if (data.id === id) {
            deleteId = doc.id;
          }
        });
        
        console.log(deleteId);
        database.collection('techs').doc(deleteId).delete();

        dispatch({
            type: DELETE_TECH,
            payload: id
        })
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.message,
        })
    }
    
}

//Set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}