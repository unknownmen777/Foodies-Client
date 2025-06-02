import axios from "axios";


const API_URL = 'https://fooddies.up.railway.app/api/foods';

export const fetchFoodList = async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.log('Erorr while fetching food list.',error);
            throw error;
        }
    }

export const fetchFoodDetails = async (id) => {
   const response = await axios.get(API_URL+"/"+id);
    try {
        if(response.status === 200){
          return response.data
          
    }} catch (error) {
        console.log('Error while fetching food details.')
        throw error;
    }
    }
