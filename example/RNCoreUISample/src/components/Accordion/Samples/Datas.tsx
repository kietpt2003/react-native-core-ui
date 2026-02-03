import { AccordionNode } from '@kietpt2003/react-native-core-ui/Accordion/types/AccordionTypes';
import RenderCustomItem from '../RenderCustomItem';

export const sampleData: AccordionNode[] = [
  {
    title: 'Our Solutions',
    children: [
      {
        title: 'Salesforce Automation & CRM (SaleX)',
        children: [
          {
            title: 'View Details',
            children: [
              {
                title: 'Flexible and visual reports',
              },
              {
                title: 'Enhance sales performance & efficiency',
              },
              {
                title: 'Real-time monitoring',
              },
              {
                title: 'Compatible with all business models',
              },
            ],
          },
        ],
      },
      {
        title: 'Customer Engagement Platform (EngageX)',
        children: [
          {
            title: 'View Details',
            children: [
              {
                title: 'Enhance sales offtake',
              },
              {
                title: 'Enhance interaction with customers',
              },
              {
                title: 'Flexible visual reports',
              },
              {
                title: 'Real-time monitoring',
              },
              {
                title: 'Quick deployment of promotional programs',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'About us',
    children: [
      {
        title: 'Disruptive Solutions',
        children: [
          {
            title:
              'Estuary is a SalesTech company from Vietnam specializing in Sales-Enabling platforms.',
          },
          {
            title:
              'Estuary helps multinational companies and leading local enterprises in Asia Pacific',
          },
        ],
      },
      {
        title: 'Simplify all sales tasks with the SaleX application',
        children: [
          {
            title: '1. Manual tasks of Field sales staff at the store',
            children: [
              {
                title:
                  'In a traditional business environment, field sales staff often have to perform many complex manual tasks. This not only reduces work efficiency but also leads to unnecessary errors. Here are some common manual sales tasks:',
                children: [
                  {
                    title: '1.1. Order management',
                    children: [
                      {
                        title:
                          'Order management is one of the most important tasks of sales staff. During this process, staff must record customer information, order details, track delivery status, and handle return requests.',
                      },
                    ],
                  },
                  {
                    title: '1.2. Inventory management',
                    children: [
                      {
                        title:
                          'Inventory checking is the process of checking and recording the quantity of goods in the warehouse. Sales staff need to go to distributors or outlets to check inventory. ',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: '2. Placing orders for customers at the store with SaleX',
            children: [
              {
                title:
                  'With SaleX, placing orders for customers at the store becomes simpler and faster than ever. This application provides powerful tools that allow sales staff to perform all tasks with just a few taps on their phone or tablet.',
              },
              {
                title:
                  'SaleX allows sales staff to easily create and manage orders. Simply enter customer information and select products; the system will automatically create the order and store all the information. There is no need for manual recording, minimizing the risk of errors.',
              },
              {
                title:
                  "More importantly, SaleX can be integrated with the company's internal system, allowing staff to immediately check stock status. This enables them to accurately advise customers about product availability, avoiding situations of under or over-selling.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const sampleData2: AccordionNode[] = [
  {
    title: 'Our Solutions',
    children: [
      {
        title: 'Salesforce Automation & CRM (SaleX)',
        children: [
          {
            title: 'View Details',
            children: [
              {
                label: (
                  <RenderCustomItem
                    title="Flexible and visual reports"
                    url="https://picsum.photos/id/11/200/300"
                  />
                ),
                disabled: true,
              },
              {
                label: (
                  <RenderCustomItem
                    title="Enhance sales performance & efficiency"
                    url="https://picsum.photos/id/7/200/300"
                  />
                ),
                disabled: true,
              },
              {
                label: (
                  <RenderCustomItem
                    title="Real-time monitoring"
                    url="https://picsum.photos/id/175/200/300"
                  />
                ),
                disabled: true,
              },
              {
                label: (
                  <RenderCustomItem
                    title="Compatible with all business models"
                    url="https://picsum.photos/id/192/200/300"
                  />
                ),
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        title: 'Customer Engagement Platform (EngageX)',
        children: [
          {
            title: 'View Details',
            children: [
              {
                label: (
                  <RenderCustomItem title="Enhance sales offtake" mode={true} />
                ),
                disabled: true,
              },
              {
                label: (
                  <RenderCustomItem
                    title="Enhance interaction with customers"
                    mode={true}
                  />
                ),
                disabled: true,
              },
              {
                label: (
                  <RenderCustomItem
                    title="Flexible visual reports"
                    mode={true}
                  />
                ),
                disabled: true,
              },
              {
                label: (
                  <RenderCustomItem title="Real-time monitoring" mode={true} />
                ),
                disabled: true,
              },
              {
                label: (
                  <RenderCustomItem
                    title="Quick deployment of promotional programs"
                    mode={true}
                    disabled={true}
                  />
                ),
                disabled: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'About us',
    children: [
      {
        title: 'Disruptive Solutions',
        children: [
          {
            title:
              'Estuary is a SalesTech company from Vietnam specializing in Sales-Enabling platforms.',
            disabled: true,
          },
          {
            title:
              'Estuary helps multinational companies and leading local enterprises in Asia Pacific',
            disabled: true,
          },
        ],
      },
      {
        title: 'Simplify all sales tasks with the SaleX application',
        children: [
          {
            title: '1. Manual tasks of Field sales staff at the store',
            children: [
              {
                title:
                  'In a traditional business environment, field sales staff often have to perform many complex manual tasks. This not only reduces work efficiency but also leads to unnecessary errors. Here are some common manual sales tasks:',
                children: [
                  {
                    title: '1.1. Order management',
                    children: [
                      {
                        title:
                          'Order management is one of the most important tasks of sales staff. During this process, staff must record customer information, order details, track delivery status, and handle return requests.',
                        disabled: true,
                      },
                    ],
                  },
                  {
                    title: '1.2. Inventory management',
                    children: [
                      {
                        title:
                          'Inventory checking is the process of checking and recording the quantity of goods in the warehouse. Sales staff need to go to distributors or outlets to check inventory. ',
                        disabled: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: '2. Placing orders for customers at the store with SaleX',
            children: [
              {
                title:
                  'With SaleX, placing orders for customers at the store becomes simpler and faster than ever. This application provides powerful tools that allow sales staff to perform all tasks with just a few taps on their phone or tablet.',
                disabled: true,
              },
              {
                title:
                  'SaleX allows sales staff to easily create and manage orders. Simply enter customer information and select products; the system will automatically create the order and store all the information. There is no need for manual recording, minimizing the risk of errors.',
                disabled: true,
              },
              {
                title:
                  "More importantly, SaleX can be integrated with the company's internal system, allowing staff to immediately check stock status. This enables them to accurately advise customers about product availability, avoiding situations of under or over-selling.",
                disabled: true,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const nestedSample: AccordionNode[] = [
  {
    id: '51ca88b4-4646-48df-b1d7-ecce5330ebcc',
    title: 'Our Solutions',
    children: [
      {
        id: 'ca6c09cb-99cf-4a59-81db-a251e6fc3c88',
        title: 'Salesforce Automation & CRM (SaleX)',
        children: [
          {
            id: '849e2160-2ab8-49e3-9cfc-8e8fe8080fa3',
            title: 'View Details',
            children: [
              {
                id: '1ce356ee-4f9b-46de-b0f0-48aef8033003',
                label: (
                  <RenderCustomItem
                    title="Flexible and visual reports"
                    url="https://picsum.photos/id/11/200/300"
                  />
                ),
                disabled: true,
              },
              {
                id: '093cd0dd-c2b7-4021-867c-dea118aa7646',
                label: (
                  <RenderCustomItem
                    title="Enhance sales performance & efficiency"
                    url="https://picsum.photos/id/7/200/300"
                  />
                ),
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        id: 'b1fe3e9b-a8f9-417b-b823-87dba8e430f5',
        title: 'Customer Engagement Platform (EngageX)',
        children: [
          {
            id: '0640d8ca-803f-4027-af09-fca43cd6d695',
            title: 'View Details',
            children: [
              {
                id: '5b9de49b-d5d2-411c-8ca7-fa21433a2ec2',
                label: (
                  <RenderCustomItem title="Enhance sales offtake" mode={true} />
                ),
                disabled: true,
              },
              {
                id: '35c4b1c2-1c5e-43bf-b845-ee4ad739236e',
                label: (
                  <RenderCustomItem
                    title="Quick deployment of promotional programs"
                    mode={true}
                    disabled={true}
                  />
                ),
                disabled: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'cadd5e71-e3d2-4a79-b598-6d17c7af9ec9',
    title: 'About us',
    children: [
      {
        id: '05a14386-2f3b-46ea-bec4-8c68e875a40c',
        title: 'Disruptive Solutions',
        children: [
          {
            id: 'b8416f2f-12ce-4d2a-b074-29dcd355b115',
            title:
              'Estuary is a SalesTech company from Vietnam specializing in Sales-Enabling platforms.',
            disabled: true,
          },
          {
            id: 'ac092bb5-cb7a-4499-afe9-0a426adb0008',
            title:
              'Estuary helps multinational companies and leading local enterprises in Asia Pacific',
            disabled: true,
          },
        ],
      },
    ],
  },
];

export const nestedSample2: AccordionNode[] = [
  {
    id: '85784bef-b420-405e-8a7d-9162258b5b31',
    title: 'Products',
    children: [
      {
        id: 'd434210b-a736-4c55-a513-3937139da97f',
        title: 'Mobile Applications',
        children: [
          {
            id: 'bcf8df8a-828c-448d-94a3-9901c20eb601',
            title: 'View Features',
            children: [
              {
                id: 'edd007c6-498b-48b1-a172-21b95dbda53c',
                label: (
                  <RenderCustomItem
                    title="Offline-first experience"
                    url="https://picsum.photos/id/101/200/300"
                  />
                ),
                disabled: true,
              },
              {
                id: 'e4b00dff-d823-4e1a-8836-2629efc2c190',
                label: (
                  <RenderCustomItem
                    title="High performance animations"
                    url="https://picsum.photos/id/102/200/300"
                  />
                ),
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        id: '5021b281-40ca-4a92-87cc-2c35470b42d2',
        title: 'Web Platforms',
        children: [
          {
            id: '8f1c9b99-9141-43b2-b1bd-1bfafbfef28f',
            title: 'View Features',
            children: [
              {
                id: '9d55bf49-85c2-498a-90a8-998438f93a77',
                label: (
                  <RenderCustomItem
                    title="SEO optimized architecture"
                    mode={true}
                  />
                ),
                disabled: true,
              },
              {
                id: '4731f287-aee0-452f-889d-4e216ea08f50',
                label: (
                  <RenderCustomItem
                    title="Scalable micro-frontend design"
                    mode={true}
                  />
                ),
                disabled: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c672703f-be78-48ea-8b31-a1dbc7065d0b',
    title: 'Company',
    children: [
      {
        id: '4b0ac345-5d43-4bf8-98ea-a5d30de05eed',
        title: 'Who We Are',
        children: [
          {
            id: '18abb901-50f4-40bc-9661-50c166d588a1',
            title: 'We build scalable digital products for modern businesses.',
            disabled: true,
          },
          {
            id: '19032609-9803-4aff-8532-4e59e8e826c3',
            title: 'Our teams focus on performance, UX, and maintainability.',
            disabled: true,
          },
        ],
      },
    ],
  },
];

export const CODE_BASIC_SAMPLE_1 = `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SvgIcon, Text } from '@kietpt2003/react-native-core-ui';
import { WEB, width } from '@kietpt2003/react-native-core-ui/utils';

const data = [
  {
    title: 'Our Solutions',
    children: [
      {
        title: 'Salesforce Automation & CRM (SaleX)',
        children: [
          {
            title: 'View Details',
            children: [
              {
                title: 'Flexible and visual reports'
              },
              {
                title: 'Enhance sales performance & efficiency'
              },
              {
                title: 'Real-time monitoring'
              },
              {
                title: 'Compatible with all business models'
              }
            ]
          }
        ]
      },
      {
        title: 'Customer Engagement Platform (EngageX)',
        children: [
          {
            title: 'View Details',
            children: [
              {
                title: 'Enhance sales offtake'
              },
              {
                title: 'Enhance interaction with customers'
              },
              {
                title: 'Flexible visual reports'
              },
              {
                title: 'Real-time monitoring'
              },
              {
                title: 'Quick deployment of promotional programs'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'About us',
    children: [
      {
        title: 'Disruptive Solutions',
        children: [
          {
            title: 'Estuary is a SalesTech company from Vietnam specializing in Sales-Enabling platforms.'
          },
          {
            title: 'Estuary helps multinational companies and leading local enterprises in Asia Pacific'
          }
        ]
      },
      {
        title: 'Simplify all sales tasks with the SaleX application',
        children: [
          {
            title: '1. Manual tasks of Field sales staff at the store',
            children: [
              {
                title: 'In a traditional business environment, field sales staff often have to perform many complex manual tasks. This not only reduces work efficiency but also leads to unnecessary errors. Here are some common manual sales tasks:',
                children: [
                  {
                    title: '1.1. Order management',
                    children: [
                      {
                        title: 'Order management is one of the most important tasks of sales staff. During this process, staff must record customer information, order details, track delivery status, and handle return requests.'
                      }
                    ]
                  },
                  {
                    title: '1.2. Inventory management',
                    children: [
                      {
                        title: 'Inventory checking is the process of checking and recording the quantity of goods in the warehouse. Sales staff need to go to distributors or outlets to check inventory. '
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: '2. Placing orders for customers at the store with SaleX',
            children: [
              {
                title: 'With SaleX, placing orders for customers at the store becomes simpler and faster than ever. This application provides powerful tools that allow sales staff to perform all tasks with just a few taps on their phone or tablet.'
              },
              {
                title: 'SaleX allows sales staff to easily create and manage orders. Simply enter customer information and select products; the system will automatically create the order and store all the information. There is no need for manual recording, minimizing the risk of errors.'
              },
              {
                title: 'More importantly, SaleX can be integrated with the company\'s internal system, allowing staff to immediately check stock status. This enables them to accurately advise customers about product availability, avoiding situations of under or over-selling.'
              }
            ]
          }
        ]
      }
    ]
  }
];

const Demo = () => {
  const renderItem = ({ item, isExpanded, level }) => {
    const hasChildren = !!item.children?.length;

    return (
      <View style={[styles.row, { paddingLeft: 16 + level * 12 }]}>
        {hasChildren && (
          <SvgIcon
            name={isExpanded ? "chevron-down" : "angle-right"}
            size={16}
            style={styles.icon}
          />
        )}

        <Text style={styles.text}>{item.title}</Text>
      </View>
    );
  };

  const onItemChange = (item, info) => {
    console.log(item);
    //id
    //title
    //label
    //disabled
    //children
    console.log(info);
    //id
    //path
    //expanded
  }

  return (
    <ScrollView>
      <AccordionTree
        data={data}
        onItemChange={onItemChange}
        renderItem={renderItem}
        type="single"
        style={container}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WEB ? undefined : width / 1.2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    flex: 1,
  },
});

export default Demo;

`;

export const CODE_SAMPLE_2 = `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SvgIcon, Text } from '@kietpt2003/react-native-core-ui';
import { WEB, width } from '@kietpt2003/react-native-core-ui/utils';

const data = [
  {
    title: 'Our Solutions',
    children: [
      {
        title: 'Salesforce Automation & CRM (SaleX)',
        children: [
          {
            title: 'View Details',
            children: [
              {
                title: 'Flexible and visual reports'
              },
              {
                title: 'Enhance sales performance & efficiency'
              },
              {
                title: 'Real-time monitoring'
              },
              {
                title: 'Compatible with all business models'
              }
            ]
          }
        ]
      },
      {
        title: 'Customer Engagement Platform (EngageX)',
        children: [
          {
            title: 'View Details',
            children: [
              {
                title: 'Enhance sales offtake'
              },
              {
                title: 'Enhance interaction with customers'
              },
              {
                title: 'Flexible visual reports'
              },
              {
                title: 'Real-time monitoring'
              },
              {
                title: 'Quick deployment of promotional programs'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'About us',
    children: [
      {
        title: 'Disruptive Solutions',
        children: [
          {
            title: 'Estuary is a SalesTech company from Vietnam specializing in Sales-Enabling platforms.'
          },
          {
            title: 'Estuary helps multinational companies and leading local enterprises in Asia Pacific'
          }
        ]
      },
      {
        title: 'Simplify all sales tasks with the SaleX application',
        children: [
          {
            title: '1. Manual tasks of Field sales staff at the store',
            children: [
              {
                title: 'In a traditional business environment, field sales staff often have to perform many complex manual tasks. This not only reduces work efficiency but also leads to unnecessary errors. Here are some common manual sales tasks:',
                children: [
                  {
                    title: '1.1. Order management',
                    children: [
                      {
                        title: 'Order management is one of the most important tasks of sales staff. During this process, staff must record customer information, order details, track delivery status, and handle return requests.'
                      }
                    ]
                  },
                  {
                    title: '1.2. Inventory management',
                    children: [
                      {
                        title: 'Inventory checking is the process of checking and recording the quantity of goods in the warehouse. Sales staff need to go to distributors or outlets to check inventory. '
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: '2. Placing orders for customers at the store with SaleX',
            children: [
              {
                title: 'With SaleX, placing orders for customers at the store becomes simpler and faster than ever. This application provides powerful tools that allow sales staff to perform all tasks with just a few taps on their phone or tablet.'
              },
              {
                title: 'SaleX allows sales staff to easily create and manage orders. Simply enter customer information and select products; the system will automatically create the order and store all the information. There is no need for manual recording, minimizing the risk of errors.'
              },
              {
                title: 'More importantly, SaleX can be integrated with the company\'s internal system, allowing staff to immediately check stock status. This enables them to accurately advise customers about product availability, avoiding situations of under or over-selling.'
              }
            ]
          }
        ]
      }
    ]
  }
];

const Demo = () => {
  const renderItem = ({ item, isExpanded, level }) => {
    const hasChildren = !!item.children?.length;

    return (
      <View style={[styles.row, { paddingLeft: 16 + level * 12 }]}>
        {hasChildren && (
          <SvgIcon
            name={isExpanded ? "chevron-down" : "angle-right"}
            size={16}
            style={styles.icon}
          />
        )}

        <Text style={styles.text}>{item.title}</Text>
      </View>
    );
  };

  const onItemChange = (item, info) => {
    console.log(item);
    //id
    //title
    //label
    //disabled
    //children
    console.log(info);
    //id
    //path
    //expanded
  }

  return (
    <ScrollView>
      <AccordionTree
        data={data}
        onItemChange={onItemChange}
        renderItem={renderItem}
        type="multiple"
        style={container}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WEB ? undefined : width / 1.2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    flex: 1,
  },
});

export default Demo;

`;

export const CODE_SAMPLE_3 = `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SvgIcon, Text } from '@kietpt2003/react-native-core-ui';
import { colors } from '@kietpt2003/react-native-core-ui/themes';
import { WEB, width } from '@kietpt2003/react-native-core-ui/utils';

const data = [
  {
    title: 'Our Solutions',
    children: [
      {
        title: 'Salesforce Automation & CRM (SaleX)',
        children: [
          {
            title: 'View Details',
            children: [
              {
                title: 'Flexible and visual reports'
              },
              {
                title: 'Enhance sales performance & efficiency'
              },
              {
                title: 'Real-time monitoring'
              },
              {
                title: 'Compatible with all business models'
              }
            ]
          }
        ]
      },
      {
        title: 'Customer Engagement Platform (EngageX)',
        children: [
          {
            title: 'View Details',
            children: [
              {
                title: 'Enhance sales offtake'
              },
              {
                title: 'Enhance interaction with customers'
              },
              {
                title: 'Flexible visual reports'
              },
              {
                title: 'Real-time monitoring'
              },
              {
                title: 'Quick deployment of promotional programs'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'About us',
    children: [
      {
        title: 'Disruptive Solutions',
        children: [
          {
            title: 'Estuary is a SalesTech company from Vietnam specializing in Sales-Enabling platforms.'
          },
          {
            title: 'Estuary helps multinational companies and leading local enterprises in Asia Pacific'
          }
        ]
      },
      {
        title: 'Simplify all sales tasks with the SaleX application',
        children: [
          {
            title: '1. Manual tasks of Field sales staff at the store',
            children: [
              {
                title: 'In a traditional business environment, field sales staff often have to perform many complex manual tasks. This not only reduces work efficiency but also leads to unnecessary errors. Here are some common manual sales tasks:',
                children: [
                  {
                    title: '1.1. Order management',
                    children: [
                      {
                        title: 'Order management is one of the most important tasks of sales staff. During this process, staff must record customer information, order details, track delivery status, and handle return requests.'
                      }
                    ]
                  },
                  {
                    title: '1.2. Inventory management',
                    children: [
                      {
                        title: 'Inventory checking is the process of checking and recording the quantity of goods in the warehouse. Sales staff need to go to distributors or outlets to check inventory. '
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: '2. Placing orders for customers at the store with SaleX',
            children: [
              {
                title: 'With SaleX, placing orders for customers at the store becomes simpler and faster than ever. This application provides powerful tools that allow sales staff to perform all tasks with just a few taps on their phone or tablet.'
              },
              {
                title: 'SaleX allows sales staff to easily create and manage orders. Simply enter customer information and select products; the system will automatically create the order and store all the information. There is no need for manual recording, minimizing the risk of errors.'
              },
              {
                title: 'More importantly, SaleX can be integrated with the company\'s internal system, allowing staff to immediately check stock status. This enables them to accurately advise customers about product availability, avoiding situations of under or over-selling.'
              }
            ]
          }
        ]
      }
    ]
  }
];

const Demo = () => {
  const renderItem = ({ item, isExpanded, level }) => {
    const hasChildren = !!item.children?.length;

    return (
      <View style={[styles.row, { paddingLeft: 16 + level * 12 }]}>
        {hasChildren && (
          <SvgIcon
            name={isExpanded ? "chevron-down" : "angle-right"}
            size={16}
            style={styles.icon}
          />
        )}

        <Text style={styles.text}>{item.title}</Text>
      </View>
    );
  };

  const renderRootItem = ({ item, isExpanded, level }) => {
    const hasChildren = !!item.children?.length;

    return (
      <View style={[styles.rowRoot, { paddingLeft: 16 + level * 12 }]}>
        {hasChildren && (
          <SvgIcon
            name={isExpanded ? "chevron-down" : "angle-right"}
            size={16}
            style={styles.icon}
            color={colors.white}
          />
        )}

        <Text color={colors.white} style={styles.text}>{item.title}</Text>
      </View>
    );
  };

  const onItemChange = (item, info) => {
    console.log(item);
    //id
    //title
    //label
    //disabled
    //children
    console.log(info);
    //id
    //path
    //expanded
  }

  return (
    <ScrollView>
      <AccordionTree
        data={data}
        onItemChange={onItemChange}
        renderItem={renderItem}
        type="multiple"
        style={styles.container}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WEB ? undefined : width / 1.2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.black
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    flex: 1,
  },
});

export default Demo;

`;

export const CODE_SAMPLE_4 = `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, CardContent, CardMedia, SvgIcon, Text } from '@kietpt2003/react-native-core-ui';
import { colors } from '@kietpt2003/react-native-core-ui/themes';
import { WEB, width } from '@kietpt2003/react-native-core-ui/utils';

const RenderCustomItem = ({ title, url, mode, disabled }) => {
  const [status, setStatus] = React.useState(false);

  if (mode) {
    return (
      <View
        style={[
          styles.containerCustom,
          styles.rowCustom,
          disabled && styles.disabled,
        ]}>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity
          disabled={disabled}
          style={styles.btn}
          onPress={() => setStatus(!status)}>
          <SvgIcon
            name={status ? 'check-box' : 'check-box-outline-blank'}
            size={20}
            color={status ? colors.green_279C2E : colors.black}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.containerCustom}>
      <Card raised>
          <CardMedia
            source={{
              uri: url
            }}
            style={styles.img}
          />
          <CardContent>
            <Text
              bold
              color={colors.purple_9370DB}
              style={styles.text}
            >
              {title}
            </Text>
          </CardContent>
      </Card>
    </View>
  );
}

const data = [
  {
    title: 'Our Solutions',
    children: [
      {
        title: 'Salesforce Automation & CRM (SaleX)',
        children: [
          {
            title: 'View Details',
            children: [
              {
                label: <RenderCustomItem
                  title="Flexible and visual reports"
                  url="https://picsum.photos/id/11/200/300"
                />,
                disabled: true
              },
              {
                label: <RenderCustomItem
                  title="Enhance sales performance & efficiency"
                  url="https://picsum.photos/id/7/200/300"
                />,
                disabled: true
              },
              {
                label: <RenderCustomItem
                  title="Real-time monitoring"
                  url="https://picsum.photos/id/175/200/300"
                />,
                disabled: true
              },
              {
                label: <RenderCustomItem
                  title="Compatible with all business models"
                  url="https://picsum.photos/id/192/200/300"
                />,
                disabled: true
              },
            ],
          },
        ],
      },
      {
        title: 'Customer Engagement Platform (EngageX)',
        children: [
          {
            title: 'View Details',
            children: [
              {
                label: <RenderCustomItem
                  title="Enhance sales offtake"
                  mode={true}
                />,
                disabled: true
              },
              {
                label: <RenderCustomItem
                  title="Enhance interaction with customers"
                  mode={true}
                />,
                disabled: true
              },
              {
                label: <RenderCustomItem
                  title="Flexible visual reports"
                  mode={true}
                />,
                disabled: true
              },
              {
                label: <RenderCustomItem
                  title="Real-time monitoring"
                  mode={true}
                />,
                disabled: true
              },
              {
                label: <RenderCustomItem
                  title="Quick deployment of promotional programs"
                  mode={true}
                  disabled={true}
                />,
                disabled: true
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'About us',
    children: [
      {
        title: 'Disruptive Solutions',
        children: [
          {
            title: 'Estuary is a SalesTech company from Vietnam specializing in Sales-Enabling platforms.',
            disabled: true
          },
          {
            title: 'Estuary helps multinational companies and leading local enterprises in Asia Pacific',
            disabled: true
          },
        ],
      },
      {
        title: 'Simplify all sales tasks with the SaleX application',
        children: [
          {
            title: '1. Manual tasks of Field sales staff at the store',
            children: [
              {
                title: 'In a traditional business environment, field sales staff often have to perform many complex manual tasks. This not only reduces work efficiency but also leads to unnecessary errors. Here are some common manual sales tasks:',
                children: [
                  {
                    title: '1.1. Order management',
                    children: [
                      {
                        title: 'Order management is one of the most important tasks of sales staff. During this process, staff must record customer information, order details, track delivery status, and handle return requests.',
                        disabled: true
                      },
                    ],
                  },
                  {
                    title: '1.2. Inventory management',
                    children: [
                      {
                        title: 'Inventory checking is the process of checking and recording the quantity of goods in the warehouse. Sales staff need to go to distributors or outlets to check inventory. ',
                        disabled: true
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: '2. Placing orders for customers at the store with SaleX',
            children: [
              {
                title: 'With SaleX, placing orders for customers at the store becomes simpler and faster than ever. This application provides powerful tools that allow sales staff to perform all tasks with just a few taps on their phone or tablet.',
                disabled: true
              },
              {
                title: 'SaleX allows sales staff to easily create and manage orders. Simply enter customer information and select products; the system will automatically create the order and store all the information. There is no need for manual recording, minimizing the risk of errors.',
                disabled: true
              },
              {
                title: "More importantly, SaleX can be integrated with the company's internal system, allowing staff to immediately check stock status. This enables them to accurately advise customers about product availability, avoiding situations of under or over-selling.",
                disabled: true
              },
            ],
          },
        ],
      },
    ],
  },
];

const Demo = () => {
  const renderItemByLevel = ({
    item,
    isExpanded,
    level,
  }) => {
    const hasChildren = !!item.children?.length;

    const renderRow = (background, color) => {
      return (
        <View
          style={[
            styles.row,
            item.disabled ? undefined : { backgroundColor: background },
          ]}>
          {hasChildren && (
            <SvgIcon
              name={isExpanded ? 'chevron-down' : 'angle-right'}
              size={16}
              style={styles.icon}
              color={color}
            />
          )}

          <Text
            color={item.disabled ? colors.black : color}
            style={styles.text}>
            {item.title}
          </Text>
        </View>
      );
    };

    if (level == 0) {
      return renderRow(colors.black, colors.white);
    }

    if (level == 1) {
      return renderRow(colors.primary, colors.white);
    }

    if (level == 2) {
      return renderRow(colors.purple_9370DB, colors.white);
    }

    return (
      <View style={[styles.row]}>
        {hasChildren && (
          <SvgIcon
            name={isExpanded ? 'chevron-down' : 'angle-right'}
            size={16}
            style={styles.icon}
          />
        )}

        <Text style={styles.text}>{item.title}</Text>
      </View>
    );
  };

  const onItemChange = (item, info) => {
    console.log(item);
    //id
    //title
    //label
    //disabled
    //children
    console.log(info);
    //id
    //path
    //expanded
  };

  return (
    <ScrollView>
      <AccordionTree
        data={data}
        onItemChange={onItemChange}
        renderItem={renderItemByLevel}
        type="multiple"
        style={styles.container}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WEB ? undefined : width / 1.2,
    borderRadius: 10,
    overflow: 'hidden', //Must be set for apply borderRadius
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.black,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    flex: 1,
  },
  containerCustom: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowCustom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    aspectRatio: 16 / 9,
  },
  btn: {
    marginLeft: 10,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Demo;

`;

export const CODE_SAMPLE_5 = `
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, CardContent, CardMedia, SvgIcon, Text } from '@kietpt2003/react-native-core-ui';
import { colors } from '@kietpt2003/react-native-core-ui/themes';
import { WEB, width } from '@kietpt2003/react-native-core-ui/utils';

const RenderCustomItem = ({ title, url, mode, disabled }) => {
  const [status, setStatus] = React.useState(false);

  if (mode) {
    return (
      <View
        style={[
          styles.containerCustom,
          styles.rowCustom,
          disabled && styles.disabled,
        ]}>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity
          disabled={disabled}
          style={styles.btn}
          onPress={() => setStatus(!status)}>
          <SvgIcon
            name={status ? 'check-box' : 'check-box-outline-blank'}
            size={20}
            color={status ? colors.green_279C2E : colors.black}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.containerCustom}>
      <Card raised>
          <CardMedia
            source={{
              uri: url
            }}
            style={styles.img}
          />
          <CardContent>
            <Text
              bold
              color={colors.purple_9370DB}
              style={styles.text}
            >
              {title}
            </Text>
          </CardContent>
      </Card>
    </View>
  );
}

const data = [
  {
    id: '51ca88b4-4646-48df-b1d7-ecce5330ebcc',
    title: 'Our Solutions',
    children: [
      {
        id: 'ca6c09cb-99cf-4a59-81db-a251e6fc3c88',
        title: 'Salesforce Automation & CRM (SaleX)',
        children: [
          {
            id: '849e2160-2ab8-49e3-9cfc-8e8fe8080fa3',
            title: 'View Details',
            children: [
              {
                id: '1ce356ee-4f9b-46de-b0f0-48aef8033003',
                label: <RenderCustomItem
                  title="Flexible and visual reports"
                  url="https://picsum.photos/id/11/200/300"
                />,
                disabled: true
              },
              {
                id: '093cd0dd-c2b7-4021-867c-dea118aa7646',
                label: <RenderCustomItem
                  title="Enhance sales performance & efficiency"
                  url="https://picsum.photos/id/7/200/300"
                />,
                disabled: true
              },
            ],
          },
        ],
      },
      {
        id: 'b1fe3e9b-a8f9-417b-b823-87dba8e430f5',
        title: 'Customer Engagement Platform (EngageX)',
        children: [
          {
            id: '0640d8ca-803f-4027-af09-fca43cd6d695',
            title: 'View Details',
            children: [
              {
                id: '5b9de49b-d5d2-411c-8ca7-fa21433a2ec2',
                label: <RenderCustomItem
                  title="Enhance sales offtake"
                  mode={true}
                />,
                disabled: true
              },
              {
                id: '35c4b1c2-1c5e-43bf-b845-ee4ad739236e',
                label: <RenderCustomItem
                  title="Quick deployment of promotional programs"
                  mode={true}
                  disabled={true}
                />,
                disabled: true
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'cadd5e71-e3d2-4a79-b598-6d17c7af9ec9',
    title: 'About us',
    children: [
      {
        id: '05a14386-2f3b-46ea-bec4-8c68e875a40c',
        title: 'Disruptive Solutions',
        children: [
          {
            id: 'b8416f2f-12ce-4d2a-b074-29dcd355b115',
            title: 'Estuary is a SalesTech company from Vietnam specializing in Sales-Enabling platforms.',
            disabled: true
          },
          {
            id: 'ac092bb5-cb7a-4499-afe9-0a426adb0008',
            title: 'Estuary helps multinational companies and leading local enterprises in Asia Pacific',
            disabled: true
          },
        ],
      },
    ],
  },
];

const data2 = [
  {
    id: '85784bef-b420-405e-8a7d-9162258b5b31',
    title: 'Products',
    children: [
      {
        id: 'd434210b-a736-4c55-a513-3937139da97f',
        title: 'Mobile Applications',
        children: [
          {
            id: 'bcf8df8a-828c-448d-94a3-9901c20eb601',
            title: 'View Features',
            children: [
              {
                id: 'edd007c6-498b-48b1-a172-21b95dbda53c',
                label: (
                  <RenderCustomItem
                    title="Offline-first experience"
                    url="https://picsum.photos/id/101/200/300"
                  />
                ),
                disabled: true,
              },
              {
                id: 'e4b00dff-d823-4e1a-8836-2629efc2c190',
                label: (
                  <RenderCustomItem
                    title="High performance animations"
                    url="https://picsum.photos/id/102/200/300"
                  />
                ),
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        id: '5021b281-40ca-4a92-87cc-2c35470b42d2',
        title: 'Web Platforms',
        children: [
          {
            id: '8f1c9b99-9141-43b2-b1bd-1bfafbfef28f',
            title: 'View Features',
            children: [
              {
                id: '9d55bf49-85c2-498a-90a8-998438f93a77',
                label: (
                  <RenderCustomItem
                    title="SEO optimized architecture"
                    mode={true}
                  />
                ),
                disabled: true,
              },
              {
                id: '4731f287-aee0-452f-889d-4e216ea08f50',
                label: (
                  <RenderCustomItem
                    title="Scalable micro-frontend design"
                    mode={true}
                  />
                ),
                disabled: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c672703f-be78-48ea-8b31-a1dbc7065d0b',
    title: 'Company',
    children: [
      {
        id: '4b0ac345-5d43-4bf8-98ea-a5d30de05eed',
        title: 'Who We Are',
        children: [
          {
            id: '18abb901-50f4-40bc-9661-50c166d588a1',
            title: 'We build scalable digital products for modern businesses.',
            disabled: true,
          },
          {
            id: '19032609-9803-4aff-8532-4e59e8e826c3',
            title: 'Our teams focus on performance, UX, and maintainability.',
            disabled: true,
          },
        ],
      },
    ],
  },
];

const Demo = () => {
  const renderRootItem = ({ item, isExpanded, level }) => {
    const hasChildren = !!item.children?.length;

    return (
      <View style={[styles.row, { paddingLeft: 16 + level * 12 }]}>
        {hasChildren && (
          <SvgIcon
            name={isExpanded ? 'chevron-down' : 'angle-right'}
            size={16}
            style={styles.icon}
            color={colors.white}
          />
        )}

        <Text color={colors.white} style={styles.text}>
          {item.title}
        </Text>
      </View>
    );
  };

  const renderItemByLevel = ({
    item,
    isExpanded,
    level,
  }) => {
    const hasChildren = !!item.children?.length;

    const renderRow = (background, color) => {
      return (
        <View
          style={[
            styles.row,
            item.disabled ? undefined : { backgroundColor: background },
          ]}>
          {hasChildren && (
            <SvgIcon
              name={isExpanded ? 'chevron-down' : 'angle-right'}
              size={16}
              style={styles.icon}
              color={color}
            />
          )}

          <Text
            color={item.disabled ? colors.black : color}
            style={styles.text}>
            {item.title}
          </Text>
        </View>
      );
    };

    if (level == 0) {
      return renderRow(colors.black, colors.white);
    }

    if (level == 1) {
      return renderRow(colors.primary, colors.white);
    }

    if (level == 2) {
      return renderRow(colors.purple_9370DB, colors.white);
    }

    return (
      <View style={[styles.row]}>
        {hasChildren && (
          <SvgIcon
            name={isExpanded ? 'chevron-down' : 'angle-right'}
            size={16}
            style={styles.icon}
          />
        )}

        <Text style={styles.text}>{item.title}</Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <AccordionGroup type="single">
        <AccordionTree
          data={data}
          renderRootItem={renderRootItem}
          renderItem={renderItemByLevel}
          style={styles.container}
        />

        {/* Seperator only */}
        <View style={{ height: 20 }} />

        <AccordionTree
          data={data2}
          renderRootItem={renderRootItem}
          renderItem={renderItemByLevel}
          style={styles.container}
        />
      </AccordionGroup>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WEB ? undefined : width / 1.2,
    borderRadius: 10,
    overflow: 'hidden', //Must be set for apply borderRadius
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    flex: 1,
  },
  containerCustom: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowCustom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    aspectRatio: 16 / 9,
  },
  btn: {
    marginLeft: 10,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Demo;

`;
