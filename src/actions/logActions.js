import { database } from '../firebase';
import { GET_LOGS, SET_LOADING, LOGS_ERROR, ADD_LOG, DELETE_LOG, SET_CURRENT, CLEAR_CURRENT, UPDATE_LOG, SEARCH_LOGS } from './Types';





// Get Logs from Reducer
export const getLogs = () => async dispatch => {
    try {
        setLoading();

        const logsRef = await database.collection('logs').get();
         const logsArray = [];
        logsRef.forEach((doc) => {
             console.log(doc.data());
           logsArray.push({
             data: doc.data()
           });
         });

        dispatch({
            type: GET_LOGS,
            payload: logsArray
        })
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.message,
        })
    }
    
}

// Add new log
export const addLog = (log) => async dispatch => {
    try {
        setLoading();

        const setLogs = await database.collection('logs').add(log);
        const logs = await setLogs.get();
        const logsArray = [];
        logs.forEach((doc) => {
          console.log(doc.data());
          logsArray.push({
            data: doc.data(),
          });
        });

        dispatch({
            type: ADD_LOG,
            payload: logsArray
        })
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.message,
        })
    }
    
}

// Delete log from server
export const deleteLogs = (id) => async dispatch => {
    try {
        setLoading();
        let deleteId;
        const deleteLogs = await database.collection('logs').get();
        deleteLogs.forEach((doc) => {
        const data = doc.data();
        console.log(data.id);
        if (data.id === id) {
            deleteId = doc.id;
        }
        });

        console.log(deleteId);
        database.collection('logs').doc(deleteId).delete();

        dispatch({
            type: DELETE_LOG,
            payload: id
        })
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.message,
        })
    }
    
}

// Update log in server
export const updateLog = log => async dispatch => {
    try {
        setLoading();
        let updateId;
        const logsArray = [];
        const res = await database.collection('logs').get();
       res.forEach((doc) => {
        const data = doc.data();
        console.log(data.id);
        if (data.id === log.id) {
            updateId = doc.id;
        }
        });
        database.collection('logs').doc(updateId).update(log);
        const updateData = await database.collection('logs').get();
        updateData.forEach((doc) => {
            logsArray.push(
                { data: doc.data()}
            )
        })

        dispatch({
            type: UPDATE_LOG,
            payload: logsArray
        })
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText,
        })
    }
    
}

// Search Logs 
export const searchLogs = (text) => async dispatch => {
    try {
        setLoading();

        const res = await fetch(`./logs?q=${text}`);
        const data = await res.json();

        dispatch({
            type: SEARCH_LOGS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.statusText,
        })
    }
    
}

// Set current log
export const setCurrent = log => {
    return {
        type: SET_CURRENT,
        payload: log
    }
}

// Clear current log
export const clearCurrent = () => {
    return {
        type: CLEAR_CURRENT,
    }
}

//Set Loading
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}

