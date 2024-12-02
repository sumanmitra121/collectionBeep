import React, { useEffect } from 'react'
import { Text } from 'react-native'
import ComingSoonScreen from '../Components/ComingSoon'
import CallApi from '../services/DbIntrService'

const ReportCardsScreen = () => {


   useEffect(() =>{
    console.log('bosikaran  hoichilo')

      const fetchAPI = async () =>{
          const payLoad = {"CWTR_Class":"51"}
          const apiRes = await CallApi(1,'/api/Routine/GetRoutine',payLoad);
          console.log('asdsad' + apiRes?.data?.List)
      } 

      fetchAPI();
   },[])

  return (
       <ComingSoonScreen/>
  )
}

export default ReportCardsScreen
