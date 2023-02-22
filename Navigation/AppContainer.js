import React from 'react';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import StartStack from './StartStack';
import AdminStack from './AdminStack'
import UserNavigator from './StudentNavigator';
import AdminNavigator from './AdminNavigator'


const AppContainer = () =>{
     

       const AmdinIsAuth = useSelector(state => !!state.AmdinAuth.token);
       const AmdindidTryAutoLogin = useSelector(state=>!!state.AmdinAuth.didTryAutoLogin);
       const StudentIsAuth =  useSelector(state => !!state.StudentAuth.token);
       const StudentdidTryAutoLogin = useSelector(state => !!state.StudentAuth.didTryAutoLogin);
       
       return(
              <NavigationContainer>
                     {/* <UserNavigator/> */}
                     {!AmdinIsAuth && !StudentIsAuth && <StartStack/> }
                     {!StudentIsAuth && AmdinIsAuth && <AdminNavigator/>} 
                     {!AmdinIsAuth && StudentIsAuth && <UserNavigator/>}
              </NavigationContainer>
       )
};

export default AppContainer;