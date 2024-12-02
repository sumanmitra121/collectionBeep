import React, { useEffect } from 'react'
import { Text } from 'react-native'
// import CallApi from '../services/DbIntrService'
import ComingSoonScreen from './Components/ComingSoon'
import NavComponent from './Components/Nav'

const ExamSchedule = () => {
    return (
        <>
        <NavComponent/>
        <ComingSoonScreen/>
        </>
    )
 }
 
 export default ExamSchedule
