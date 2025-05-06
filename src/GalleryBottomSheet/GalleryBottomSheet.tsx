import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, {
    forwardRef,
    useImperativeHandle,
    useCallback,
    useState,
    useRef,
    useEffect,
} from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    useAnimatedScrollHandler,
    runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSize } from '@constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { statusBarHeight, height, width, filterAllowedTextStyle } from '@utils';
import { useGalleryAssets } from '@hooks';
import { AlbumFilter, AlbumFilterMethods } from './components/AlbumFilter';
import { Album } from 'hooks/useGalleryAssets';
import { BottomSheetGalleryProps } from './types/GalleryBottomSheetTypes';
import { limitedString } from 'd4dpocket';
import PlayCircle from './components/PlayCircle';
import { AssetType, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import SelectItem from './components/SelectItem';

const videoIconSize = 48;

/**
 * A bottom sheet component for displaying a gallery of images and videos.
 * It allows users to select multiple assets and provides a filter for albums.
 */
const GalleryBottomSheet = ({
    isOpen = false,
    openHeight = height / 2,
    closeHeight = height,
    maxHeight = 0,
    headerBarColor = Colors.white,
    barIconColor = Colors.black,
    headerTitleStyle = {
        color: Colors.black,
    },
    headerTitle = "Tất cả ảnh",
    headerTitleIconColor = Colors.black,
    backgroundColor = Colors.white,
    emptyGalleryMsg = "Không có hình ảnh để hiển thị",
    emptyGalleryMsgStyle = {
        color: Colors.black,
    },
    videoIconStyle,
    albumItemStyle,
    assetType = "All",
    maxSelectable = 5,
    onSelectedAssetsChange,
}: BottomSheetGalleryProps) => {
    const safeHeaderTitleStyle = filterAllowedTextStyle(headerTitleStyle);
    const truncatedHeaderTitle = limitedString(headerTitle, 3);
    const safeEmptyGalleryMsgStyle = filterAllowedTextStyle(emptyGalleryMsgStyle);
    const {
        albums,
        fullAssets,
        fullAssetsPagination,
        loadFullAssets,
        totalAssets,
        assets,
        loadAssets,
        pagination,
        requestPermission,
        hasPermission,
        changeAssetType,
    } = useGalleryAssets(assetType);

    // album filter
    const albumFilterRef = useRef<AlbumFilterMethods>(null);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [showAlbumsList, setShowAlbumsList] = useState<boolean>(false);

    const inset = useSafeAreaInsets();
    const topAnimation = useSharedValue(closeHeight);
    const context = useSharedValue(0);
    const timing = useSharedValue(0);

    const scrollY = useSharedValue(0);
    const [enableScroll, setEnableScroll] = useState(true);
    const [isPanEnabled, setIsPanEnabled] = useState(true);
    const [isTop, setIsTop] = useState(false);

    const [assetTypeState, setAssetTypeState] = useState<AssetType>(assetType);

    const [selectedAssets, setSelectedAssets] = useState<PhotoIdentifier[]>([]);
    const toggleAsset = (item: PhotoIdentifier) => {
        setSelectedAssets(prev => {
            const index = prev.findIndex(asset => asset.node.image.uri === item.node.image.uri);

            if (index !== -1) {
                // Nếu đã tồn tại → xóa item khỏi mảng (giữ đúng thứ tự còn lại)
                return [...prev.slice(0, index), ...prev.slice(index + 1)];
            } else if (prev.length < maxSelectable) {
                // Nếu chưa tồn tại và chưa đạt max → thêm vào cuối mảng
                return [...prev, item];
            } else {
                // Đã đạt max → không thay đổi
                return prev;
            }
        });
    };
    const getSelectedInfo = (item: PhotoIdentifier): { isSelected: boolean; index: number } => {
        const index = selectedAssets.findIndex(
            asset => asset.node.image.uri === item.node.image.uri
        );
        return {
            isSelected: index !== -1,
            index,
        };
    };

    const expand = useCallback(() => {
        'worklet';
        topAnimation.value = withTiming(openHeight);
        runOnJS(setIsTop)(false);
    }, [openHeight, topAnimation]);

    const close = useCallback(() => {
        'worklet';
        topAnimation.value = withTiming(closeHeight);
        runOnJS(setIsTop)(false);
    }, [closeHeight, topAnimation]);

    const handleOpenBottomSheet = () => {
        setShowAlbumsList(false);
    }
    const handleCloseBottomSheet = () => {
        if (albumFilterRef.current != null) {
            albumFilterRef.current.handleCloseAlbumFilter();
        }
    }

    const handleBottomSheetGallery = () => {
        if (!hasPermission) {
            requestPermission();
            return;
        }
        if (isOpen) {
            handleOpenBottomSheet();
            expand();
        } else {
            handleCloseBottomSheet();
            close();
        }
    }

    const animationStyle = useAnimatedStyle(() => {
        const top = topAnimation.value;
        return {
            top,
        };
    });

    const pan = Gesture.Pan()
        .enabled(isPanEnabled)
        .onBegin(() => {
            'worklet';
            context.value = topAnimation.value;
            timing.value = 0;
        })
        .onUpdate(event => {
            'worklet';
            timing.value++;
            topAnimation.value = withSpring(context.value + event.translationY, {
                damping: 100,
                stiffness: 400,
            });
        })
        .onEnd((event) => {
            'worklet';
            const speedRate = 1 / timing.value;

            if (!isTop) {
                if (event.velocityY < 0 && (topAnimation.value < height / 2 || (speedRate > 0.08 && topAnimation.value < openHeight))) {
                    topAnimation.value = withSpring(maxHeight, {
                        damping: 100,
                        stiffness: 400,
                    });
                    runOnJS(setIsTop)(true);
                } else {
                    topAnimation.value = withSpring(openHeight, {
                        damping: 100,
                        stiffness: 400,
                    });
                }
            } else {
                if (event.velocityY > 0 && speedRate > 0.11) {
                    topAnimation.value = withSpring(openHeight, {
                        damping: 100,
                        stiffness: 400,
                    });
                    runOnJS(setIsTop)(false);
                } else if (event.velocityY > 0 && (topAnimation.value >= height / 2 - statusBarHeight && speedRate <= 0.11)) {
                    topAnimation.value = withSpring(openHeight, {
                        damping: 100,
                        stiffness: 400,
                    });
                    runOnJS(setIsTop)(false);
                } else {
                    topAnimation.value = withSpring(maxHeight, {
                        damping: 100,
                        stiffness: 400,
                    });
                }
            }
        });

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const panScroll = Gesture.Pan()
        .onBegin(() => {
            'worklet';
            context.value = topAnimation.value;
            timing.value = 0;
            runOnJS(setIsPanEnabled)(false);
        })
        .onUpdate(event => {
            'worklet';
            timing.value++;

            if (event.velocityY > 0 && scrollY.value == 0 && isTop) {
                runOnJS(setIsPanEnabled)(true);
                runOnJS(setEnableScroll)(false);
                topAnimation.value = withSpring(context.value + event.translationY, {
                    damping: 100,
                    stiffness: 400,
                });
            }

            if (!enableScroll && isTop) {
                topAnimation.value = withSpring(context.value + event.translationY, {
                    damping: 100,
                    stiffness: 400,
                });
            }
        })
        .onEnd((event) => {
            'worklet';
            runOnJS(setIsPanEnabled)(true);
            runOnJS(setEnableScroll)(true);
            const speedRate = 1 / timing.value;

            if (isPanEnabled && isTop) {
                if (event.velocityY > 0 && speedRate > 0.11 && scrollY.value == 0) {
                    topAnimation.value = withSpring(openHeight, {
                        damping: 100,
                        stiffness: 400,
                    });
                    runOnJS(setIsTop)(false);
                } else
                    if (event.velocityY > 0 && (topAnimation.value >= height / 2 - statusBarHeight && speedRate <= 0.11)) {
                        topAnimation.value = withSpring(openHeight, {
                            damping: 100,
                            stiffness: 400,
                        });
                        runOnJS(setIsTop)(false);
                    } else {
                        topAnimation.value = withSpring(maxHeight, {
                            damping: 100,
                            stiffness: 400,
                        });
                    }
            } else if (!isPanEnabled && enableScroll && isTop) {
                topAnimation.value = withSpring(maxHeight, {
                    damping: 100,
                    stiffness: 400,
                });
            }

        });

    const scrollViewGesture = Gesture.Native();

    // Trigger when change asset type
    React.useEffect(() => {
        if (assetTypeState !== assetType) {
            setAssetTypeState(assetType);
            changeAssetType(assetType);
            setSelectedAlbum(null); // For handling no data in album filter after reset album data
        }
    }, [assetType]);

    // Trigger when selectedAssets change
    React.useEffect(() => {
        if (onSelectedAssetsChange) {
            onSelectedAssetsChange(selectedAssets);
        }
    }, [selectedAssets]);

    React.useEffect(() => {
        handleBottomSheetGallery();
    }, [isOpen])

    return (
        <>
            <GestureDetector gesture={pan}>
                <Animated.View
                    style={[
                        styles.container,
                        animationStyle,
                        {
                            backgroundColor: backgroundColor,
                            paddingBottom: inset.bottom,
                        },
                    ]}>
                    <View
                        style={[
                            styles.handleContainer,
                            {
                                backgroundColor: headerBarColor
                            }
                        ]}
                    >
                        <View style={[styles.handleBar, {
                            backgroundColor: barIconColor,
                        }]} />
                        <TouchableOpacity
                            style={styles.selectedAlbumContainer}
                            onPress={() => {
                                if (albumFilterRef.current != null) {
                                    if (!showAlbumsList) {
                                        albumFilterRef.current.handleOpenAlbumFilter();
                                    } else {
                                        albumFilterRef.current.handleCloseAlbumFilter();
                                    }
                                }
                            }}
                            disabled={albums.length === 0 || fullAssets.length === 0 || totalAssets == 0}
                            touchSoundDisabled={true}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.handleText,
                                safeHeaderTitleStyle
                            ]}>{selectedAlbum == null ? truncatedHeaderTitle : selectedAlbum.title}</Text>
                            <AntDesign name={!showAlbumsList ? "down" : "up"} size={15} color={headerTitleIconColor} />
                        </TouchableOpacity>
                    </View>

                    <GestureDetector
                        gesture={Gesture.Simultaneous(panScroll, scrollViewGesture)}>
                        {(albums.length === 0 || fullAssets.length === 0 || totalAssets == 0) ? (
                            <View>
                                <Text style={[
                                    styles.noImage,
                                    safeEmptyGalleryMsgStyle
                                ]}>{emptyGalleryMsg}</Text>
                            </View>
                        ) : (
                            <Animated.FlatList
                                data={selectedAlbum == null ? fullAssets : assets[selectedAlbum.id]}
                                scrollEnabled={enableScroll}
                                keyExtractor={(item) => item.node.image.uri}
                                renderItem={({ item }) => {
                                    const info = getSelectedInfo(item);
                                    return (
                                        <TouchableOpacity
                                            style={styles.image}
                                            onPress={() => toggleAsset(item)}
                                            activeOpacity={0.7}
                                        >
                                            <Image
                                                source={{ uri: item.node.image.uri }}
                                                style={styles.image}
                                            />
                                            {
                                                item.node.type === "video/mp4" &&
                                                <PlayCircle
                                                    size={videoIconSize}
                                                    viewStyle={styles.videoIcon}
                                                    circleStyle={videoIconStyle?.circleStyle}
                                                    polygonStyle={videoIconStyle?.polygonStyle}
                                                />
                                            }
                                            {info.isSelected && (
                                                <SelectItem
                                                    selectItemStyle={{
                                                        backgroundColor: Colors.white_80,
                                                        iconColor: Colors.blue1890FF,
                                                        textColor: Colors.white,
                                                    }}
                                                    value={info.index + 1}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    )
                                }}
                                onScroll={onScroll}
                                bounces={false}
                                scrollEventThrottle={16}
                                numColumns={3}
                                columnWrapperStyle={styles.row}
                                onEndReached={() => {
                                    //Load more assets
                                    if (selectedAlbum == null) {
                                        loadFullAssets(15, fullAssetsPagination?.endCursor, assetTypeState);
                                    } else {
                                        loadAssets(selectedAlbum, 15, pagination[selectedAlbum.id].endCursor, assetTypeState);
                                    }
                                }}
                                onEndReachedThreshold={0.5}
                                initialNumToRender={9}
                                showsVerticalScrollIndicator={false}
                            />
                        )}
                    </GestureDetector>

                    <AlbumFilter
                        ref={albumFilterRef}
                        setSelectedAlbum={setSelectedAlbum}
                        topAnimation={topAnimation}
                        isPanEnabled={isPanEnabled}
                        setIsPanEnabled={setIsPanEnabled}
                        enableScroll={enableScroll}
                        setEnableScroll={setEnableScroll}
                        isTop={isTop}
                        setIsTop={setIsTop}
                        openHeight={openHeight}
                        setShowAlbumsList={setShowAlbumsList}
                        albums={albums}
                        assets={assets}
                        fullAssets={fullAssets}
                        totalAssets={totalAssets}
                        headerTitle={headerTitle}
                        headerBarColor={headerBarColor}
                        backgroundColor={backgroundColor}
                        albumItemStyle={albumItemStyle}
                        emptyGalleryMsg={emptyGalleryMsg}
                        safeEmptyGalleryMsgStyle={safeEmptyGalleryMsgStyle}
                    />
                </Animated.View>
            </GestureDetector>
        </>
    );
}

export default GalleryBottomSheet;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    lineContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    line: {
        width: 50,
        height: 4,
        backgroundColor: 'black',
        borderRadius: 20,
    },
    handleContainer: {
        alignItems: 'center',
        paddingVertical: 10, // Tăng chiều cao của panning area
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: 60,
    },
    handleBar: {
        width: 40,
        height: 6,
        borderRadius: 3,
        marginBottom: 8, // Thêm khoảng cách giữa thanh kéo và chữ
    },
    handleText: {
        fontSize: 16,
    },
    contentContainer: {
        flex: 1,
        padding: 5,
    },
    selectedAlbumContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    noImage: {
        textAlign: "center",
        fontSize: FontSize.fontSize18,
    },
    row: {
        justifyContent: 'space-between',
    },
    imageContainer: {
        width: (width - 20) / 3,
        height: (width - 20) / 3,
        borderRadius: 8,
        marginBottom: 5,
    },
    image: {
        width: (width - 20) / 3,
        height: (width - 20) / 3,
        borderRadius: 8,
        marginBottom: 5
    },
    videoIcon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -videoIconSize / 2 }, { translateY: -videoIconSize / 2 }],
    }
});