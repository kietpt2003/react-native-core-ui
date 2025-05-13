import { View, Text, Animated as RNAnimated, TouchableOpacity, Image, StyleSheet, ColorValue, TextStyle } from 'react-native'
import React from 'react'
import { colors, fontSize } from '@themes';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, SharedValue, useAnimatedScrollHandler, useSharedValue, withSpring } from 'react-native-reanimated';
import { statusBarHeight } from '@utils';
import { height as ScreenHeight, width } from '@utils';
import AlbumHeaderFilter from './AlbumHeaderFilter';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { Album } from 'hooks/types/useGalleryAssetsTypes';

export interface AlbumFilterStyleProps {
    titleColor?: ColorValue;
    countColor?: ColorValue;
}

export type AlbumFilterProps = {
    setSelectedAlbum: React.Dispatch<React.SetStateAction<Album | null>>;
    topAnimation: SharedValue<number>;
    isPanEnabled: boolean;
    setIsPanEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    enableScroll: boolean;
    setEnableScroll: React.Dispatch<React.SetStateAction<boolean>>;
    isTop: boolean;
    setIsTop: React.Dispatch<React.SetStateAction<boolean>>;
    openHeight: number;
    setShowAlbumsList: React.Dispatch<React.SetStateAction<boolean>>;
    albums: Album[];
    assets: Record<string, PhotoIdentifier[]>;
    fullAssets: PhotoIdentifier[];
    totalAssets: number;
    headerTitle: string;
    headerBarColor: ColorValue;
    backgroundColor: ColorValue;
    albumItemStyle?: AlbumFilterStyleProps;
    emptyGalleryMsg: string;
    safeEmptyGalleryMsgStyle: Partial<TextStyle>;
}

export interface AlbumFilterMethods {
    handleOpenAlbumFilter: () => void;
    handleCloseAlbumFilter: () => void;
}

export const AlbumFilter = React.forwardRef<AlbumFilterMethods, AlbumFilterProps>(
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
            setShowAlbumsList,
            albums,
            assets,
            fullAssets,
            totalAssets,
            headerTitle,
            headerBarColor,
            backgroundColor,
            albumItemStyle,
            emptyGalleryMsg,
            safeEmptyGalleryMsgStyle
        }: AlbumFilterProps,
        ref
    ) => {
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

        const translateY = React.useRef(new RNAnimated.Value(ScreenHeight)).current;
        const handleOpenAlbumFilter = () => {
            RNAnimated.timing(translateY, {
                toValue: 0, // Dịch chuyển đến vị trí ban đầu
                duration: 800, // Thời gian chạy animation (ms)
                useNativeDriver: true, // Sử dụng native driver để tăng hiệu suất
            }).start();
            setShowAlbumsList(true);
        }
        const handleCloseAlbumFilter = () => {
            setIsPanEnabled(true); //Fix bug không kéo được khi albumFilter mở
            RNAnimated.timing(translateY, {
                toValue: ScreenHeight, // Dịch chuyển đến vị trí ban đầu
                duration: 800, // Thời gian chạy animation (ms)
                useNativeDriver: true, // Sử dụng native driver để tăng hiệu suất
            }).start();
            setShowAlbumsList(false);
        }

        React.useImperativeHandle(
            ref,
            () => ({
                handleOpenAlbumFilter,
                handleCloseAlbumFilter,
            }),
        );

        return (
            <RNAnimated.View
                style={[
                    styles.container,
                    {
                        transform: [{ translateY }],
                        backgroundColor: backgroundColor,
                    }, // Thêm animation dịch chuyển
                ]}
            >
                <View style={[
                    styles.handleContainer,
                    {
                        backgroundColor: headerBarColor
                    }
                ]} />
                {(albums.length === 0 || fullAssets.length === 0 || totalAssets === 0) ? (
                    <Text style={[
                        styles.noImage,
                        safeEmptyGalleryMsgStyle
                    ]}>{emptyGalleryMsg}</Text>
                ) : (
                    <GestureDetector
                        gesture={Gesture.Simultaneous(panScroll, scrollViewGesture)}>
                        <Animated.FlatList
                            data={albums}
                            scrollEnabled={enableScroll}
                            keyExtractor={(_item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.itemContentContainer}
                                        onPress={() => {
                                            handleCloseAlbumFilter();
                                            setSelectedAlbum(item);
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <Image
                                            source={{
                                                uri: assets[item?.id ?? item.title]?.[0]?.node.image.uri,
                                            }}
                                            style={styles.albumFirstImage}
                                        />
                                        <View>
                                            <Text style={[
                                                styles.albumTitlteTxt,
                                                { color: albumItemStyle?.titleColor ? albumItemStyle.titleColor : colors.black }
                                            ]}>{item.title}</Text>
                                            <Text style={[
                                                styles.assetCountTxt,
                                                { color: albumItemStyle?.countColor ? albumItemStyle.countColor : colors.gray_A0A0A0 }
                                            ]}>{item.count}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                            ListHeaderComponent={
                                <AlbumHeaderFilter
                                    setSelectedAlbum={setSelectedAlbum}
                                    handleCloseAlbumFilter={handleCloseAlbumFilter}
                                    fullAssets={fullAssets}
                                    totalAssets={totalAssets}
                                    headerTitle={headerTitle}
                                    albumItemStyle={albumItemStyle}
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

const styles = StyleSheet.create({
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
        fontSize: fontSize._18,
    },
    itemContentContainer: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 10
    },
    albumTitlteTxt: {
        fontSize: fontSize._16,
    },
    assetCountTxt: {
        fontSize: fontSize._14,
    },
    albumFirstImage: {
        width: (width - 20) / 7,
        height: (width - 20) / 7,
    }
});
