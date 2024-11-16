export const COLORS = [
    {
        name: 'Black',
        value: 'black',
        bg: 'bg-zinc-900',
        border: 'border-zinc-900',
    },
    {
        name: 'Orange',
        value: 'orange',
        bg: 'bg-orange-700',
        border: 'border-orange-700',
    },
    {
        name: 'Amber',
        value: 'amber',
        bg: 'bg-amber-700',
        border: 'border-amber-700',
    },
    {
        name: 'Yellow',
        value: 'yellow',
        bg: 'bg-yellow-700',
        border: 'border-yellow-700',
    },
    {
        name: 'Lime',
        value: 'lime',
        bg: 'bg-lime-600',
        border: 'border-lime-600',
    },
    {
        name: 'Emerald',
        value: 'emerald',
        bg: 'bg-emerald-700',
        border: 'border-emerald-700',
    },
    {
        name: 'Teal',
        value: 'teal',
        bg: 'bg-teal-700',
        border: 'border-teal-700',
    },
    {
        name: 'Blue',
        value: 'blue',
        bg: 'bg-blue-950',
        border: 'border-blue-950',
    },
    {
        name: 'Purple',
        value: 'purple',
        bg: 'bg-purple-900',
        border: 'border-purple-900',
    },
    {
        name: 'Rose',
        value: 'rose',
        bg: 'bg-rose-800',
        border: 'border-rose-800',
    },
] as const;

export const MODELS = {
    name: 'models',
    options: [
        {
            name: 'iPhone X',
            value: 'iphonex',
        },
        {
            name: 'iPhone 11',
            value: 'iphone11',
        },
        {
            name: 'iPhone 12',
            value: 'iphone12',
        },
        {
            name: 'iPhone 13',
            value: 'iphone13',
        },
        {
            name: 'iPhone 14',
            value: 'iphone14',
        },
        {
            name: 'iPhone 15',
            value: 'iphone15',
        },
        {
            name: 'iPhone 16',
            value: 'iphone16',
        },
    ],
} as const;

export const PRODUCT_PRICES = {
    material: {
        silicone: 0,
        polycarbonate: 5_00,
    },
    finish: {
        smooth: 0,
        textured: 5_00,
    },
} as const;

export const BASE_PRICE = 14_00;

export const MATERIALS = {
    name: 'material',
    options: [
        {
            label: 'Silicone',
            value: 'silicone',
            description: 'Soft and flexible PU case',
            price: PRODUCT_PRICES.material.silicone,
        },
        {
            label: 'Soft Polycarbonate',
            value: 'polycarbonate',
            description: 'Scratch-resistant coating',
            price: PRODUCT_PRICES.material.polycarbonate,
        },
    ],
} as const;

export const FINISHES = {
    name: 'finish',
    options: [
        {
            label: 'Smooth Finish',
            value: 'smooth',
            description: 'Smooth finish',
            price: PRODUCT_PRICES.finish.smooth,
        },
        {
            label: 'Textured Finish',
            value: 'textured',
            description: 'Soft grippy texture',
            price: PRODUCT_PRICES.finish.textured,
        },
    ],
} as const;
