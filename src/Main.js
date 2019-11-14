import {
    CameraComponent,
    PostDescription,
    MainEventFeeds,
    MainDareFeed,
    MainFeed,
    CreatePost,
    EventMain,
    Profile,
    Login,
} from '../src/components/screens'

import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator(
    {
        feed : MainFeed,
        dares: MainDareFeed,
        events : MainEventFeeds,
        profile: Profile,        
    }       
    );
    
    const AppNavigator = createStackNavigator({
        home : Login,
        main : TabNavigator,
        postDescription : PostDescription,
        camera : CameraComponent,
        eventMain : EventMain,
        createPost : CreatePost
    });
    
    export default createAppContainer(AppNavigator);