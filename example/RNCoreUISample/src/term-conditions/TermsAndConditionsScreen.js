import React from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GalleryBottomSheet, Text as TextEst, SvgIcon, ScrollPercentage } from '@kietpt2003/react-native-core-ui';
import  { colors } from '@kietpt2003/react-native-core-ui/themes'
import {
  convertSeconds,
  fixedDistance,
  formatHour,
  formatMoney,
  scale,
  width
} from '@kietpt2003/react-native-core-ui/utils';

const TermsAndConditionsScreen = () => {
  const [scrollPercent, setScrollPercent] = React.useState(0);
  const [assetType, setAssetType] = React.useState('All');
  const [isOpen, setIsOpen] = React.useState(false);

  const handleShowBottomSheet = () => {
    setIsOpen(!isOpen);
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

  const [assets, setAssets] = React.useState(0);
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
        <Text style={styles.content}>Convert seconds: {convertSeconds(3599)}</Text>
        <Text style={styles.content}>Format hour: {formatHour(86399)}</Text>
        <Text style={styles.content}>Fixed distance: {fixedDistance(123.4567, 3)}</Text>
        <Text style={styles.content}>Format money: {formatMoney(1234567.89, 2, 'vi-VN')}</Text>

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
        <TextEst color={colors.red_E00102}>Selected assets: {assets.length}</TextEst>
      </ScrollView>

      <View
        style={[styles.actionButton, { left: 20, top: 120 }]}
      >
        <SvgIcon
          name='alert-circle'
        />
      </View>
      <TouchableOpacity
        style={[styles.actionButton, assetType == "All" ? styles.selected : null, { left: 20 }]}
        onPress={() => changeAssetType('All')}>
        <Text style={styles.buttonContent}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, assetType === "Photos" ? styles.selected : null, { left: 80 }]}
        onPress={() => changeAssetType('Photos')}>
        <Text style={styles.buttonContent}>Photos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, assetType === "Videos" ? styles.selected : null, { left: 140 }]}
        onPress={() => changeAssetType('Videos')}>
        <Text style={styles.buttonContent}>Videos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, isOpen ? styles.selected : null]}
        onPress={() => handleShowBottomSheet()}>
        <Text style={styles.buttonContent}>{isOpen ? "Close" : "Open"}</Text>
      </TouchableOpacity>
      <GalleryBottomSheet
        isOpen={isOpen}
        openHeight={width - width / 3.5}
        videoIconStyle={{
          circleStyle: {
            fill: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        assetType={assetType}
        onSelectedAssetsChange={onSelectedAssetsChange}
        headerTitle='All assets'
      />
      <ScrollPercentage
        percent={scrollPercent}
        hide={false}
        borderRadius={scale(20)}
        size={scale(80)}
        fill={[colors.red_E00102, colors.gray_888888, colors.green_00A720]}
        gradientDirection='vertical'
        // fill={colors.red_E00102}
        figure='circle'
      />
    </SafeAreaView >
  );
};

export default TermsAndConditionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  scrollView: {
    padding: scale(20),
  },
  selected: {
    backgroundColor: colors.green_00A720,
  },
  actionButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10)
  },
  buttonContent: {
    color: colors.black,
  },
  title: {
    fontSize: scale(22),
    fontWeight: 'bold',
    marginBottom: scale(20),
    color: colors.white,
  },
  content: {
    fontSize: scale(14),
    color: colors.gray_727272,
    lineHeight: scale(22),
  },
});
