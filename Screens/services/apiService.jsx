import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Config/config";


const apiService = {
    async get(url, params = {}, Headers={}){
        const token = await AsyncStorage.getItem('token')
        const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

        try{
            const response = await axios.get(`${BASE_URL}${url}`, {
                params,
                headers: { ...authHeaders, ...headers },
              });
              return response.data;

        }
        catch(error){
            throw error.response ? error.response.data : error.message;
        }

    },

    async post(url, data = {}, headers={}){

        const token = await AsyncStorage.getItem('token')
        const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
            try {
                const response = await axios.post(`${BASE_URL}${url}`, data, {
                  headers: { ...authHeaders, ...headers },
                });
                return response.data;
        }
        catch(error){
            throw error.response ? error.response.data : error.message;
        }

    }
}

export default apiService;
