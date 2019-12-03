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
    Login
} from "../src/components/screens";

import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer
} from "react-navigation";

import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Constants from '../src/styles/constants.js';

const TabNavigator = createBottomTabNavigator(
    {
        Events: MainEventFeeds,
        Feed: MainFeed,
        Dares: MainDareFeed,
        Profile: Profile
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName == "Dares") {
                    iconName = `ios-aperture`;
                }
                if (routeName == "Feed") {
                    iconName = `ios-image`;
                }
                if (routeName == "Profile") {
                    iconName = `ios-contact`;
                }
                if (routeName == "Events") {
                    iconName = `ios-calendar`;
                }

                // You can return any component that you like here!
                return (
                    <IconComponent
                        name={iconName}
                        size={25}
                        color={tintColor}
                    />
                );
            }
        }),
        tabBarOptions: {
            activeTintColor: Constants.PRIMARY_COLOR,
            inactiveTintColor: "gray"
        },
        navigationOptions: {
            header: null
        }
    }
);

const AppNavigator = createStackNavigator({
    home: Login,
    main: TabNavigator,
    postDescription: PostDescription,
    camera: CameraComponent,
    eventMain: EventMain,
    createPost: CreatePost,
    createDare: CreateDare,
    userInfo: UserInfo
});

export default createAppContainer(AppNavigator);
