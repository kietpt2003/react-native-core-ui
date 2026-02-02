import { StyleSheet } from "react-native";
import { colors, fontSize } from "@estuary/rn-core-ui/themes";
import { WEB, width } from "@estuary/rn-core-ui/utils";

const ITEM_WIDTH_LARGE = width / 2.5;
const SPACING = 30;

export const shadowStyles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 10
  },
  item: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 0.5,
    flexShrink: 0,
  },
  itemRadius: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: width / 2,
    borderWidth: 0.5,
    flexShrink: 0,
  },
  ml: {
    marginLeft: SPACING
  },
  actionsContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  content: {
    fontSize: WEB ? fontSize._12 : fontSize._14,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  mt: {
    marginTop: SPACING
  },
  largeItem: {
    width: ITEM_WIDTH_LARGE,
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 0.5
  },
  largeItemRadius: {
    width: ITEM_WIDTH_LARGE,
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: ITEM_WIDTH_LARGE / 2,
    borderWidth: 0.5
  },
  sliderHeader: {
    flexDirection: 'row'
  },
  sliderTextInput: {
    fontSize: WEB ? fontSize._12 : fontSize._14,
  },
  shadowBody: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cbView: {
    flex: 1,
  },
  mb: {
    marginBottom: SPACING
  }
});