import axios from 'axios';
import React from 'react'
import { data } from 'react-router-dom';
const API_URL =  'http://localhost:8080/api';

export const registerUser = async (data) => {
  try {
    const response = await axios.post(API_URL+"/register",data);
    return response;
  } catch (error) {
    throw error;
  }
}

export const login = async (data) => {
    try {
      const response = await axios.post(API_URL+"/login",data)  
      return response;
  } catch (error) {
    throw error;
  }
}

