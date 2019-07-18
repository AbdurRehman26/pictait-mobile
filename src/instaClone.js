import {MainFeed, Login, Profile, MainDareFeed} from '../src/components/screens'
// CameraComponent
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator(
    {
        feed : MainFeed,
        // camera: CameraComponent,
        dares: MainDareFeed,
        profile: Profile

    }       
    );
    
    const AppNavigator = createStackNavigator({
        home : Login,
        main : TabNavigator
    });
    
    export default createAppContainer(AppNavigator);