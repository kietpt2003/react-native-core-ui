import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { width } from '@utils';
import { Colors } from '@constants';
import { Album, PhotoIdentifier } from '@react-native-camera-roll/camera-roll';

export type AlbumHeaderFilterProps = {
    setSelectedAlbum: Dispatch<SetStateAction<Album | null>>;
    handleCloseAlbumFilter: () => void;
    fullPhotos: PhotoIdentifier[];
    totalImages: number
}

const AlbumHeaderFilter = ({setSelectedAlbum, handleCloseAlbumFilter,fullPhotos, totalImages}: AlbumHeaderFilterProps) => {
  return (
    <TouchableOpacity
                style={styles.itemContentContainer}
                onPress={() => {
                    handleCloseAlbumFilter();
                    setSelectedAlbum(null);
                }}
            >
                <Image source={{ uri: fullPhotos.at(0)?.node.image.uri }} style={styles.albumFirstImage} />
                <View>
                    <Text style={styles.albumTitlteTxt}>Tất cả ảnh</Text>
                    <Text style={styles.assetCountTxt}>{totalImages}</Text>
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

export default AlbumHeaderFilter