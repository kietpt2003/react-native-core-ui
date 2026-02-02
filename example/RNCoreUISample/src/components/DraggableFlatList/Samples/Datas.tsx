interface Item {
  id: string;
  text: string;
  color?: string;
}

export const SAMPLE_DRAGGABLE_BASIC: Item[] = [
  { id: '1', text: 'Design onboarding flow', color: '#FF6B6B' },
  { id: '2', text: 'Implement login API', color: '#4ECDC4' },
  { id: '3', text: 'Build profile screen', color: '#45B7D1' },
  { id: '4', text: 'Push notification setup', color: '#96CEB4' },
  { id: '5', text: 'Analytics integration', color: '#FFEAA7' },
  { id: '6', text: 'Release checklist', color: '#DDA0DD' },
];

export const SAMPLE_DRAGGABLE_PLACEHOLDER: Item[] = [
  { id: '1', text: 'Buy milk', color: '#FF6B6B' },
  { id: '2', text: 'Call dentist', color: '#4ECDC4' },
  { id: '3', text: 'Finish report', color: '#45B7D1' },
  { id: '4', text: 'Pick up dry cleaning', color: '#96CEB4' },
  { id: '5', text: 'Book flight', color: '#FFEAA7' },
  { id: '6', text: 'Schedule meeting', color: '#DDA0DD' },
];

export const CODE_SAMPLE_DRAGGABLE_BASIC = `
import React from 'react';
import { View } from 'react-native';
import {
  DraggableFlatList,
  OpacityDecorator,
  ScaleDecorator,
  ShadowDecorator,
  Text,
} from '@estuary/rn-core-ui';
import { WEB } from '@estuary/rn-core-ui/utils';

const BasicSample = () => {
  const [data, setData] = React.useState([
    { id: '1', text: 'Design onboarding flow', color: '#FF6B6B' },
    { id: '2', text: 'Implement login API', color: '#4ECDC4' },
    { id: '3', text: 'Build profile screen', color: '#45B7D1' },
    { id: '4', text: 'Push notification setup', color: '#96CEB4' },
    { id: '5', text: 'Analytics integration', color: '#FFEAA7' },
    { id: '6', text: 'Release checklist', color: '#DDA0DD' },
  ]);

  const renderMobileItem = React.useCallback(({ item, drag, isActive }) => {
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
  }, []);

  const renderWebItem = ({ item, isActive }) => (
    <ShadowDecorator>
      <View
        style={{
          padding: 20,
          margin: 5,
          backgroundColor: item.color || (isActive ? '#e0e0e0' : '#f0f0f0'),
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ccc',
          cursor: 'grab',
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
};

export default BasicSample;

`;

export const CODE_SAMPLE_DRAGGABLE_HORIZONTAL = `
import React from 'react';
import { View } from 'react-native';
import { DraggableFlatList, ShadowDecorator, Text } from '@estuary/rn-core-ui';

const HorizontalList = () => {
  const [data, setData] = React.useState([
    { id: '1', text: 'Design onboarding flow' },
    { id: '2', text: 'Implement login API' },
    { id: '3', text: 'Build profile screen' },
  ]);

  return (
    <View style={{ height: 150 }}>
      <DraggableFlatList
        data={data}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, isActive }) => (
          <ShadowDecorator>
            <View
              style={{
                width: 120,
                height: 80,
                padding: 10,
                margin: 5,
                backgroundColor: isActive ? '#e0e0e0' : '#f0f0f0',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ textAlign: 'center' }}>{item.text}</Text>
            </View>
          </ShadowDecorator>
        )}
        onDragEnd={({ data: newData }) => setData(newData)}
      />
    </View>
  );
};

export default HorizontalList;

`;

export const CODE_SAMPLE_DRAGGABLE_CALLBACK = `
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  DraggableFlatList,
  ShadowDecorator,
  ScaleDecorator,
  OpacityDecorator,
  Text,
} from '@estuary/rn-core-ui';

const CallbacksExample = () => {
  const [data, setData] = React.useState([
    { id: '1', text: 'Design onboarding flow' },
    { id: '2', text: 'Implement login API' },
    { id: '3', text: 'Build profile screen' },
  ]);

  const renderItem = ({ item, drag, isActive }) => (
    <ShadowDecorator>
      <ScaleDecorator>
        <OpacityDecorator>
          <TouchableOpacity
            onLongPress={drag}
            disabled={isActive}
            style={{
              padding: 20,
              margin: 5,
              backgroundColor: isActive ? '#e0e0e0' : '#f0f0f0',
              borderRadius: 8,
            }}>
            <Text>{item.text}</Text>
          </TouchableOpacity>
        </OpacityDecorator>
      </ScaleDecorator>
    </ShadowDecorator>
  );

  return (
    <DraggableFlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      onDragBegin={index => {
        // console.log(\`Started dragging item at index \${index}\`);
        // Show loading state, play sound, etc.
      }}
      onDragEnd={({ data: newData, from, to }) => {
        // console.log(\`Moved item from \${from} to \${to}\`);
        setData(newData);
      }}
      onRelease={index => {
        // console.log(\`Released item at index \${index}\`);
        // Cleanup actions
      }}
    />
  );
};

export default CallbacksExample;

`;

export const CODE_SAMPLE_CUSTOM_DECOR = `
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  DraggableFlatList,
  ShadowDecorator,
  ScaleDecorator,
  OpacityDecorator,
  Text,
} from '@estuary/rn-core-ui';

const CustomDecoratorsExample = () => {
  const [data, setData] = React.useState([
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
  ]);

  const renderItem = ({ item, drag, isActive }) => (
    <ShadowDecorator elevation={15} color="#007AFF" opacity={0.3}>
      <ScaleDecorator activeScale={1.05}>
        <OpacityDecorator activeOpacity={0.8}>
          <TouchableOpacity
            onLongPress={drag}
            disabled={isActive}
            style={{
              padding: 20,
              margin: 5,
              backgroundColor: '#ffffff',
              borderRadius: 12,
              borderWidth: 2,
              borderColor: isActive ? '#007AFF' : '#ddd',
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {item.text}
            </Text>
          </TouchableOpacity>
        </OpacityDecorator>
      </ScaleDecorator>
    </ShadowDecorator>
  );

  return (
    <DraggableFlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      onDragEnd={({ data: newData }) => setData(newData)}
      activationDistance={10}
      animationConfig={{
        damping: 15, // Less bouncy
        mass: 0.3, // Lighter feel
        stiffness: 120, // More responsive
      }}
    />
  );
};

export default CustomDecoratorsExample;

`;

export const CODE_SAMPLE_DRAGGABLE_PLACEHOLDER = `
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  DraggableFlatList,
  ShadowDecorator,
  ScaleDecorator,
  OpacityDecorator,
  Text,
} from '@estuary/rn-core-ui';

const PlaceholdersExample = () => {
  const [data, setData] = React.useState([
    { id: '1', text: 'Buy milk' },
    { id: '2', text: 'Call dentist' },
    { id: '3', text: 'Finish report' },
  ]);

  const renderItem = ({ item, drag, isActive }) => (
    <ShadowDecorator>
      <ScaleDecorator>
        <OpacityDecorator>
          <TouchableOpacity
            onLongPress={drag}
            disabled={isActive}
            style={{
              padding: 20,
              margin: 5,
              backgroundColor: isActive ? '#e0e0e0' : '#f0f0f0',
              borderRadius: 8,
            }}>
            <Text>{item.text}</Text>
          </TouchableOpacity>
        </OpacityDecorator>
      </ScaleDecorator>
    </ShadowDecorator>
  );

  const renderPlaceholder = ({ item, index }) => (
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
      <Text style={{ color: '#FF8C00', fontWeight: 'bold' }}>
        Drop {item.text} here (position {index})
      </Text>
    </View>
  );

  return (
    <DraggableFlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderPlaceholder={renderPlaceholder}
      onDragEnd={({ data: newData }) => setData(newData)}
      onPlaceholderIndexChange={(index) => {
        console.log(\`Placeholder at index: \${index}\`);
      }}
    />
  );
};

export default PlaceholdersExample;

`;
