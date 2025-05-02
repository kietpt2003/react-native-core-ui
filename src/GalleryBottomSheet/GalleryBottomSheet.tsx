import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, {
    forwardRef,
    useImperativeHandle,
    useCallback,
    useState,
    useRef,
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
import { Colors } from '@constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { statusBarHeight, height as ScreenHeight, width as ScreenWidth } from '@utils';
import { useGalleryAssets } from '@hooks';
import { AlbumFilter, AlbumFilterMethods } from './components/AlbumFilter';
import { Album } from '@react-native-camera-roll/camera-roll';

export interface BottomSheetGalleryProps {
    snapTo: number;
}

export interface BottomSheetGalleryMethods {
    handleBottomSheetGallery: () => void;
    handleOpenPhoneSetting: () => void;
    isBottomSheetGalleryOpen: boolean;
}

const GalleryBottomSheet = forwardRef<BottomSheetGalleryMethods, BottomSheetGalleryProps>(
    (
        {
            snapTo,
        }: BottomSheetGalleryProps,
        ref,
    ) => {
        const {
            albums,
            fullPhotos,
            fullPhotoPagination,
            loadFullPhotos,
            totalImages,
            photos,
            loadPhotos,
            pagination,
            requestPermission,
        } = useGalleryAssets();

        // album filter
        const albumFilterRef = useRef<AlbumFilterMethods>(null);
        const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
        const [showAlbumsList, setShowAlbumsList] = useState<boolean>(false);

        const inset = useSafeAreaInsets();
        const closeHeight = ScreenHeight;
        const openHeight = snapTo;
        const topAnimation = useSharedValue(closeHeight);
        const context = useSharedValue(0);
        const timing = useSharedValue(0);

        const scrollY = useSharedValue(0);
        const [enableScroll, setEnableScroll] = useState(true);
        const [isPanEnabled, setIsPanEnabled] = useState(true);
        const [isTop, setIsTop] = useState(false);

        const [isBottomSheetGalleryOpen, setIsBottomSheetGalleryOpen] = useState<boolean>(false);

        const expand = useCallback(() => {
            'worklet';
            topAnimation.value = withTiming(openHeight);
            runOnJS(setIsTop)(false);
            setIsBottomSheetGalleryOpen(true);
        }, [openHeight, topAnimation]);

        const close = useCallback(() => {
            'worklet';
            topAnimation.value = withTiming(closeHeight);
            runOnJS(setIsTop)(false);
            setIsBottomSheetGalleryOpen(false);
        }, [closeHeight, topAnimation]);

        const [isGalleryVisible, setGalleryVisible] = useState(false);
        const handleOpenBottomSheet = () => {
            setGalleryVisible(true);
            setShowAlbumsList(false);
        }
        const handleCloseBottomSheet = () => {
            setGalleryVisible(false);
            if (albumFilterRef.current != null) {
                albumFilterRef.current.handleCloseAlbumFilter();
            }
        }

        const handleOpenPhoneSetting = async () => {
            const hasPermission = await requestPermission();
            if (hasPermission) {
                handleBottomSheetGallery();
            }
        }
        const handleBottomSheetGallery = () => {
            if (!isGalleryVisible) {
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
                context.value = topAnimation.value;
                timing.value = 0;
            })
            .onUpdate(event => {
                timing.value++;
                topAnimation.value = withSpring(context.value + event.translationY, {
                    damping: 100,
                    stiffness: 400,
                });
            })
            .onEnd((event) => {
                const speedRate = 1 / timing.value;

                if (!isTop) {
                    if (event.velocityY < 0 && (topAnimation.value < ScreenHeight / 2 || (speedRate > 0.08 && topAnimation.value < openHeight))) {
                        topAnimation.value = withSpring(ScreenHeight * .07, {
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
                    } else if (event.velocityY > 0 && (topAnimation.value >= ScreenHeight / 2 - statusBarHeight && speedRate <= 0.11)) {
                        topAnimation.value = withSpring(openHeight, {
                            damping: 100,
                            stiffness: 400,
                        });
                        runOnJS(setIsTop)(false);
                    } else {
                        topAnimation.value = withSpring(ScreenHeight * .07, {
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
                context.value = topAnimation.value;
                timing.value = 0;
                runOnJS(setIsPanEnabled)(false);
            })
            .onUpdate(event => {
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
                        if (event.velocityY > 0 && (topAnimation.value >= ScreenHeight / 2 - statusBarHeight && speedRate <= 0.11)) {
                            topAnimation.value = withSpring(openHeight, {
                                damping: 100,
                                stiffness: 400,
                            });
                            runOnJS(setIsTop)(false);
                        } else {
                            topAnimation.value = withSpring(ScreenHeight * .07, {
                                damping: 100,
                                stiffness: 400,
                            });
                        }
                } else if (!isPanEnabled && enableScroll && isTop) {
                    topAnimation.value = withSpring(ScreenHeight * .07, {
                        damping: 100,
                        stiffness: 400,
                    });
                }

            });

        const scrollViewGesture = Gesture.Native();

        useImperativeHandle(
            ref,
            () => ({
                handleBottomSheetGallery,
                handleOpenPhoneSetting,
                isBottomSheetGalleryOpen,
            }),
        );

        return (
            <>
                <GestureDetector gesture={pan}>
                    <Animated.View
                        style={[
                            styles.container,
                            animationStyle,
                            {
                                backgroundColor: Colors.white,
                                paddingBottom: inset.bottom,
                            },
                        ]}>
                        <View
                            style={[
                                bottomSheetGalleryStyleSheet.handleContainer,
                                {
                                    backgroundColor: Colors.white
                                }
                            ]}
                        >
                            <View style={bottomSheetGalleryStyleSheet.handleBar} />
                            <TouchableOpacity
                                style={bottomSheetGalleryStyleSheet.selectedAlbumContainer}
                                onPress={() => {
                                    if (albumFilterRef.current != null) {
                                        if (!showAlbumsList) {
                                            albumFilterRef.current.handleOpenAlbumFilter();
                                        } else {
                                            albumFilterRef.current.handleCloseAlbumFilter();
                                        }
                                    }
                                }}
                                disabled={albums.length === 0 || fullPhotos.length === 0 || totalImages == 0}
                                touchSoundDisabled={true}
                            >
                                <Text style={bottomSheetGalleryStyleSheet.handleText}>{selectedAlbum == null ? "Tất cả ảnh" : selectedAlbum.title}</Text>
                                <AntDesign name={!showAlbumsList ? "down" : "up"} size={15} color={Colors.black} />
                            </TouchableOpacity>
                        </View>

                        <GestureDetector
                            gesture={Gesture.Simultaneous(panScroll, scrollViewGesture)}>
                            {(albums.length === 0 || fullPhotos.length === 0 || totalImages == 0) ? (
                                <View>
                                    <Text style={bottomSheetGalleryStyleSheet.noImage}>Không có hình ảnh để hiển thị</Text>
                                </View>
                            ) : (
                                <Animated.FlatList
                                    data={selectedAlbum == null ? fullPhotos : photos[selectedAlbum.title]}
                                    scrollEnabled={enableScroll}
                                    renderItem={({ item }) => (
                                        <Image
                                            source={{ uri: item.node.image.uri }}
                                            style={bottomSheetGalleryStyleSheet.image}
                                        />
                                    )}
                                    onScroll={onScroll}
                                    bounces={false}
                                    scrollEventThrottle={16}

                                    numColumns={3}
                                    columnWrapperStyle={bottomSheetGalleryStyleSheet.row}
                                    onEndReached={() => {
                                        //Load more photos
                                        if (selectedAlbum == null) {
                                            loadFullPhotos(10, fullPhotoPagination?.endCursor);
                                        } else {
                                            loadPhotos(selectedAlbum, 10, pagination[selectedAlbum.title].endCursor);
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
                        />
                    </Animated.View>
                </GestureDetector>
            </>
        );
    },
);

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
});

const bottomSheetGalleryStyleSheet = StyleSheet.create({
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
        backgroundColor: Colors.black,
        marginBottom: 8, // Thêm khoảng cách giữa thanh kéo và chữ
    },
    handleText: {
        fontSize: 16,
        color: Colors.black,
        fontFamily: "RobotoMedium"
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
        fontFamily: "RobotoMedium",
        fontSize: 18,
        color: Colors.black
    },
    row: {
        justifyContent: 'space-between',
    },
    image: {
        width: (ScreenWidth - 20) / 3,
        height: (ScreenWidth - 20) / 3,
        borderRadius: 8,
        marginBottom: 5,
    },
});