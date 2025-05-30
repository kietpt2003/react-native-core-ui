import React from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  CameraRoll,
  PhotoIdentifier,
  AssetType,
} from "@react-native-camera-roll/camera-roll";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Album, Pagination, UseGalleryAssetsResult } from "./types/useGalleryAssetsTypes";

const numberAssetsToLoad = 15;

/**
 * You can use this hook for accessing device's assets or requesting related permission.
 * 
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#usegalleryassetsdefaultassettype-assettype)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#usegalleryassetsdefaultassettype-assettype
 */
export function useGalleryAssets(defaultAssetType: AssetType = "All"): UseGalleryAssetsResult {
  const [assets, setAssets] = React.useState<Record<string, PhotoIdentifier[]>>({});
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const [pagination, setPagination] = React.useState<Record<string, Pagination>>({});
  const [fullAssets, setFullAssets] = React.useState<PhotoIdentifier[]>([]);
  const [fullAssetsPagination, setFullAssetsPagination] = React.useState<Pagination | undefined>(undefined);
  const [totalAssets, setTotalAssets] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [assetType, setAssetType] = React.useState<AssetType>(defaultAssetType);

  const changeAssetType = (type: AssetType) => {
    setAlbums([]);
    setAssets({});
    setPagination({});
    setFullAssets([]);
    setFullAssetsPagination(undefined);
    setTotalAssets(0);
    if (hasPermission && type !== assetType) {
      setAssetType(type); // Trigger sau khi reset state hoàn tất
      loadFullAssets(numberAssetsToLoad, undefined, type, true);
      loadAlbums(numberAssetsToLoad, type, true);
    }
  };

  const checkPermission = async () => {
    if (Platform.OS === "android") {
      if (Platform.Version >= 33) { // Android 13 (API level 33) trở lên
        const result = await Promise.all([
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
        ]);
        const hasPermission = result[0] && result[1];
        setHasPermission(hasPermission);
        return hasPermission;
      } else { // Các phiên bản Android cũ hơn
        const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        setHasPermission(result);
        return result;
      }
    } else {
      const checkResult = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (checkResult === RESULTS.GRANTED) {
        setHasPermission(true);
        return true;
      } else {
        setHasPermission(false);
        return false;
      }
    }
  };

  const requestPermission = async () => {
    if (Platform.OS === "android") {
      if (Platform.Version >= 33) {
        const requestResults = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]);
        const result = requestResults[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          requestResults[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
          PermissionsAndroid.RESULTS.GRANTED;
        setHasPermission(result);
        return result;
      } else {
        const requestResults = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        const result = requestResults === PermissionsAndroid.RESULTS.GRANTED;
        setHasPermission(result);
        return result;
      }
    } else {
      const requestResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      const result = requestResult === RESULTS.GRANTED;
      setHasPermission(result);
      return result;
    }
  };

  const loadFullAssets = async (numberAssetsToLoad: number, after?: string, type: AssetType = "All", isReset: boolean = false): Promise<boolean> => {
    setLoading(true);
    if (hasPermission) {
      const res = await CameraRoll.getPhotos({
        first: numberAssetsToLoad,
        assetType: type,
        after: after,
      });

      if (isReset) {
        setFullAssets(res.edges);
      } else {
        // Tạo Set chứa uri đã tồn tại
        const existingAssets = new Set(fullAssets.map((p) => p.node.image.uri));

        // Lọc các assets mới không bị trùng
        const uniqueNewAssets = res.edges.filter(
          (p) => !existingAssets.has(p.node.image.uri)
        );

        const newAssets = fullAssets.concat(uniqueNewAssets);
        setFullAssets(newAssets);
      }

      setFullAssetsPagination({
        hasNextPage: res.page_info.has_next_page,
        endCursor: res.page_info.end_cursor,
      });
      setLoading(false);
      return res.page_info.has_next_page;
    } else {
      setAlbums([]);
      setAssets({});
      setPagination({});
      setFullAssets([]);
      setFullAssetsPagination(undefined);
      setLoading(false);
      return false;
    }
  }

  //Lấy danh sách albums
  const loadAlbums = async (numberAssetsToLoad: number, type: AssetType = "All", isReset: boolean = false) => {
    try {
      setLoading(true);
      if (!hasPermission) {
        setAlbums([]);
        setAssets({});
        setPagination({});
        setFullAssets([]);
        setFullAssetsPagination(undefined);
        setLoading(false);
        return;
      }

      const albumList = await CameraRoll.getAlbums({ assetType: type }) as Album[];

      if (albumList.length > 0) {
        let total = 0;
        albumList.forEach(async (album) => {
          total += album.count;
          await loadAssets(album, numberAssetsToLoad, isReset ? undefined : pagination[album?.id ?? album.title]?.endCursor, type);
        });
        setTotalAssets(total);
      }
      setAlbums(albumList);
    } catch (err) {
      setError("Failed to load albums");
      console.error("Error loading albums:", err);
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách assets từ thư mục
  const loadAssets = async (album: Album, numberAssetsToLoad: number, after?: string, type: AssetType = "All"): Promise<boolean> => {
    try {
      setLoading(true);
      if (!assets[album?.id ?? album.title]) assets[album?.id ?? album.title] = [];

      if (hasPermission) {
        const albumAssets = await CameraRoll.getPhotos({
          first: numberAssetsToLoad,
          groupName: album.title,
          assetType: type,
          after: after,
        });

        setAssets((prevAssets) => {
          const existing = prevAssets[album?.id ?? album.title] || [];

          // Tạo Set để kiểm tra duplicate dựa vào uri
          const existingAssets = new Set(existing.map((a) => a.node.image.uri));

          // Lọc assets mới
          const uniqueNewAssets = albumAssets.edges.filter(
            (a) => !existingAssets.has(a.node.image.uri)
          );

          return {
            ...prevAssets,
            [album?.id ?? album.title]: [...existing, ...uniqueNewAssets],
          };
        });

        setPagination((prevPagination) => ({
          ...prevPagination,
          [album?.id ?? album.title]: {
            hasNextPage: albumAssets.page_info.has_next_page,
            endCursor: albumAssets.page_info.end_cursor,
          },
        }));

        setLoading(false);
        return albumAssets.page_info.has_next_page;
      } else {
        setAlbums([]);
        setAssets({});
        setPagination({});
        setFullAssets([]);
        setFullAssetsPagination(undefined);
        setLoading(false);
        return false;
      }
    } catch (error) {
      setError("Failed to load assets from album");
      console.error("Error loading assets from album:", error);
      setLoading(false);
      return false;
    }
  };

  //Load full assets + assets in albums
  React.useEffect(() => {
    if (hasPermission) {
      loadFullAssets(numberAssetsToLoad, fullAssetsPagination?.endCursor, assetType);
      loadAlbums(numberAssetsToLoad, assetType);
    }
  }, [hasPermission])

  React.useEffect(() => {
    checkPermission();
  }, [])

  return {
    albums,
    assets,
    loading,
    error,
    fullAssets,
    totalAssets,
    fullAssetsPagination,
    loadFullAssets,
    loadAssets,
    pagination,
    requestPermission,
    checkPermission,
    hasPermission,
    changeAssetType
  };
}
