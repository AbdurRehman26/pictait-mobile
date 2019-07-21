import {MainFeed, Login, Profile, MainDareFeed, PostDescription} from '../src/components/screens'
// CameraComponent
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator(
    {
        profile: Profile,
        dares: MainDareFeed,
        feed : MainFeed,
        // camera: CameraComponent,
        
    }       
    );
    
    const AppNavigator = createStackNavigator({
        home : Login,
        main : TabNavigator,
        postDescription : PostDescription
    });
    
    export default createAppContainer(AppNavigator);