import { Album as AlbumType, AssetType, PhotoIdentifier } from "@react-native-camera-roll/camera-roll";

export type UseGalleryAssetsResult = {
  /**
   * Provide list of albums on current device. The Album will inherited Album in @react-native-camera-roll/camera-roll.
   * 
   * *Default: * `albums = []`
   * 
   * **Note: ** id property (albumId) exist at @react-native-camera-roll/camera-roll version 7.7.0 or higher.
   */
  albums: Album[];
  /**
   * Provide list of assets on current device grouped by album.
   * 
   * *Default: * `assets = {}`
   */
  assets: Record<string, PhotoIdentifier[]>;
  /**
   * Provide loading assets state.
   * 
   * *Default: * `loading = false`
   */
  loading: boolean;
  /**
   * Provide string error if loading cause any error.
   * 
   * *Default: * `error = null`
   */
  error: string | null;
  /**
   * Provide list of assets on current device.
   * 
   * *Default: * `fullAssets = []`
   */
  fullAssets: PhotoIdentifier[];
  /**
   * Provide the total assets that has been accessed.
   * 
   * *Default: * `totalAssets = 0`
   */
  totalAssets: number;
  /**
   * Provide the object related for pagination on `fullAssets`.
   * 
   * *Default: * `fullAssetsPagination = undefined`
   */
  fullAssetsPagination: Pagination | undefined;
  /**
   * Provide function for fecth assets which not grouped by album. Return `true` if has next page.
   * 
   * numberAssetsToLoad: number. Define number assets load per time.
   * 
   * after?: string. Define the `endCursor` if you want to start from there. `endCursor` in `Pagination` type.
   * 
   * type?: string. Define the asset type that you want to fetch. Default: "All".
   * 
   * isReset?: boolean. Will fetch from scratch. Default: `false`.
   * 
   * *Example: * `loadFullAssets: (numberAssetsToLoad: number, after?: string, type?: AssetType, isReset?: boolean) => Promise<boolean>;`
   */
  loadFullAssets: (numberAssetsToLoad: number, after?: string, type?: AssetType, isReset?: boolean) => Promise<boolean>;
  /**
   * Provide function for fecth assets which grouped by album. Return `true` if has next page.
   * 
   * album: Album. The Album will inherited `Album` in @react-native-camera-roll/camera-roll. Provide album for fetch assets related to that album.
   * 
   * numberAssetsToLoad: number. Define number assets load per time
   * 
   * after?: string. Define the `endCursor` if you want to start from there. `endCursor` in `Pagination` type
   * 
   * type?: string. Define the asset type that you want to fetch. Default: "All".
   * 
   * *Example: * `loadAssets: (album: Album, numberAssetsToLoad: number, after?: string, type?: AssetType) => Promise<boolean>;`
   * 
   * **Note: ** id property (albumId) exist at @react-native-camera-roll/camera-roll version 7.7.0 or higher.
   */
  loadAssets: (album: Album, numberAssetsToLoad: number, after?: string, type?: AssetType) => Promise<boolean>;
  /**
   * Provide the object related for pagination on `assets` that based on album title.
   * 
   * *Default: * `pagination = undefined` 
   */
  pagination: Record<string, Pagination>;
  /**
   * Provide function for request permission. Return `true` if user provided permission.
   * 
   * *Example: * `requestPermission: () => Promise<boolean>;`
   */
  requestPermission: () => Promise<boolean>;
  /**
   * Provide function returning if user has provided permission.
   * 
   * *Example: * `requestPermission: () => Promise<boolean>;`
   */
  checkPermission: () => Promise<boolean>;
  /**
   * Provide a state that keep track user permisison.
   * 
   * *Default: * `hasPermission = false`
   */
  hasPermission: boolean;
  /**
   * Provide function changing with asset type that you want to fecth.
   * 
   * Please notice that, you should provide video permision if want to access videos.
   * 
   * *Default: * type = `'All'`.
   * 
   * *Example: * `changeAssetType: (type: AssetType) => void;`
   */
  changeAssetType: (type: AssetType) => void;
};

export interface Album extends Omit<AlbumType, 'id'> {
  /**
   * id property exist at @react-native-camera-roll/camera-roll version 7.7.0 or higher.
   */
  id?: string;
}

export interface Pagination {
  /**
   * A boolean value, response true if has next page.
   * 
   * *Default: * `hasNextPage = false`
   */
  hasNextPage: boolean;
  /**
   * The cursor for handling next asset after its cursor.
   * 
   * *Default: * `endCursor = undefined`
   */
  endCursor: string | undefined;
}