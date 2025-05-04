import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { scale, width } from '@utils'; // Scale tùy device
import { Colors } from '@constant'; // Bảng màu của bạn
import ScrollPercentage from './components/ScrollPercentageV2/ScrollPercentageV2';
import { GalleryBottomSheet, Text as TextEst } from '@kietpt2003/react-native-core-ui';

const TermsAndConditionsScreen = () => {
  const galleryBottomSheetRef = React.useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [assetType, setAssetType] = useState('Photos');

  const handleShowBottomSheet = () => {
    if (galleryBottomSheetRef.current) {
      galleryBottomSheetRef.current.handleBottomSheetGallery();
    }
  };

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const currentOffset = contentOffset.y;
    const totalScrollableHeight = contentSize.height - layoutMeasurement.height;

    if (totalScrollableHeight > 0) {
      const percent = (currentOffset / totalScrollableHeight) * 100;
      setScrollPercent(percent);
    } else {
      setScrollPercent(0);
    }
  };

  const changeAssetType = (type) => {
    setAssetType(type);
  };

  const [assets, setAssets] = useState(0);
  const onSelectedAssetsChange = (a) => {
    setAssets(a);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: scale(100) }}
        onScroll={handleScroll}
        scrollEventThrottle={16} // 16ms để bắt scroll mượt mà (60fps)
      >
        <Text style={styles.title}>Terms and Conditions</Text>

        <Text style={styles.content}>
          {/* Nội dung Term dài */}
          Welcome to our app. Please read the Terms and Conditions carefully.
          By accessing or using this service, you agree to be bound by these Terms.
          If you disagree with any part of the terms then you may not access the service.
          {'\n\n'}
          Use of the Service:
          You must follow any policies made available to you within the Service.
          Don't misuse our Services. For example, don't interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.
          {'\n\n'}
          Intellectual Property:
          The Service and its original content, features and functionality are and will remain the exclusive property of the Company.
          {'\n\n'}
          Limitation of Liability:
          In no event shall the Company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages...
          {'\n\n'}
          Modification of Terms:
          We may modify these Terms at any time. We will provide notice of changes through the Service.
          {'\n\n'}
          Thank you for using our service!
          Welcome to our app. Please read the Terms and Conditions carefully.
          By accessing or using this service, you agree to be bound by these Terms.
          If you disagree with any part of the terms then you may not access the service.
          {'\n\n'}
          Use of the Service:
          You must follow any policies made available to you within the Service.
          Don't misuse our Services. For example, don't interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.
          {'\n\n'}
          Intellectual Property:
          The Service and its original content, features and functionality are and will remain the exclusive property of the Company.
          {'\n\n'}
          Limitation of Liability:
          In no event shall the Company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages...
          {'\n\n'}
          Modification of Terms:
          We may modify these Terms at any time. We will provide notice of changes through the Service.
          {'\n\n'}
          Thank you for using our service!
          Welcome to our app. Please read the Terms and Conditions carefully.
          By accessing or using this service, you agree to be bound by these Terms.
          If you disagree with any part of the terms then you may not access the service.
          {'\n\n'}
          Use of the Service:
          You must follow any policies made available to you within the Service.
          Don't misuse our Services. For example, don't interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.
          {'\n\n'}
          Intellectual Property:
          The Service and its original content, features and functionality are and will remain the exclusive property of the Company.
          {'\n\n'}
          Limitation of Liability:
          In no event shall the Company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages...
          {'\n\n'}
          Modification of Terms:
          We may modify these Terms at any time. We will provide notice of changes through the Service.
          {'\n\n'}
          Thank you for using our service!
        </Text>
        <TextEst color={'red'}>Hello World {assets.length}</TextEst>
      </ScrollView>

      {/* <ScrollPercentage
    percent={scrollPercent}
    hide={scrollPercent === 0}
    size={scale(50)}
    /> */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 50, left: 20 }}
        onPress={() => changeAssetType(assetType === 'Photos' ? 'All' : 'Photos')}>
        <Text style={{ color: Colors.white }}>{assetType}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: 'absolute', top: 50, right: 20 }}
        onPress={() => handleShowBottomSheet()}>
        <Text style={{ color: Colors.white }}>Click</Text>
      </TouchableOpacity>
      <GalleryBottomSheet
        ref={galleryBottomSheetRef}
        openHeight={width - width / 3.5}
        videoIconStyle={{
          circleStyle: {
            fill: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        assetType={assetType}
        onSelectedAssetsChange={onSelectedAssetsChange}
      />
      <ScrollPercentage
        percent={scrollPercent}
        hide={false}
        borderRadius={scale(20)}
        size={scale(80)}
      />
    </SafeAreaView>
  );
};

export default TermsAndConditionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  scrollView: {
    padding: scale(20),
  },
  title: {
    fontSize: scale(22),
    fontWeight: 'bold',
    marginBottom: scale(20),
    color: Colors.white,
  },
  content: {
    fontSize: scale(14),
    color: Colors.graySystem3,
    lineHeight: scale(22),
  },
});
