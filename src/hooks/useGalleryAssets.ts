import { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
  CameraRoll,
  PhotoIdentifier,
  Album,
  AssetType,
} from "@react-native-camera-roll/camera-roll";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

type UseGalleryAssetsResult = {
  albums: Album[];
  photos: Record<string, PhotoIdentifier[]>;
  loading: boolean;
  error: string | null;
  fullPhotos: PhotoIdentifier[];
  totalImages: number;
  fullPhotoPagination: Pagination | undefined;
  loadFullPhotos: (numberPhotoToLoad: number, after?: string, type?: AssetType) => Promise<boolean>;
  loadPhotos: (album: Album, numberPhotoToLoad: number, after?: string, type?: AssetType) => Promise<boolean>;
  pagination: Record<string, Pagination>;
  requestPermission: () => Promise<boolean>;
};

interface Pagination {
  hasNextPage: boolean; // Có thêm dữ liệu không?
  endCursor: string | undefined; // Cursor để lấy dữ liệu tiếp theo
}

export function useGalleryAssets(): UseGalleryAssetsResult {
  const [photos, setPhotos] = useState<Record<string, PhotoIdentifier[]>>({});
  const [albums, setAlbums] = useState<Album[]>([]);
  const [pagination, setPagination] = useState<Record<string, Pagination>>({});
  const [fullPhotos, setFullPhotos] = useState<PhotoIdentifier[]>([]);
  const [fullPhotoPagination, setFullPhotoPagination] = useState<Pagination | undefined>(undefined);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async () => {
    try {
      let permission;
      if (Platform.OS === "android") {
        permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      } else {
        permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
      }

      const result = await check(permission);
      if (result === RESULTS.GRANTED) return true;

      const requestResult = await request(permission);
      return requestResult === RESULTS.GRANTED;
    } catch (err) {
      setError("Permission check failed");
      return false;
    }
  };

  const getTotalPhotos = async () => {
    try {
      if (albums.length > 0) {
        let total = 0;
        albums.forEach(al => {
          total += al.count;
        });
        setTotalImages(total);
      }
    } catch (error) {
      console.error('Lỗi khi lấy tổng số ảnh:', error);
      return 0;
    }
  };

  const loadFullPhotos = async (numberPhotoToLoad: number, after?: string, type: AssetType = "All"): Promise<boolean> => {
    setLoading(true);
    const hasPermission = await requestPermission(); // Xin quyền truy cập

    if (hasPermission) {
      const res = await CameraRoll.getPhotos({
        first: numberPhotoToLoad,
        assetType: type,
        after: after,
      });

      const existingPhotos = fullPhotos;
      const newPhotos = existingPhotos.concat(res.edges);

      setFullPhotos(newPhotos);

      setFullPhotoPagination({
        hasNextPage: res.page_info.has_next_page,
        endCursor: res.page_info.end_cursor,
      });
      setLoading(false);
      return res.page_info.has_next_page;
    } else {
      setAlbums([]);
      setPhotos({});
      setPagination({});
      setFullPhotos([]);
      setFullPhotoPagination(undefined);
      setLoading(false);
      return false;
    }
  }

  //Lấy danh sách albums
  const loadAlbums = async (type: AssetType = "All") => {
    try {
      setLoading(true);
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        setError("Permission denied");
        setLoading(false);
        return;
      }

      const albumList = await CameraRoll.getAlbums({ assetType: type });
      setAlbums(albumList);
    } catch (err) {
      setError("Failed to load albums");
      console.error("Error loading albums:", err);
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách ảnh từ thư mục
  const loadPhotos = async (album: Album, numberPhotoToLoad: number, after?: string, type: AssetType = "All"): Promise<boolean> => {
    try {
      setLoading(true);
      if (!photos[album.title]) photos[album.title] = [];

      const hasPermission = await requestPermission(); // Xin quyền truy cập

      if (hasPermission) {
        const albumAssets = await CameraRoll.getPhotos({
          first: numberPhotoToLoad,
          groupName: album.title,
          assetType: type,
          include: ['filename', 'fileSize', 'location', 'imageSize', 'playableDuration'],
        });

        const existingPhotos = photos[album.title] || [];
        const newPhotos = existingPhotos.concat(albumAssets.edges);

        setPhotos((prevPhotos) => {
          return {
            ...prevPhotos,
            [album.title]: newPhotos,
          };
        });

        setPagination((prevPagination) => ({
          ...prevPagination,
          [album.title]: {
            hasNextPage: albumAssets.page_info.has_next_page,
            endCursor: albumAssets.page_info.end_cursor,
          },
        }));

        setLoading(false);
        return albumAssets.page_info.has_next_page;
      } else {
        setAlbums([]);
        setPhotos({});
        setPagination({});
        setFullPhotos([]);
        setFullPhotoPagination(undefined);
        setLoading(false);
        return false;
      }
    } catch (error) {
      setError("Failed to load photos from album");
      console.error("Error loading photos from album:", error);
      setLoading(false);
      return false;
    }
  };

  async function loadPhotosFromAlbum(numberPhotoToLoad: number) {
    if (albums.length > 0) {
      albums.forEach(async (album) => {
        await loadPhotos(album, numberPhotoToLoad, pagination[album.title]?.endCursor);
      });
    }
  }

  //Count total photos
  useEffect(() => {
    getTotalPhotos();
  }, [photos])

  //Load full photos
  useEffect(() => {
    loadFullPhotos(9, fullPhotoPagination?.endCursor);
  }, [])

  //Load albums
  useEffect(() => {
    loadAlbums();
  }, [])

  //Load photos from album
  useEffect(() => {
    if (albums.length > 0) {
      loadPhotosFromAlbum(3);
    }
  }, [albums])

  return {
    albums,
    photos,
    loading,
    error,
    fullPhotos,
    totalImages,
    fullPhotoPagination,
    loadFullPhotos,
    loadPhotos,
    pagination,
    requestPermission
  };
}
