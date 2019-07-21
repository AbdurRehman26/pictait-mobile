import {MainFeed, Login, Profile, MainDareFeed, MainEventFeeds, PostDescription} from '../src/components/screens'
// CameraComponent
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator(
    {
        events : MainEventFeeds,
        profile: Profile,
        dares: MainDareFeed,
        feed : MainFeed,
       
    }       
    );
    
    const AppNavigator = createStackNavigator({
        home : Login,
        main : TabNavigator,
        postDescription : PostDescription
    });
    
    export default createAppContainer(AppNavigator);