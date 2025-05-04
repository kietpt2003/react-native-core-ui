import { AssetType, PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import { AlbumFilterStyleProps } from "GalleryBottomSheet/components/AlbumFilter";
import { CircleStyleProps } from "GalleryBottomSheet/components/PlayCircle";
import { ColorValue, TextStyle } from "react-native";

export interface BottomSheetGalleryProps {
  /** Define the position to open gallery.
   * 
   * *Default:* `openHeight = height / 2`
   * 
   * *Example:* `openHeight = 0` => open at the top of the screen
   * 
   * **Note:** y coordinate of the top of the bottom sheet from the top of the screen
   */
  openHeight?: number;
  /** Define the position when closed gallery.
   * 
   * *Default:* `closeHeight = height`
   * 
   * *Example:* `closeHeight = ScreenHeight` => close at the bottom of the screen (out of screen)
   * 
   * **Note:** y coordinate of the top of the bottom sheet from the top of the screen
   */
  closeHeight?: number;
  /** Define the maximum y coordinate that gallery should snapped at after finger release.
   * 
   * *Default:* `maxHeight = 0`
   * 
   * *Example:* `maxHeight = 0` => Can be maximized full screen (y = 0)
   * 
   * **Note:** y coordinate of the top of the bottom sheet from the top of the screen
   */
  maxHeight?: number;
  /** Define the background color of the hear bar.
   * 
   * *Default:* `headerBarColor = '#FFFFFF'`
   * 
   * *Example:* `headerBarColor = 'white'`
   * 
   * **Note:** We give you full control over the background color of each position. Whether it's beautiful or ugly is up to you. 
   */
  headerBarColor?: ColorValue;
  /** Define the header bar icon color.
   * 
   * *Default:* `barIconColor = '#000000'`
   * 
   * *Example:* `barIconColor = 'black'`
   * 
   * **Note:** We give you full control over the background color of each position. Whether it's beautiful or ugly is up to you. 
   */
  barIconColor?: ColorValue;
  /** Define styling for the header title.
   * 
   * *Default:* `headerTitleStyle = { color: '#000000' }`
   * 
   * *Example:* `headerTitleStyle = { color: 'black', fontFamily: 'Arial', fontWeight: 'bold' }`
   * 
   * **Note:** To avoid unwanted errors, *headerTitleStyle* only supports style properties such as: `color`, `fontFamily`, `fonWeight` 
   */
  headerTitleStyle?: Pick<TextStyle, "color" | "fontFamily" | "fontWeight">;
  /** Define header title. This title will display if none folder is selected, else the title will be the folder name.
   * 
   * *Default:* `headerTitle = 'Tất cả ảnh'`
   * 
   * *Example:* `headerTitle = 'Example Title that is very long, so it will be truncated'` => 'Example Title that...'
   * 
   * **Note:** To avoid unwanted errors, *headerTitle* will be truncated if itW is too long.` 
   */
  headerTitle?: string;
  /** Define the header title icon color.
   * 
   * *Default:* `headerTitleIconColor = '#000000'`
   * 
   * *Example:* `headerTitleIconColor = 'black'`
   * 
   * **Note:** We give you full control over the background color of each position. Whether it's beautiful or ugly is up to you. 
   */
  headerTitleIconColor?: ColorValue;
  /** Define the background color of the gallery bottom sheet.
   * 
   * *Default:* `backgroundColor = '#FFFFFF'`
   * 
   * *Example:* `backgroundColor = 'white'`
   * 
   * **Note:** We give you full control over the background color of each position. Whether it's beautiful or ugly is up to you. 
   */
  backgroundColor?: ColorValue;
  /** Define an empty message when there aren't any photos/videos on the current device.
   * 
   * *Default:* `emptyGalleryMsg = 'Không có hình ảnh để hiển thị'`
   * 
   * *Example:* `emptyGalleryMsg = 'Không có hình ảnh để hiển thị'`
   * 
   * **Note:** Please provide meaningful content.` 
   */
  emptyGalleryMsg?: string;
  /** Define styling for empty gallery message.
   * 
   * *Default:* `emptyGalleryMsgStyle = { color: '#000000' }`
   * 
   * *Example:* `emptyGalleryMsgStyle = { color: 'black', fontFamily: 'Arial', fontWeight: 'bold' }`
   * 
   * **Note:** To avoid unwanted errors, *emptyGalleryMsgStyle* only supports style properties such as: `color`, `fontFamily`, `fonWeight` 
   */
  emptyGalleryMsgStyle?: Pick<TextStyle, "color" | "fontFamily" | "fontWeight">;
  /** Define styling for the video icon. This icon wll be displayed when the item `type` is `'video/mp4'`.
   * 
   * *Default:* `videoIconStyle = { 
   * circleStyle: { fill: 'rgba(0, 0, 0, 0.8)', stroke: '#000000', strokeWidth: scale(5) },
   * polygonStyle: { fill: '#DDDDDD', stroke: '#000000', strokeWidth: scale(5) }
   * }`
   * 
   * *Example:* `videoIconStyle = { 
   * circleStyle: { fill: 'rgba(0, 0, 0, 0.8)', stroke: '#000000', strokeWidth: scale(5) },
   * polygonStyle: { fill: '#DDDDDD', stroke: '#000000', strokeWidth: scale(5) }
   * }`
   * 
   * **Note:** We give you full control over the styling of each icon. Whether it's beautiful or ugly is up to you.
   */
  videoIconStyle?: {
    circleStyle?: CircleStyleProps;
    polygonStyle?: CircleStyleProps;
  };
  /** Define color for album item. This item wll be displayed when user select filter by album.
   * 
   * *Default:* `albumItemStyle = { 
   * titleColor: '#000000',
   * countColor: '#A0A0A0'
   * }`
   * 
   * *Example:* `albumItemStyle = { 
   * titleColor: 'black',
   * countColor: '#A0A0A0'
   * }`
   * 
   * **Note:** We give you full control over the color of each album item. Whether it's beautiful or ugly is up to you.
   */
  albumItemStyle?: AlbumFilterStyleProps;
  /** Define asset type that the asset should match with. This property can use with setState for changing assetType
   * 
   * *Default:* `assetType = 'All'`
   * 
   * *Example:* `assetType = 'Videos'`
   * 
   * **Note:** *assetType* only supports 3 values such as: `All`, `Videos`, `Photos` 
   */
  assetType?: AssetType;
  /** Define the maximum number of assets that can be selected. Min: 0, Max: 10.
   * 
   * *Default:* `maxSelectable = 5`
   * 
   * *Example:* `maxSelectable = 10`
   * 
   * **Note:** The more the number of assets, the more time it takes to load. So please choose wisely.
   */
  maxSelectable?: number;
  /** Define function for handling selected assets data. This function will be called when the user select an asset.
   * 
   * *Default:* `onSelectedAssetsChange = undefined`
   * 
   * *Example:* `const [yourAssets, setAssets] = useState(0);
   *
   * const handleSelectedAssetsChange = (assets: Asset[]) => {
   *    setAssets(assets.length);
   * };`
   * 
   * **Note:** The more the number of assets, the more time it takes to load. So please choose wisely.
   */
  onSelectedAssetsChange?: (assets: PhotoIdentifier[]) => void;
}
