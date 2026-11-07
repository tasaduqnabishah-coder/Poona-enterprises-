export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price (Base or Sale Price)',
      hidden: ({document}: any) => document?.type === 'rent',
      validation: (Rule: any) => Rule.custom((price: any, context: any) => {
        if (context.document.type === 'sale' && price === undefined) {
          return 'Price is required for sale items';
        }
        return true;
      }),
    },
    {
      name: 'rentalPrices',
      type: 'object',
      title: 'Rental Pricing Breakdown (Total Rent ₹)',
      description: 'Enter the total rent for each tenure (e.g. ₹600 for 1 Mo, ₹3600 for 6 Mo). The website will automatically compute and show the monthly breakdown.',
      hidden: ({document}: any) => document?.type !== 'rent',
      fields: [
        { name: 'oneMonth', type: 'number', title: '1 Month Total Rent (₹)' },
        { name: 'twoMonths', type: 'number', title: '2 Months Total Rent (₹)' },
        { name: 'threeMonths', type: 'number', title: '3 Months Total Rent (₹)' },
        { name: 'fourMonths', type: 'number', title: '4 Months Total Rent (₹)' },
        { name: 'fiveMonths', type: 'number', title: '5 Months Total Rent (₹)' },
        { name: 'sixMonths', type: 'number', title: '6 Months Total Rent (₹)' },
      ],
    },
    {
      name: 'deposit',
      type: 'number',
      title: 'Security Deposit (Refundable ₹)',
      description: 'Refundable security deposit collected at delivery (e.g. ₹1000). Set to 0 or leave blank for zero deposit.',
      hidden: ({document}: any) => document?.type !== 'rent',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Electronics', value: 'electronics' },
          { title: 'Furniture', value: 'furniture' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          { title: 'Rent', value: 'rent' },
          { title: 'Sale', value: 'sale' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Product Image (Main Thumbnail)',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gallery',
      type: 'array',
      title: 'Image Gallery',
      description: 'Upload additional photos of the product here',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ]
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'specifications',
      type: 'array',
      title: 'Technical Specifications',
      description: 'Add specifications like Brand, Dimensions, Capacity, Color, etc.',
      of: [
        {
          type: 'object',
          title: 'Specification',
          name: 'specification',
          fields: [
            { name: 'label', type: 'string', title: 'Label (e.g., Brand, Capacity)' },
            { name: 'value', type: 'string', title: 'Value (e.g., LG, 655 Litres)' }
          ]
        }
      ]
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: () => new Date().toISOString(),
    },
  ],
};
