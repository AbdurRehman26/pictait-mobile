import {MainFeed, Login, Profile, MainDareFeed, PostDescription} from '../src/components/screens'
// CameraComponent
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator(
    {
        dares: MainDareFeed,
        feed : MainFeed,
        // camera: CameraComponent,
        profile: Profile
    }       
    );
    
    const AppNavigator = createStackNavigator({
        home : Login,
        main : TabNavigator,
        postDescription : PostDescription
    });
    
    export default createAppContainer(AppNavigator);