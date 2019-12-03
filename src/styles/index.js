import { StyleSheet } from 'react-native';
import styleConstants from './constants.js';


export default StyleSheet.create({
  
  defaultButton: {
    color: styleConstants.PRIMARY_TEXT_COLOR,
    borderRadius: 50,
    backgroundColor: styleConstants.PRIMARY_COLOR
  },

  defaultButtonText: {
    color: styleConstants.PRIMARY_TEXT_COLOR,
    fontSize: styleConstants.FONT_SIZE_MEDIUM
  }


});