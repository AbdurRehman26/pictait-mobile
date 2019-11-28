import {
    CameraComponent,
    PostDescription,
    MainEventFeeds,
    MainDareFeed,
    MainFeed,
    CreatePost,
    CreateDare,
    EventMain,
    UserInfo,
    Profile,
    Login,
} from '../src/components/screens'

import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator(
    {
        dares: MainDareFeed,
        feed : MainFeed,
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
        createPost : CreatePost,
        createDare : CreateDare,
        userInfo : UserInfo
    });
    
    export default createAppContainer(AppNavigator);