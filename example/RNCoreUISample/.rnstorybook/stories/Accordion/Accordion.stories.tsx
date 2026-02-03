import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { Accordion, Button, SvgIcon, Text } from '@kietpt2003/react-native-core-ui';
import { colors, fontSize } from '@kietpt2003/react-native-core-ui/themes';
import { fn } from 'storybook/internal/test';
import { scale, WEB, width } from '@kietpt2003/react-native-core-ui/utils';

import { booleanOptional } from '../../../src/types/types';
import { showAlert } from '../../../src/utils';

const SPACING = 10;
const ICON_SIZE = WEB ? scale(8) : scale(10);
const ITEM_WIDTH = WEB ? width / 2 : width / 1.5;

const styles = StyleSheet.create({
  contentView: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  contentHeader: {
    flex: 1,
    fontSize: WEB ? fontSize._12 : fontSize._14
  },
  content: {
    fontSize: WEB ? fontSize._12 : fontSize._14
  },
  container: {
    flex: 1,
    width: ITEM_WIDTH,
    marginHorizontal: SPACING
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING / 2,
    paddingHorizontal: SPACING,
    borderWidth: 1,
    borderRadius: 10
  },
  disabledContainer: {
    opacity: 0.5,
  },
  titleAccordion: {
    width: ITEM_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING / 2,
    paddingHorizontal: SPACING,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 2,
  },
  formRowBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 2,
  },
  rowItem: {
    flex: 0.5,
    fontSize: WEB ? fontSize._12 : fontSize._14,
  },
  rowItem2: {
    flex: 1,
    fontSize: WEB ? fontSize._12 : fontSize._14,
  },
  textInput: {
    paddingVertical: SPACING / 2,
    paddingHorizontal: SPACING,
    borderWidth: 1,
    borderRadius: 10,
    color: colors.gray_4F4F4F,
    borderColor: colors.white,
    fontSize: fontSize._10,
  },
  sendBtn: {
    width: 80,
    height: 30,
    paddingVertical: SPACING / 2,
    paddingHorizontal: SPACING,
  },
  btnTitle: {
    fontSize: WEB ? fontSize._12 : fontSize._14
  },
  bgPrimary: {
    backgroundColor: colors.blue_2B65B2
  },
  bgPrimary1: {
    backgroundColor: colors.blue_3677BC
  },
  bgPrimary2: {
    backgroundColor: colors.blue_1890FF
  },
  bgPrimary3: {
    backgroundColor: colors.blue_29ABE2
  },
  bgPrimary4: {
    backgroundColor: colors.blue_86D3EE
  },
  disableBg: {
    backgroundColor: colors.gray_727272
  },
  customContainer: {
    width: ITEM_WIDTH,
    borderRadius: 10,
    overflow: 'hidden'
  }
});

const renderSampleHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.contentHeader}>Disruptive Solutions</Text>
    </View>
  )
}

const renderSampleWithIconHeader = (title?: string) => {
  return (
    <View style={styles.header}>
      <Text style={styles.contentHeader}>{title ? title : 'Disruptive Solutions'}</Text>
      <SvgIcon name={'angle-left'} size={ICON_SIZE} />
    </View>
  )
}

const renderSampleChildren = () => {
  return (
    <View style={styles.contentView}>
      <Text style={styles.content}>Estuary is a <Text bold color={colors.primary}>SalesTech</Text> company from Vietnam specializing in Sales-Enabling platforms.</Text>
    </View>
  )
}

const renderSampleChildren2 = (style?: StyleProp<ViewStyle>, color?: string) => {
  return (
    <View style={[styles.contentView, style]}>
      <Text color={color} style={styles.content}>Production line management & supply chain traceability on digital platform.</Text>
    </View>
  )
}

const renderSampleChildren3 = () => {
  return (
    <View style={styles.contentView}>
      <Text style={styles.content}>Transform warehouse into a high performance & high efficiency centre.</Text>
    </View>
  )
}

const renderSampleChildren4 = () => {
  return (
    <View style={styles.contentView}>
      <Text style={styles.content}>Online learning & e-Certificate on various digital platforms.</Text>
    </View>
  )
}

const meta = {
  title: 'Data Display/Accordion',
  component: Accordion,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    header: {
      name: 'header',
      description: "The header of the component.",
      table: {
        category: 'React Node',
        defaultValue: {
          summary: 'undefined'
        },
        type: {
          summary: 'Type',
          detail: 'ReactNode\nundefined',
        },
      },
      control: { type: 'select' },
      options: ['Default', 'Text', 'Sample', 'Others'],
      mapping: {
        Default: undefined,
        Text: <Text>Disruptive Solutions</Text>,
        Sample: renderSampleHeader(),
        Others: renderSampleWithIconHeader(),
      },
    },
    children: {
      name: 'children',
      description: "The children of the component.",
      table: {
        category: 'React Node',
        defaultValue: {
          summary: 'undefined'
        },
        type: {
          summary: 'Type',
          detail: 'ReactNode\nundefined',
        },
      },
      control: { type: 'select' },
      options: ['Default', 'Sample 1', 'Sample 2', 'Sample 3'],
      mapping: {
        Default: undefined,
        'Sample 1': renderSampleChildren(),
        'Sample 2': renderSampleChildren2(),
        'Sample 3': renderSampleChildren3(),
      },
    },
    expanded: {
      name: 'expanded',
      description: "If true, it will show the hidden children component. Note: If you define expaned property, you should control open/close logical by yourself.",
      type: booleanOptional,
      table: {
        category: 'Customization',
        defaultValue: {
          summary: 'undefined'
        },
      },
    },
    defaultExpanded: {
      name: 'defaultExpanded',
      description: "If true, it will set the init state of the expanded to true.",
      type: booleanOptional,
      table: {
        category: 'Customization',
        defaultValue: {
          summary: 'false'
        },
      },
    },
    onChange: {
      name: 'onChange',
      description: 'Called when the expanded change.',
      table: {
        category: 'Actions',
        defaultValue: {
          summary: 'undefined'
        },
        type: {
          summary: 'Type',
          detail: '(expanded: boolean) => void\nundefined',
        },
      },
      control: { type: 'select' },
      options: ['Undefined', 'Function'],
      mapping: {
        Undefined: undefined,
        'Function': fn((expanded) => {
          if (WEB) {
            return showAlert(expanded ? 'Accordion Open' : 'Accordion Close', 'This is custom message')
          }
          console.log(expanded ? 'Accordion Open' : 'Accordion Close');
        }),
      },
    },
    style: {
      name: 'style',
      description: 'For apply styles for Accordion component. Note: This style not apply for header, but all the component',
      table: {
        category: 'Styles',
        defaultValue: {
          summary: '{}'
        },
        type: {
          summary: 'Type',
          detail: 'StyleProp<ViewStyle>\nundefined',
        },
      },
      control: {
        type: 'object'
      }
    },
    disabled: {
      name: 'disabled',
      description: "If true, you cannot press the header. Note: If children already seen before the disabled set to true, you still can press the children",
      type: booleanOptional,
      table: {
        category: 'Customization',
        defaultValue: {
          summary: 'undefined'
        },
      },
    },
  }
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: 'Basic Outlined Card',
  args: {
    header: renderSampleHeader(),
    children: renderSampleChildren(),
    style: styles.container,
  },
  render: (args) => {
    return (
      <Accordion
        {...args}
      >
        {args.children}
      </Accordion>
    )
  }
}

export const ExpandIcon: Story = {
  name: 'Expand Icon',
  args: {
    header: <></>,
    children: <></>,
    style: styles.container,
  },
  render: (args) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
      <Accordion
        {...args}
        header={
          <View style={styles.header}>
            <Text style={styles.contentHeader}>Smart Warehouse Management System (SWMS)</Text>
            <SvgIcon name={expanded ? 'chevron-down' : 'angle-left'} size={ICON_SIZE} />
          </View>
        }
        onChange={(ex) => {
          setExpanded(ex);
        }}
      >
        <View style={styles.contentView}>
          <Text style={styles.content}>Transform warehouse into a high performance & high efficiency centre.</Text>
        </View>
      </Accordion>
    )
  }
};

export const DisableItem: Story = {
  name: 'Disable Item',
  args: {
    header: renderSampleWithIconHeader('E-Learning Platform'),
    children: renderSampleChildren4(),
    style: styles.container,
    disabled: true
  },
  render: (args) => (
    <Accordion {...args} header={
      <View style={[styles.header, args.disabled && styles.disabledContainer]}>
        <Text style={styles.contentHeader}>E-Learning Platform</Text>
        <SvgIcon name={'angle-left'} size={ICON_SIZE} />
      </View>
    }>
      {args.children}
    </Accordion>
  )
};

export const Customization: Story = {
  name: 'Customization',
  args: {
    header: <></>,
    children: <></>,
    style: styles.container,
  },
  render: (args) => {
    const [showHeader, setShowHeader] = React.useState(false);
    const [showTitle, setShowTitle] = React.useState(false);
    const [showTitle2, setShowTitle2] = React.useState(false);

    const [showTitle3, setShowTitle3] = React.useState(false);
    const [showTitle4, setShowTitle4] = React.useState(false);

    const [showTitle5, setShowTitle5] = React.useState(false);

    return (
      <Accordion
        {...args}
        expanded={showHeader}
        onChange={() => setShowHeader(!showHeader)}
        header={
          <View style={[styles.titleAccordion, styles.bgPrimary]}>
            <Text color={colors.white} style={styles.contentHeader}>Our Solutions</Text>
            <SvgIcon color={colors.white} name={showHeader ? 'chevron-down' : 'angle-left'} size={ICON_SIZE} />
          </View>
        }
        style={styles.customContainer}
      >
        <Accordion
          expanded={showTitle}
          onChange={() => setShowTitle(!showTitle)}
          header={
            <View style={[styles.titleAccordion, styles.bgPrimary1]}>
              <Text color={colors.white} style={styles.contentHeader}>Smart Manufacturing Platform(Nexus)</Text>
              <SvgIcon color={colors.white} name={showTitle ? 'chevron-down' : 'angle-left'} size={ICON_SIZE} />
            </View>
          }
        >
          <View style={[styles.formRow, styles.bgPrimary2]}>
            <Text color={colors.white} style={styles.rowItem2}>Production line management & supply chain traceability on digital platform.</Text>
          </View>
        </Accordion>

        <Accordion
          expanded={showTitle2}
          onChange={() => setShowTitle2(!showTitle2)}
          header={
            <View style={[styles.titleAccordion, styles.bgPrimary1]}>
              <Text color={colors.white} style={styles.contentHeader}>Smart Warehouse Management System(SWMS)</Text>
              <SvgIcon color={colors.white} name={showTitle2 ? 'chevron-down' : 'angle-left'} size={ICON_SIZE} />
            </View>
          }
        >
          <Accordion
            expanded={showTitle3}
            onChange={() => setShowTitle3(!showTitle3)}
            header={
              <View style={[styles.titleAccordion, styles.bgPrimary2]}>
                <Text color={colors.white} style={styles.contentHeader}>Request Demo</Text>
                <SvgIcon color={colors.white} name={showTitle3 ? 'chevron-down' : 'angle-left'} size={ICON_SIZE} />
              </View>
            }
          >
            <Accordion
              expanded={showTitle4}
              onChange={() => setShowTitle4(!showTitle4)}
              header={
                <View style={[styles.titleAccordion, styles.bgPrimary3]}>
                  <Text color={colors.white} style={styles.contentHeader}>Contact Info</Text>
                  <SvgIcon color={colors.white} name={showTitle4 ? 'chevron-down' : 'angle-left'} size={ICON_SIZE} />
                </View>
              }
              style={styles.bgPrimary4}
            >
              <View style={styles.formRow}>
                <Text color={colors.white} style={styles.rowItem}>Fullname:</Text>
                <TextInput style={[styles.rowItem, styles.textInput]} placeholder='Your Fullname' />
              </View>
              <View style={styles.formRow}>
                <Text color={colors.white} style={styles.rowItem}>Email:</Text>
                <TextInput style={[styles.rowItem, styles.textInput]} placeholder='Your Email' />
              </View>
              <View style={styles.formRow}>
                <Text color={colors.white} style={styles.rowItem}>Phone:</Text>
                <TextInput style={[styles.rowItem, styles.textInput]} placeholder='Your Phone Number' />
              </View>
              <View style={styles.formRowBtn}>
                <Button
                  onPress={fn(() => showAlert('Request Demo Success!', 'This is custom message'))}
                  variant='outline'
                  title='Send'
                  style={styles.sendBtn}
                  titleStyle={styles.btnTitle}
                />
              </View>
            </Accordion>
          </Accordion>
          <Accordion
            disabled={true}
            expanded={showTitle5}
            onChange={() => setShowTitle5(!showTitle5)}
            header={
              <View style={[styles.titleAccordion, styles.disableBg, styles.disabledContainer]}>
                <Text color={colors.white} style={styles.contentHeader}>Detailed Features</Text>
                <SvgIcon color={colors.white} name={showTitle5 ? 'chevron-down' : 'angle-left'} size={ICON_SIZE} />
              </View>
            }
          >
            <View style={[styles.formRow, styles.bgPrimary3]}>
              <Text color={colors.white} style={styles.rowItem}>Maintainment</Text>
            </View>
          </Accordion>
        </Accordion>
      </Accordion>
    )
  }
};
