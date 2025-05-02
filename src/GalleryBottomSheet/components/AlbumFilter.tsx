import { View, Text, Animated as RNAnimated, TouchableOpacity, Image, Dimensions, StyleSheet, ListRenderItem } from 'react-native'
import React, { Dispatch, forwardRef, SetStateAction, useImperativeHandle, useRef } from 'react'
import { Colors } from '@constant';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, SharedValue, useAnimatedScrollHandler, useSharedValue, withSpring } from 'react-native-reanimated';
import { statusBarHeight } from '@utils';
import { height as ScreenHeight, width } from '@utils';
import AlbumHeaderFilter from './AlbumHeaderFilter';
import { useGalleryAssets } from '@hooks';
import { Album } from '@react-native-camera-roll/camera-roll';

export type AlbumFilterProps = {
    setSelectedAlbum: Dispatch<SetStateAction<Album | null>>;
    topAnimation: SharedValue<number>;
    isPanEnabled: boolean;
    setIsPanEnabled: Dispatch<SetStateAction<boolean>>;
    enableScroll: boolean;
    setEnableScroll: Dispatch<SetStateAction<boolean>>;
    isTop: boolean;
    setIsTop: Dispatch<SetStateAction<boolean>>;
    openHeight: number;
    setShowAlbumsList: Dispatch<SetStateAction<boolean>>;
}

export interface AlbumFilterMethods {
    handleOpenAlbumFilter: () => void;
    handleCloseAlbumFilter: () => void;
}

export const AlbumFilter = forwardRef<AlbumFilterMethods, AlbumFilterProps>(
    (
        {
            setSelectedAlbum,
            topAnimation,
            isPanEnabled,
            setIsPanEnabled,
            enableScroll,
            setEnableScroll,
            isTop,
            setIsTop,
            openHeight,
            setShowAlbumsList
        }: AlbumFilterProps,
        ref
    ) => {
        const {
            albums,
            photos,
            fullPhotos,
            totalImages
        } = useGalleryAssets();

        const scrollY = useSharedValue(0);
        const context = useSharedValue(0);
        const timing = useSharedValue(0);

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
                console.log(speedRate, isPanEnabled, isTop);


                if (isPanEnabled && isTop) {
                    if (event.velocityY > 0 && speedRate > 0.07 && scrollY.value == 0) {
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
                        topAnimation.value = withSpring(statusBarHeight, {
                            damping: 100,
                            stiffness: 400,
                        });
                    }
                } else if (!isPanEnabled && enableScroll && isTop) {
                    topAnimation.value = withSpring(statusBarHeight, {
                        damping: 100,
                        stiffness: 400,
                    });
                }

            });

        const scrollViewGesture = Gesture.Native();

        const translateY = useRef(new RNAnimated.Value(ScreenHeight)).current;
        const handleOpenAlbumFilter = () => {
            RNAnimated.timing(translateY, {
                toValue: 0, // Dịch chuyển đến vị trí ban đầu
                duration: 800, // Thời gian chạy animation (ms)
                useNativeDriver: true, // Sử dụng native driver để tăng hiệu suất
            }).start();
            setShowAlbumsList(true);
        }
        const handleCloseAlbumFilter = () => {
            RNAnimated.timing(translateY, {
                toValue: ScreenHeight, // Dịch chuyển đến vị trí ban đầu
                duration: 800, // Thời gian chạy animation (ms)
                useNativeDriver: true, // Sử dụng native driver để tăng hiệu suất
            }).start();
            setShowAlbumsList(false);
        }

        useImperativeHandle(
            ref,
            () => ({
                handleOpenAlbumFilter,
                handleCloseAlbumFilter,
            }),
        );

        return (
            <RNAnimated.View
                style={[
                    albumFilterStyleSheet.container,
                    {
                        transform: [{ translateY }],
                        backgroundColor: Colors.white,
                    }, // Thêm animation dịch chuyển
                ]}
            >
                <View style={[
                    albumFilterStyleSheet.handleContainer,
                    {
                        backgroundColor: Colors.white
                    }
                ]} />
                {(albums.length === 0 || fullPhotos.length === 0 || totalImages === 0) ? (
                    <Text style={albumFilterStyleSheet.noImage}>Không có hình ảnh để hiển thị</Text>
                ) : (
                    <GestureDetector
                        gesture={Gesture.Simultaneous(panScroll, scrollViewGesture)}>
                        <Animated.FlatList
                            data={albums}
                            scrollEnabled={enableScroll}
                            keyExtractor={(item) => item.title.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                if (!photos[item.title]?.some(value => value.node.type === "Photos")) {
                                    return null;
                                }

                                return (
                                    <TouchableOpacity
                                    style={albumFilterStyleSheet.itemContentContainer}
                                    onPress={() => {
                                        handleCloseAlbumFilter();
                                        setSelectedAlbum(item);
                                    }}
                                    >
                                    <Image
                                        source={{
                                        uri: photos[item.title]?.[0]?.node.image.uri,
                                        }}
                                        style={albumFilterStyleSheet.albumFirstImage}
                                    />
                                    <View>
                                        <Text style={albumFilterStyleSheet.albumTitlteTxt}>{item.title}</Text>
                                        <Text style={albumFilterStyleSheet.assetCountTxt}>{item.count}</Text>
                                    </View>
                                    </TouchableOpacity>
                                );
                            }}
                            ListHeaderComponent={
                                <AlbumHeaderFilter
                                    setSelectedAlbum={setSelectedAlbum}
                                    handleCloseAlbumFilter={handleCloseAlbumFilter}
                                    fullPhotos={fullPhotos}
                                    totalImages={totalImages}
                                />
                            }
                            onScroll={onScroll}
                        />
                    </GestureDetector>
                )}
            </RNAnimated.View>
        )
    }
)

const albumFilterStyleSheet = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        paddingHorizontal: 10,
        marginTop: 60
    },
    handleContainer: {
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 15
    },
    selectedAlbumContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    noImage: {
        textAlign: "center",
        fontSize: 18,
        color: Colors.black
    },
    itemContentContainer: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 10
    },
    albumTitlteTxt: {
        fontSize: 15,
        color: Colors.black
    },
    assetCountTxt: {
        color: Colors.gray_A0A0A0
    },
    albumFirstImage: {
        width: (width - 20) / 7,
        height: (width - 20) / 7,
    }
});
