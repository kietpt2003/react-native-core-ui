import type { Meta, StoryObj } from '@storybook/react';
import { TouchableOpacity, View } from 'react-native';
import {
  DraggableFlatList,
  OpacityDecorator,
  RenderItemParams,
  ScaleDecorator,
  ShadowDecorator,
  Text,
} from '@kietpt2003/react-native-core-ui';
import React from 'react';
import { WEB } from '@kietpt2003/react-native-core-ui/utils';
import { colors } from '@kietpt2003/react-native-core-ui/themes';

import {
  CODE_SAMPLE_CUSTOM_DECOR,
  CODE_SAMPLE_DRAGGABLE_BASIC,
  CODE_SAMPLE_DRAGGABLE_CALLBACK,
  CODE_SAMPLE_DRAGGABLE_HORIZONTAL,
  CODE_SAMPLE_DRAGGABLE_PLACEHOLDER,
  SAMPLE_DRAGGABLE_BASIC,
  SAMPLE_DRAGGABLE_PLACEHOLDER,
} from '../../../src/components/DraggableFlatList/Samples/Datas';

interface Item {
  id: string;
  text: string;
  color?: string;
}

const meta = {
  title: 'Lists/DraggableFlatList',
  component: DraggableFlatList,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A draggable FlatList component that supports drag-and-drop reordering with smooth animations and decorators.',
      },
    },
  },
  argTypes: {
    data: {
      name: 'data',
      description:
        'Array of data items to render in the list. Each item should have a unique identifier.',
      table: {
        category: 'Data',
        type: {
          summary: 'T[]',
        },
      },
      control: false,
    },
    renderItem: {
      name: 'renderItem',
      description:
        'Function to render each item in the list. Receives RenderItemParams with item data, drag function, and active state.',
      table: {
        category: 'Render',
        type: {
          summary: '(params: RenderItemParams<T>) => ReactNode',
        },
      },
      control: false,
    },
    keyExtractor: {
      name: 'keyExtractor',
      description:
        'Function to extract a unique key for each item. Used by React for efficient re-rendering.',
      table: {
        category: 'Data',
        type: {
          summary: '(item: T, index: number) => string',
        },
      },
      control: false,
    },
    onDragEnd: {
      name: 'onDragEnd',
      description:
        'Callback fired when a drag operation completes. Provides reordered data array and from/to indices.',
      table: {
        category: 'Events',
        type: {
          summary: '(params: DragEndParams<T>) => void',
        },
      },
      control: false,
    },
    activationDistance: {
      name: 'activationDistance',
      description:
        'Minimum distance in pixels to activate drag. Prevents accidental drags on touch devices. (Mobile Application only)',
      table: {
        category: 'Drag Configuration',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '0',
        },
      },
      control: false,
    },
    animationConfig: {
      name: 'animationConfig',
      description:
        'Customizes the spring animation used for drag operations. (Mobile Application only)',
      table: {
        category: 'Animation',
        type: {
          summary: 'Partial<WithSpringConfig>',
        },
        defaultValue: {
          summary:
            '{ damping: 20, mass: 0.2, stiffness: 100, overshootClamping: false, restSpeedThreshold: 0.2, restDisplacementThreshold: 0.2 }',
        },
      },
      control: false,
    },
    autoscrollSpeed: {
      name: 'autoscrollSpeed',
      description:
        'Speed multiplier for autoscroll when dragging near edges. (Mobile Application only)',
      table: {
        category: 'Autoscroll',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '100',
        },
      },
      control: false,
    },
    autoscrollThreshold: {
      name: 'autoscrollThreshold',
      description:
        'Distance from edges that triggers autoscroll when dragging. (Mobile Application only)',
      table: {
        category: 'Autoscroll',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '30',
        },
      },
      control: { type: 'number', min: 10, max: 100 },
    },
    containerStyle: {
      name: 'containerStyle',
      description: 'Style applied to the container wrapping the FlatList.',
      table: {
        category: 'Style',
        type: {
          summary: 'StyleProp<ViewStyle>',
        },
      },
      control: false,
    },
    debug: {
      name: 'debug',
      description:
        'Enables debug mode with additional logging and visual indicators.',
      table: {
        category: 'Debug',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
      control: false,
    },
    dragItemOverflow: {
      name: 'dragItemOverflow',
      description:
        'Whether dragged items can overflow outside the container bounds. (Mobile Application only)',
      table: {
        category: 'Drag Configuration',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
      control: false,
    },
    onDragBegin: {
      name: 'onDragBegin',
      description: 'Callback fired when a drag operation starts.',
      table: {
        category: 'Events',
        type: {
          summary: '(index: number) => void',
        },
      },
      control: false,
    },
    onPlaceholderIndexChange: {
      name: 'onPlaceholderIndexChange',
      description:
        'Callback fired when the placeholder (drop target) position changes.',
      table: {
        category: 'Events',
        type: {
          summary: '(placeholderIndex: number) => void',
        },
      },
      control: false,
    },
    onRelease: {
      name: 'onRelease',
      description: 'Callback fired when the user releases the dragged item.',
      table: {
        category: 'Events',
        type: {
          summary: '(index: number) => void',
        },
      },
      control: false,
    },
    onScrollOffsetChange: {
      name: 'onScrollOffsetChange',
      description: 'Callback fired when the list scroll offset changes.',
      table: {
        category: 'Events',
        type: {
          summary: '(scrollOffset: number) => void',
        },
      },
      control: false,
    },
    renderPlaceholder: {
      name: 'renderPlaceholder',
      description:
        'Custom function to render the placeholder (drop target) during drag. (Mobile Application only)',
      table: {
        category: 'Render',
        type: {
          summary: 'RenderPlaceholder<T>',
        },
      },
      control: false,
    },
    simultaneousHandlers: {
      name: 'simultaneousHandlers',
      description:
        'Refs to other gesture handlers that should work simultaneously. (Mobile Application only)',
      table: {
        category: 'Advanced',
        type: {
          summary: 'React.Ref<any> | React.Ref<any>[]',
        },
      },
      control: false,
    },
    outerScrollOffset: {
      name: 'outerScrollOffset',
      description:
        'Shared value for coordinating scroll with external scrollable containers. (Mobile Application only)',
      table: {
        category: 'Advanced',
        type: {
          summary: 'Animated.SharedValue<number>',
        },
      },
      control: false,
    },
  },
} satisfies Meta<typeof DraggableFlatList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: 'Basic Draggable List',
  args: {
    data: SAMPLE_DRAGGABLE_BASIC,
    keyExtractor: (_item, index) => index.toString(),
    renderItem: () => {
      return <></>;
    },
    columnWrapperStyle: {},
  },
  parameters: {
    docs: {
      source: {
        code: CODE_SAMPLE_DRAGGABLE_BASIC,
      },
    },
  },
  render: () => {
    const [data, setData] = React.useState(SAMPLE_DRAGGABLE_BASIC);

    const renderMobileItem = React.useCallback(
      ({ item, drag, isActive }: RenderItemParams<Item>) => {
        return (
          <ShadowDecorator>
            <ScaleDecorator>
              <OpacityDecorator>
                <TouchableOpacity
                  activeOpacity={1}
                  onLongPress={drag}
                  disabled={isActive}
                  style={{
                    padding: 20,
                    margin: 5,
                    backgroundColor:
                      item.color || (isActive ? '#e0e0e0' : '#f0f0f0'),
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#ccc',
                  }}>
                  <Text style={{ fontWeight: 'bold', color: '#333' }}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              </OpacityDecorator>
            </ScaleDecorator>
          </ShadowDecorator>
        );
      },
      [],
    );

    const renderWebItem = ({ item, isActive }: RenderItemParams<Item>) => (
      <ShadowDecorator>
        <View
          style={{
            padding: 20,
            margin: 5,
            backgroundColor: item.color || (isActive ? '#e0e0e0' : '#f0f0f0'),
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            cursor: 'pointer',
          }}>
          <Text style={{ fontWeight: 'bold', color: '#333' }}>{item.text}</Text>
        </View>
      </ShadowDecorator>
    );

    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Basic Draggable List
        </Text>
        <Text style={{ marginBottom: 15, color: '#666' }}>
          {WEB ? 'Click and drag' : 'Long press and drag'} to reorder items
        </Text>
        <DraggableFlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={WEB ? renderWebItem : renderMobileItem}
          onDragEnd={({ data: newData }) => {
            setData(newData);
          }}
        />
      </View>
    );
  },
};

export const Horizontal: Story = {
  name: 'Horizontal Draggable List',
  args: {
    data: SAMPLE_DRAGGABLE_BASIC,
    //@ts-ignore
    keyExtractor: (item: Item) => item.id,
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    renderItem: ({ item, isActive }) => (
      <ShadowDecorator>
        <View
          style={{
            padding: 15,
            margin: 5,
            //@ts-ignore
            backgroundColor: item.color || (isActive ? '#e0e0e0' : '#f0f0f0'),
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            width: 120,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
            {/* @ts-ignore */}
            {item.text}
          </Text>
        </View>
      </ShadowDecorator>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal scrolling draggable list. Items can be reordered horizontally.',
      },
      source: {
        code: CODE_SAMPLE_DRAGGABLE_HORIZONTAL,
      },
    },
  },
  render: () => {
    const [data, setData] = React.useState(SAMPLE_DRAGGABLE_BASIC);

    const renderMobileItem = React.useCallback(
      ({ item, drag, isActive }: RenderItemParams<Item>) => {
        return (
          <ShadowDecorator>
            <ScaleDecorator>
              <OpacityDecorator>
                <TouchableOpacity
                  activeOpacity={1}
                  onLongPress={drag}
                  disabled={isActive}
                  style={{
                    padding: 20,
                    margin: 5,
                    backgroundColor:
                      item.color || (isActive ? '#e0e0e0' : '#f0f0f0'),
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#ccc',
                  }}>
                  <Text style={{ fontWeight: 'bold', color: '#333' }}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              </OpacityDecorator>
            </ScaleDecorator>
          </ShadowDecorator>
        );
      },
      [],
    );

    const renderWebItem = ({ item, isActive }: RenderItemParams<Item>) => (
      <ShadowDecorator>
        <View
          style={{
            padding: 20,
            margin: 5,
            backgroundColor: item.color || (isActive ? '#e0e0e0' : '#f0f0f0'),
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            cursor: 'pointer',
          }}>
          <Text style={{ fontWeight: 'bold', color: '#333' }}>{item.text}</Text>
        </View>
      </ShadowDecorator>
    );

    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Horizontal Draggable List
        </Text>
        <View style={{ height: 150 }}>
          <DraggableFlatList
            data={data}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={WEB ? renderWebItem : renderMobileItem}
            onDragEnd={({ data: newData }) => {
              setData(newData);
            }}
          />
        </View>
      </View>
    );
  },
};

export const WithCallbacks: Story = {
  name: 'With Drag Callbacks',
  args: {
    data: SAMPLE_DRAGGABLE_BASIC,
    //@ts-ignore
    keyExtractor: (item: Item) => item.id,
    renderItem: ({ item, drag, isActive }) => (
      <ShadowDecorator>
        <ScaleDecorator>
          <OpacityDecorator>
            <TouchableOpacity
              activeOpacity={1}
              onLongPress={drag}
              disabled={isActive}
              style={{
                padding: 20,
                margin: 5,
                backgroundColor:
                  //@ts-ignore
                  item.color || (isActive ? '#e0e0e0' : '#f0f0f0'),
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ccc',
              }}>
              <Text style={{ fontWeight: 'bold', color: '#333' }}>
                {/* @ts-ignore */}
                {item.text}
              </Text>
            </TouchableOpacity>
          </OpacityDecorator>
        </ScaleDecorator>
      </ShadowDecorator>
    ),
    onDragBegin: (index: number) =>
      console.log(`Started dragging item at index ${index}`),
    onDragEnd: ({ data: newData, from, to }) => {
      console.log(`Moved item from ${from} to ${to}`);
    },
    onRelease: (index: number) =>
      console.log(`Released item at index ${index}`),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates all drag event callbacks: onDragBegin, onDragEnd, and onRelease.',
      },
      source: {
        code: CODE_SAMPLE_DRAGGABLE_CALLBACK,
      },
    },
  },
  render: () => {
    const [data, setData] = React.useState(SAMPLE_DRAGGABLE_BASIC);
    const [dragState, setDragState] = React.useState<string>('');

    const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => (
      <ShadowDecorator>
        <ScaleDecorator>
          <OpacityDecorator>
            <TouchableOpacity
              activeOpacity={1}
              onLongPress={drag}
              disabled={isActive}
              style={{
                padding: 20,
                margin: 5,
                backgroundColor:
                  item.color || (isActive ? '#e0e0e0' : '#f0f0f0'),
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ccc',
              }}>
              <Text style={{ fontWeight: 'bold', color: '#333' }}>
                {item.text}
              </Text>
            </TouchableOpacity>
          </OpacityDecorator>
        </ScaleDecorator>
      </ShadowDecorator>
    );

    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          With Drag Callbacks
        </Text>
        <Text style={{ marginBottom: 10, color: '#666' }}>
          Status: {dragState || 'Ready to drag'}
        </Text>
        <DraggableFlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          onDragBegin={index => {
            setDragState(`Started dragging item at index ${index}`);
          }}
          onDragEnd={({ data: newData, from, to }) => {
            setData(newData);
            setDragState(`Moved item from ${from} to ${to}`);
            setTimeout(() => setDragState(''), 2000);
          }}
          onRelease={index => {
            setDragState(`Released item at index ${index}`);
          }}
        />
      </View>
    );
  },
};

export const CustomDecorators: Story = {
  name: 'Custom Decorators',
  args: {
    data: SAMPLE_DRAGGABLE_BASIC,
    keyExtractor: (_item, index) => index.toString(),
    renderItem: ({ item, drag, isActive }) => (
      <ShadowDecorator elevation={15} color="#007AFF" opacity={0.3}>
        <ScaleDecorator activeScale={1.05}>
          <OpacityDecorator activeOpacity={0.8}>
            <TouchableOpacity
              activeOpacity={1}
              onLongPress={drag}
              disabled={isActive}
              style={{
                padding: 20,
                margin: 5,
                //@ts-ignore
                backgroundColor: item?.color || '#ffffff',
                borderRadius: 12,
                borderWidth: 2,
                borderColor: isActive ? '#007AFF' : '#ddd',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}>
              <Text style={{ fontWeight: 'bold', color: '#333', fontSize: 16 }}>
                {/* @ts-ignore */}
                {item.text}
              </Text>
              <Text style={{ fontSize: 12, color: '#666', marginTop: 5 }}>
                Custom styling
              </Text>
            </TouchableOpacity>
          </OpacityDecorator>
        </ScaleDecorator>
      </ShadowDecorator>
    ),
    activationDistance: 10,
    animationConfig: {
      damping: 15,
      mass: 0.3,
      stiffness: 120,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Enhanced visual feedback with custom decorator settings and animation configurations.',
      },
      source: {
        code: CODE_SAMPLE_CUSTOM_DECOR,
      },
    },
  },
  render: () => {
    const [data, setData] = React.useState(SAMPLE_DRAGGABLE_BASIC);

    const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => (
      <ShadowDecorator elevation={15} color="#007AFF" opacity={0.3}>
        <ScaleDecorator activeScale={1.05}>
          <OpacityDecorator activeOpacity={0.8}>
            <TouchableOpacity
              activeOpacity={1}
              onLongPress={drag}
              disabled={isActive}
              style={{
                padding: 20,
                margin: 5,
                backgroundColor: item.color || '#ffffff',
                borderRadius: 12,
                borderWidth: 2,
                borderColor: isActive ? '#007AFF' : '#ddd',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}>
              <Text style={{ fontWeight: 'bold', color: '#333', fontSize: 16 }}>
                {item.text}
              </Text>
              <Text style={{ fontSize: 12, color: '#666', marginTop: 5 }}>
                Custom styling
              </Text>
            </TouchableOpacity>
          </OpacityDecorator>
        </ScaleDecorator>
      </ShadowDecorator>
    );

    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Custom Decorators
        </Text>
        <Text style={{ marginBottom: 15, color: '#666' }}>
          Enhanced visual feedback with custom decorator settings
        </Text>
        <DraggableFlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          onDragEnd={({ data: newData }) => {
            setData(newData);
          }}
          activationDistance={10}
          animationConfig={{
            damping: 15,
            mass: 0.3,
            stiffness: 120,
          }}
        />
      </View>
    );
  },
};

export const WithPlaceholders: Story = {
  name: 'With Custom Placeholders',
  args: {
    data: SAMPLE_DRAGGABLE_PLACEHOLDER,
    keyExtractor: (_item, index) => index.toString(),
    renderItem: ({ item, drag, isActive }) => (
      <ShadowDecorator>
        <ScaleDecorator>
          <OpacityDecorator>
            <TouchableOpacity
              activeOpacity={1}
              onLongPress={drag}
              disabled={isActive}
              style={{
                padding: 20,
                margin: 5,
                backgroundColor:
                  //@ts-ignore
                  item.color || (isActive ? '#e0e0e0' : '#f0f0f0'),
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ccc',
              }}>
              <Text style={{ fontWeight: 'bold', color: '#333' }}>
                {/* @ts-ignore */}
                {item.text}
              </Text>
            </TouchableOpacity>
          </OpacityDecorator>
        </ScaleDecorator>
      </ShadowDecorator>
    ),
    renderPlaceholder: ({ item, index }) => (
      <View
        style={{
          padding: 20,
          margin: 5,
          backgroundColor: '#FFE4B5',
          borderRadius: 8,
          borderWidth: 2,
          borderColor: '#FF8C00',
          borderStyle: 'dashed',
          opacity: 0.7,
        }}>
        <Text style={{ fontWeight: 'bold', color: '#FF8C00' }}>
          {/* @ts-ignore */}
          Drop {item?.text} here
        </Text>
      </View>
    ),
    onDragEnd: ({ data: newData }) =>
      console.log('onDragEnd -> new data:', newData),
    onPlaceholderIndexChange: (index: number | null) =>
      console.log('onPlaceholderIndexChange', index),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom placeholder rendering during drag operations to show drop targets. (Mobile devices only)',
      },
      source: {
        code: CODE_SAMPLE_DRAGGABLE_PLACEHOLDER,
      },
    },
  },
  render: () => {
    const [data, setData] = React.useState(SAMPLE_DRAGGABLE_PLACEHOLDER);
    const [placeholderIndex, setPlaceholderIndex] = React.useState<
      number | null
    >(null);

    const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => (
      <ShadowDecorator>
        <ScaleDecorator>
          <OpacityDecorator>
            <TouchableOpacity
              activeOpacity={1}
              onLongPress={drag}
              disabled={isActive}
              style={{
                padding: 20,
                margin: 5,
                backgroundColor:
                  item.color || (isActive ? '#e0e0e0' : '#f0f0f0'),
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#ccc',
              }}>
              <Text style={{ fontWeight: 'bold', color: '#333' }}>
                {item.text}
              </Text>
            </TouchableOpacity>
          </OpacityDecorator>
        </ScaleDecorator>
      </ShadowDecorator>
    );

    const renderPlaceholder = ({
      item,
      index,
    }: {
      item: Item;
      index: number;
    }) => (
      <View
        style={{
          padding: 20,
          margin: 5,
          backgroundColor: '#FFE4B5',
          borderRadius: 8,
          borderWidth: 2,
          borderColor: '#FF8C00',
          borderStyle: 'dashed',
          opacity: 0.7,
        }}>
        <Text style={{ fontWeight: 'bold', color: '#FF8C00' }}>
          Drop {item.text} here
        </Text>
      </View>
    );

    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          With Custom Placeholders
        </Text>
        <Text style={{ marginBottom: 10, color: colors.red_E90000 }}>
          *Please use Mobile Application to see the Placeholders
        </Text>
        {!WEB && (
          <Text style={{ marginBottom: 10, color: '#666' }}>
            Placeholder at index:{' '}
            {placeholderIndex !== null ? placeholderIndex : 'None'}
          </Text>
        )}
        <DraggableFlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          renderPlaceholder={renderPlaceholder}
          onDragEnd={({ data: newData }) => {
            setData(newData);
            setPlaceholderIndex(null);
          }}
          onPlaceholderIndexChange={setPlaceholderIndex}
        />
      </View>
    );
  },
};
