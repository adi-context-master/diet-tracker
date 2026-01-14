export const dietPlan = [
    {
        id: 'morning',
        time: '7:00 AM',
        title: 'Morning Detox Water',
        items: [
            {
                id: 'detox-morning',
                name: 'Detox Water (200ml)',
                description: 'Sabut Methi, Jeera, Ajwain, Elaichi - soaked overnight, boiled 2-3 min'
            }
        ]
    },
    {
        id: 'early-morning',
        time: '7:30-8:30 AM',
        title: 'Early Morning',
        items: [
            {
                id: 'beverage',
                name: 'Beverage',
                description: 'Green tea / Blue tea / Black coffee'
            },
            {
                id: 'nuts',
                name: 'Nuts & Seeds',
                description: 'Almonds (3-4) + Walnut (1) + Mixed seeds (1 tsp)'
            }
        ]
    },
    {
        id: 'hydration-1',
        time: '9:00 AM',
        title: 'Hydration Cycle',
        items: [
            {
                id: 'detox-water-1',
                name: 'Detox Water (1L over hours)',
                description: 'Lemon, mint, cinnamon, elaichi - 1 glass/hour'
            }
        ]
    },
    {
        id: 'breakfast',
        time: '11:00 AM',
        title: 'Breakfast',
        items: [
            {
                id: 'fruit-bowl',
                name: 'Fruit Bowl (200-250g)',
                description: 'Papaya, Pineapple, Kiwi, Orange, Guava, or Pear'
            }
        ]
    },
    {
        id: 'hydration-2',
        time: '12:00 PM',
        title: 'Hydration',
        items: [
            {
                id: 'detox-water-2',
                name: 'Detox Water',
                description: 'Continue hourly detox water'
            }
        ]
    },
    {
        id: 'midday',
        time: '1:00 PM',
        title: 'Midday Salad',
        items: [
            {
                id: 'salad',
                name: 'Salad',
                description: 'Onion, cucumber, tomato'
            }
        ]
    },
    {
        id: 'lunch',
        time: '2:00 PM',
        title: 'Lunch',
        items: [
            {
                id: 'lunch-main',
                name: 'Main Course',
                description: 'Besan/Oats Cheela OR Quinoa Bowl OR Chicken (100-200g) with salad'
            }
        ]
    },
    {
        id: 'hydration-3',
        time: '4:00 PM',
        title: 'Hydration',
        items: [
            {
                id: 'detox-water-3',
                name: 'Detox Water',
                description: 'Continue detox water'
            }
        ]
    },
    {
        id: 'evening-snack',
        time: '5:00 PM',
        title: 'Evening Snack',
        items: [
            {
                id: 'black-coffee',
                name: 'Black Coffee',
                description: '1 cup'
            },
            {
                id: 'evening-nuts',
                name: 'Snack',
                description: 'Nuts & seeds OR Makhana (15-20 pcs)'
            }
        ]
    },
    {
        id: 'activity',
        time: '6:00-7:00 PM',
        title: 'Physical Activity',
        items: [
            {
                id: 'walking-1',
                name: 'Walking',
                description: '30 minutes'
            },
            {
                id: 'exercise',
                name: 'Exercise',
                description: '15-30 minutes'
            }
        ]
    },
    {
        id: 'dinner',
        time: '7:30-8:00 PM',
        title: 'Dinner',
        items: [
            {
                id: 'dinner-main',
                name: 'Dinner',
                description: 'Vegetable Oats/Dalia OR Vegetable Khichdi (70% vegetables)'
            }
        ]
    },
    {
        id: 'post-dinner',
        time: '8:30 PM+',
        title: 'Post Dinner',
        items: [
            {
                id: 'walking-2',
                name: 'Post-dinner Walk',
                description: '30 minutes'
            },
            {
                id: 'detox-night',
                name: 'Optional Detox Water',
                description: 'Methi-jeera water (200ml)'
            }
        ]
    }
];

export const getTotalItems = () => {
    return dietPlan.reduce((total, section) => total + section.items.length, 0);
};
