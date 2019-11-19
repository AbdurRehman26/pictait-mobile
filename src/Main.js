import {
    CameraComponent,
    PostDescription,
    MainEventFeeds,
    MainDareFeed,
    MainFeed,
    CreatePost,
    EventMain,
    UserInfo,
    Profile,
    Login,
} from '../src/components/screens'

import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator(
    {
        feed : MainFeed,
        userInfo : UserInfo,
        profile: Profile,        
        dares: MainDareFeed,
        events : MainEventFeeds,
    }       
    );
    
    const AppNavigator = createStackNavigator({
        home : Login,
        main : TabNavigator,
        postDescription : PostDescription,
        camera : CameraComponent,
        eventMain : EventMain,
        createPost : CreatePost,
        userInfo : UserInfo
    });
    
    export default createAppContainer(AppNavigator);