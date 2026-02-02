import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollView, View } from 'react-native';
import { AccordionGroup, AccordionItem, AccordionTree, Text } from '@estuary/rn-core-ui';
import RenderItem from '../../../src/components/Accordion/RenderItem';
import { CODE_BASIC_SAMPLE_1, CODE_SAMPLE_2, CODE_SAMPLE_3, CODE_SAMPLE_4, CODE_SAMPLE_5, nestedSample, nestedSample2, sampleData, sampleData2 } from '../../../src/components/Accordion/Samples/Datas';
import RenderRootItem from '../../../src/components/Accordion/RenderRootItem';
import { WEB, width } from '@estuary/rn-core-ui/utils';
import RenderItemByLevel from '../../../src/components/Accordion/RenderItemByLevel';
import { colors } from '@estuary/rn-core-ui/themes';

const meta = {
  title: 'Data Display/AccordionTree',
  component: AccordionTree,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    data: {
      name: 'data',
      description: "Defines the hierarchical structure of the accordion tree.\nEach item represents a single accordion node and may contain nested children to create multi- level accordions.",
      table: {
        category: 'Data',
        defaultValue: {
          summary: '[]'
        },
        type: {
          summary: 'Type',
          detail: 'AccordionNode[]\nundefined',
        },
      },
      control: false,
    },
    type: {
      name: 'type',
      description:
        'Controls expansion behavior at each tree level.\n' +
        '- `single`: only one item can be expanded per level\n' +
        '- `multiple`: multiple items can be expanded per level',
      table: {
        category: 'Behavior',
        type: {
          summary: `'single' | 'multiple'`,
        },
        defaultValue: {
          summary: 'multiple',
        },
      },
      control: false,
    },
    renderItem: {
      name: 'renderItem',
      description:
        'Custom render function for each accordion node.\n' +
        'Receives item data, nodeId, expansion state, and nesting level.',
      table: {
        category: 'Render',
        type: {
          summary: '(props: AccordionTreeItemProps) => ReactNode',
        },
      },
      control: false,
    },
    renderRootItem: {
      name: 'renderRootItem',
      description:
        'Optional custom render function for root-level nodes.\n' +
        'Overrides renderItem for level 0.',
      table: {
        category: 'Render',
        type: {
          summary: '(props: AccordionTreeItemProps) => ReactNode',
        },
      },
      control: false,
    },
    onItemChange: {
      name: 'onItemChange',
      description:
        'Callback fired when an accordion item is expanded or collapsed.',
      table: {
        category: 'Events',
        type: {
          summary:
            '(item: AccordionNode, info: { id, path, expanded }) => void',
        },
      },
      control: false,
    },
    style: {
      name: 'style',
      description: 'Style applied to the accordion tree container.',
      table: {
        category: 'Style',
        type: {
          summary: 'ViewStyle',
        },
      },
      control: false,
    },
    itemStyle: {
      name: 'itemStyle',
      description: 'Style applied to each accordion item header.',
      table: {
        category: 'Style',
        type: {
          summary: 'ViewStyle',
        },
      },
      control: false,
    },
    itemTextStyle: {
      name: 'itemTextStyle',
      description: 'Style applied to the default text label.',
      table: {
        category: 'Style',
        type: {
          summary: 'TextStyle',
        },
      },
      control: false,
    },
  }
} satisfies Meta<typeof AccordionTree>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: 'Basic Accordion',
  args: {
    data: sampleData,
    type:'single',
    renderItem: RenderItem,
    style: {
      width: WEB ? undefined : width / 1.2,
    }
  },
  parameters: {
    docs: {
      source: {
        code: CODE_BASIC_SAMPLE_1
      }
    }
  },
  render: args => {
    return (
      <ScrollView>
        <AccordionTree {...args} />
      </ScrollView>
    )
  }
}

export const MultipleAccordion: Story = {
  name: 'Multiple Selection',
  args: {
    data: sampleData,
    type: 'multiple',
    renderItem: RenderItem,
    style: {
      width: WEB ? undefined : width / 1.2,
    }
  },
  parameters: {
    docs: {
      source: {
        code: CODE_SAMPLE_2
      }
    }
  },
  render: args => {
    return (
      <ScrollView>
        <AccordionTree {...args} />
      </ScrollView>
    )
  }
}

export const RootHeader: Story = {
  name: 'Custom Root Header',
  args: {
    data: sampleData,
    type: 'multiple',
    renderItem: RenderItem,
    renderRootItem: RenderRootItem,
    style: {
      width: WEB ? undefined : width / 1.2,
    }
  },
  parameters: {
    docs: {
      source: {
        code: CODE_SAMPLE_3
      }
    }
  },
  render: args => {
    return (
      <ScrollView>
        <AccordionTree {...args} />
      </ScrollView>
    )
  }
}

export const Stylable: Story = {
  name: 'Stylable Accordion',
  args: {
    data: sampleData2,
    type: 'multiple',
    renderItem: RenderItemByLevel,
    style: {
      width: WEB ? undefined : width / 1.2,
      borderRadius: 10,
      overflow: 'hidden', //Must be set for apply borderRadius
    }
  },
  parameters: {
    docs: {
      source: {
        code: CODE_SAMPLE_4
      }
    }
  },
  render: args => {
    return (
      <ScrollView>
        <Text color={colors.red_E00102} bold>(*) Use label for custom children!</Text>
        <View style={{ height: 20 }} />

        <AccordionTree {...args} />
      </ScrollView>
    )
  }
}

export const NestedAccordion: Story = {
  name: 'Nested Accordion',
  args: {
    data: [],
    style: {
      width: WEB ? undefined : width / 1.2,
      borderRadius: 10,
      overflow: 'hidden', //Must be set for apply borderRadius
    }
  },
  parameters: {
    docs: {
      source: {
        code: CODE_SAMPLE_5
      }
    }
  },
  render: args => {
    return (
      <ScrollView>
        <Text color={colors.red_E00102} bold>(*) Remember each children much have their unique id!</Text>
        <View style={{ height: 20 }} />

        <AccordionGroup type='single'>
          <AccordionTree data={nestedSample} renderRootItem={RenderRootItem} renderItem={RenderItemByLevel} style={args.style} />

          <View style={{height:20}}/>

          <AccordionTree data={nestedSample2} renderRootItem={RenderRootItem} renderItem={RenderItemByLevel} style={args.style} />
        </AccordionGroup>
      </ScrollView>
    )
  }
}
