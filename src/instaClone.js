import {MainFeed, Login, Profile} from '../src/components/screens'
// CameraComponent
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator(
    {
        feed : MainFeed,
        // camera: CameraComponent,
        profile: Profile
    }       
    );
    
    const AppNavigator = createStackNavigator({
        home : Login,
        main : TabNavigator
    });
    
    export default createAppContainer(AppNavigator);