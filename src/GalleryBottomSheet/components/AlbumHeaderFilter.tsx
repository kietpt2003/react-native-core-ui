import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { width } from '@utils';
import { colors, fontSize } from '@themes';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { Album } from 'hooks/types/useGalleryAssetsTypes';
import { AlbumFilterStyleProps } from './AlbumFilter';

export type AlbumHeaderFilterProps = {
    setSelectedAlbum: React.Dispatch<React.SetStateAction<Album | null>>;
    handleCloseAlbumFilter: () => void;
    fullAssets: PhotoIdentifier[];
    totalAssets: number,
    headerTitle: string;
    albumItemStyle?: AlbumFilterStyleProps;
}

const AlbumHeaderFilter = ({
    setSelectedAlbum,
    handleCloseAlbumFilter,
    fullAssets,
    totalAssets,
    headerTitle,
    albumItemStyle,
}: AlbumHeaderFilterProps) => {
    return (
        <TouchableOpacity
            style={styles.itemContentContainer}
            onPress={() => {
                handleCloseAlbumFilter();
                setSelectedAlbum(null);
            }}
            activeOpacity={0.7}
        >
            <Image source={{ uri: fullAssets.at(0)?.node.image.uri }} style={styles.albumFirstImage} />
            <View>
                <Text style={[
                    styles.albumTitlteTxt,
                    { color: albumItemStyle?.titleColor ? albumItemStyle.titleColor : colors.black }
                ]}>{headerTitle}</Text>
                <Text style={[
                    styles.assetCountTxt,
                    { color: albumItemStyle?.countColor ? albumItemStyle.countColor : colors.gray_A0A0A0 }
                ]}>{totalAssets}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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

export default AlbumHeaderFilter