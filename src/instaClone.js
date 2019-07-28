import {
    CameraComponent,
    PostDescription,
    MainEventFeeds,
    MainDareFeed,
    MainFeed,
    EventMain,
    Profile,
    Login,
} from '../src/components/screens'

import {Slider} from '../src/components/common'

import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator(
    {
        imageSlider : Slider,
        events : MainEventFeeds,
        feed : MainFeed,
        dares: MainDareFeed,
        profile: Profile,
        
    }       
    );
    
    const AppNavigator = createStackNavigator({
        home : Login,
        main : TabNavigator,
        postDescription : PostDescription,
        camera : CameraComponent,
        eventMain : EventMain
    });
    
    export default createAppContainer(AppNavigator);