import { getsubmissionSliceAction, getsubmissionformsSliceAction } from './SubmissionSlice';


const GETSUBMISSION_API = 'api/submission'

export const getsubmissionAction = (getsubmission_data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(GETSUBMISSION_API + '', {
        
        method: 'GET',
        credentials: 'include',
        // Add other headers here if needed
      
      });

      if (!response.ok) {
        throw new Error('Request failed..');
      }
      const responseData = await response.json();

      dispatch(getsubmissionSliceAction(responseData)); // Dispatch the action here

    } catch (error) {
      console.log(error);
    }
  };
};


const GETSUBMISSIONFORMS_API = '/api/submission/1/tree/report/forms'

export const getsubmissionformsAction = (getsubmissionforms_data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(GETSUBMISSIONFORMS_API + '??actuality=AC&consType=LE&isGrouped=true&period=1912&submissions=1&', {
        
        method: 'undefined',
        credentials: 'include',
        // Add other headers here if needed
      
      });

      if (!response.ok) {
        throw new Error('Request failed..');
      }
      const responseData = await response.json();

      dispatch(getsubmissionformsSliceAction(responseData)); // Dispatch the action here

    } catch (error) {
      console.log(error);
    }
  };
};
