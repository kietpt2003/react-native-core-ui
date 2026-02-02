import type { Meta, StoryObj } from '@storybook/react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, SvgIcon, Text } from '@estuary/rn-core-ui';
import { colors, fontSize } from '@estuary/rn-core-ui/themes';
import { PaperElevation } from '@estuary/rn-core-ui/Cards/Paper';
import { fn } from 'storybook/internal/test';

import { booleanOptional, numberOptional, stringOptional } from '../../../src/types/types';
import { showAlert } from '../../../src/utils';
import { scale } from '@estuary/rn-core-ui/utils';

const elevations: PaperElevation[] = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24]

const meta = {
  title: 'Surfaces/Card',
  component: Card,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    raised: {
      name: 'raised',
      description: "If true, the card will use raised styling. This prop will make effect with variant === 'elevation'",
      type: booleanOptional,
      table: {
        category: 'Customization',
        defaultValue: {
          summary: 'false'
        },
      },
    },
    elevation: {
      name: 'elevation',
      description: "Use the elevation prop to establish hierarchy through the use of shadows. The Card component's default elevation level is 1. The prop accepts values from 0 to 24. The higher the number, the further away the Card appears to be from its background.",
      type: numberOptional,
      table: {
        category: 'Customization',
        defaultValue: {
          summary: '1'
        },
      },
      control: { type: 'select' },
      options: elevations,
    },
    square: {
      name: 'square',
      description: "The Card component features rounded corners by default. Add the square prop for square corners",
      type: booleanOptional,
      table: {
        category: 'Customization',
        defaultValue: {
          summary: 'false'
        },
      },
    },
    variant: {
      name: 'variant',
      description: 'Set the variant prop to "outlined" for a flat, outlined Card with no shadows',
      type: stringOptional,
      table: {
        category: 'Customization',
        defaultValue: {
          summary: 'elevation'
        },
      },
      control: { type: 'select' },
      options: ['elevation', 'outlined'],
    },
    style: {
      name: 'style',
      description: 'For apply styles for card component',
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
    children: {
      name: 'children',
      description: 'For apply children component',
      table: {
        category: 'React Node',
        defaultValue: {
          summary: ''
        },
        type: {
          summary: 'Type',
          detail: 'ReactNode\nundefined',
        },
      },
      control: { type: 'select' },
      options: ['Default', 'Text', 'PlayCircle'],
      mapping: {
        Default: undefined,
        Text: <Text numberOfLines={2} color={colors.black} style={{
          textAlign: 'center',
          fontSize: fontSize._14
        }}>Estuary</Text>,
        PlayCircle: <SvgIcon name='play-circle' />,
      },
    },
  }
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 8
  },
  content: {
    fontSize: fontSize._14
  },
  btnContainer: {
    flexDirection:'row',
    justifyContent:'space-around'
  }
});

export const Basic: Story = {
  name: 'Basic Outlined Card',
  args: {
    raised: true,
    variant:'elevation',
    square: true
  },
  render: (args) => (
    <Card
      {...args}
    >
      <CardContent>
        <Text bold>Disruptive Solutions</Text>

        <Text style={styles.content}>Estuary is a <Text bold color={colors.primary}>SalesTech</Text> company from Vietnam specializing in Sales-Enabling platforms.</Text>

        <Text style={styles.content}>Estuary helps multinational companies and leading local enterprises in Asia Pacific significantly enhance engagements with stakeholders across their distribution channels, acquire extra insights in real-time, and ultimately boost sales performance, as far-reaching as sell-out.</Text>
      </CardContent>
      <CardActions>
        <TouchableOpacity style={styles.button} onPress={fn(() => showAlert('Learn More Press!', 'This is custom message'))}>
          <Text color={colors.white} style={styles.content}>Learn More</Text>
        </TouchableOpacity>
      </CardActions>
    </Card>
  )
}

export const Complex: Story = {
  name: 'Complex Interaction',
  args: {
    raised: true,
  },
  render: (args) => (
    <Card
      {...args}
    >
      <CardHeader
        avatar={
          <Avatar 
            alt='Estuary Solutions' 
            source={require('../../../assets/sample-avatar.jpg')} 
            iconColor={colors.white}
            isFirstAlt={false}
          />
        }
        action={
          <TouchableOpacity onPress={fn(() => showAlert('Check box Press!', 'This is custom message'))}>
            <SvgIcon name={'check-box'} size={scale(15)} color={colors.primary} />
          </TouchableOpacity>
        }
        title="Estuary Solutions"
        subheader="07 June 2024"
      />
      <CardMedia
        source={{
          uri: 'https://api.estuary.solutions/estuary-web-mediafile/file/02769849-d37f-4fde-b545-a076c2b35323?auto=format&fit=max&w=1080'
        }}
        style={{
          aspectRatio: 16/9
        }}
      />
      <CardContent>
        <Text style={styles.content}>In the era of booming digital technology, the application of software solutions in business operations is indispensable. Understanding this need, the SaleX application was born with the goal of simplifying all sales tasks, helping your sales team work more efficiently and productively.</Text>
      </CardContent>
      <CardActions disableSpacing={true}>
        <TouchableOpacity onPress={fn(() => showAlert('Left Press!', 'This is custom message'))}>
          <SvgIcon name='angle-left' color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={fn(() => showAlert('Left Press!', 'This is custom message'))}>
          <SvgIcon name='angle-right' color={colors.primary} />
        </TouchableOpacity>
      </CardActions>
    </Card>
  )
};

export const Media: Story = {
  name: 'Media',
  args: {
    raised: true
  },
  render: (args) => (
    <Card
      {...args}
    >
      <CardMedia
        source={{
          uri: 'https://picsum.photos/id/445/1200/800'
        }}
        style={{
          aspectRatio: 16/9
        }}
      />
      <CardContent>
        <Text bold color={colors.primary}>E-Learning Platform</Text>

        <Text style={styles.content}>The online learning management platform allows the deployment, management and operation of training courses & data storage for e-learning programs.</Text>
      </CardContent>
      <CardActions>
        <TouchableOpacity style={styles.button} onPress={fn(() => showAlert('Share Press!', 'This is custom message'))}>
          <Text color={colors.white} style={styles.content}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fn(() => showAlert('Learn More Press!', 'This is custom message'))}>
          <Text color={colors.white} style={styles.content}>Learn More</Text>
        </TouchableOpacity>
      </CardActions>
    </Card>
  )
};

export const Actions: Story = {
  name: 'Primary Action',
  args: {
    raised: true
  },
  render: (args) => (
    <Card
      {...args}
    >
      <CardActionArea onPress={fn(() => showAlert('Card Press!', 'This is custom message'))}>
        <CardMedia
          source={{
            uri: 'https://picsum.photos/id/445/1200/800'
          }}
          style={{
            aspectRatio: 16 / 9
          }}
        />
        <CardContent>
          <Text bold color={colors.primary}>E-Learning Platform</Text>

          <Text style={styles.content}>The online learning management platform allows the deployment, management and operation of training courses & data storage for e-learning programs.</Text>
        </CardContent>
      </CardActionArea>
    </Card>
  )
};

export const SubAction: Story = {
  name: 'Suplemental Action',
  args: {
    raised: true
  },
  render: (args) => (
    <Card
      {...args}
    >
      <CardActionArea onPress={fn(() => showAlert('Card Press!', 'This is custom message'))}>
        <CardMedia
          source={{
            uri: 'https://picsum.photos/id/348/1200/800'
          }}
          style={{
            aspectRatio: 16 / 9
          }}
        />
        <CardContent>
          <Text bold color={colors.primary}>Salesforce Automation & CRM (SaleX)</Text>

          <Text style={styles.content}>A software solution that helps maximize sales performance by empowering sales teams with digital tools (e.g. e-detailing, automatic sales route allocation, etc.) to discover, recruit, service, and manage customers on top of the traditional approaches.</Text>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <TouchableOpacity style={styles.button} onPress={fn(() => showAlert('Share Press!', 'This is custom message'))}>
          <Text color={colors.white} style={styles.content}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fn(() => showAlert('Learn More Press!', 'This is custom message'))}>
          <Text color={colors.white} style={styles.content}>Learn More</Text>
        </TouchableOpacity>
      </CardActions>
    </Card>
  )
};

export const Controls: Story = {
  name: 'UI Controls',
  args: {
    raised: true,
    style: {
      flexDirection:'row'
    }
  },
  render: (args) => (
    <Card
      {...args}
    >
      <View>
        <CardContent>
          <Text bold color={colors.primary}>Live From Space</Text>

          <Text style={styles.content}>Mac Miller</Text>
        </CardContent>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={fn(() => showAlert('Left Press!', 'This is custom message'))}>
            <SvgIcon name='angle-left' color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={fn(() => showAlert('Play Press!', 'This is custom message'))}>
            <SvgIcon name='play-circle' color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={fn(() => showAlert('Right Press!', 'This is custom message'))}>
            <SvgIcon name='angle-right' color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <CardMedia
        source={{
          uri: 'https://picsum.photos/id/326/800/800'
        }}
        style={{
          width: 151,
          aspectRatio: 1
        }}
      />
    </Card>
  )
};
