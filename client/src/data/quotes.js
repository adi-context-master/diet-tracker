export const motivationalQuotes = [
    {
        quote: "Take care of your body. It's the only place you have to live.",
        author: "Jim Rohn"
    },
    {
        quote: "The groundwork for all happiness is good health.",
        author: "Leigh Hunt"
    },
    {
        quote: "Your diet is a bank account. Good food choices are good investments.",
        author: "Bethenny Frankel"
    },
    {
        quote: "Don't dig your grave with your own knife and fork.",
        author: "English Proverb"
    },
    {
        quote: "Eat breakfast like a king, lunch like a prince and dinner like a pauper.",
        author: "Adelle Davis"
    },
    {
        quote: "The only bad workout is the one that didn't happen.",
        author: "Unknown"
    },
    {
        quote: "Health is not about the weight you lose, but about the life you gain.",
        author: "Dr. Josh Axe"
    },
    {
        quote: "Success is the sum of small efforts repeated day in and day out.",
        author: "Robert Collier"
    },
    {
        quote: "Every journey begins with a single step.",
        author: "Lao Tzu"
    },
    {
        quote: "The food you eat can be either the safest medicine or the slowest poison.",
        author: "Ann Wigmore"
    },
    {
        quote: "Discipline is choosing between what you want now and what you want most.",
        author: "Abraham Lincoln"
    },
    {
        quote: "A healthy outside starts from the inside.",
        author: "Robert Urich"
    },
    {
        quote: "Small progress is still progress.",
        author: "Unknown"
    },
    {
        quote: "You don't have to be extreme, just consistent.",
        author: "Unknown"
    },
    {
        quote: "Weight loss is not a physical challenge, it's a mental one.",
        author: "Unknown"
    },
    {
        quote: "It's not about perfect. It's about effort.",
        author: "Jillian Michaels"
    },
    {
        quote: "One day or day one. You decide.",
        author: "Unknown"
    },
    {
        quote: "Your body hears everything your mind says. Stay positive.",
        author: "Unknown"
    },
    {
        quote: "Strive for progress, not perfection.",
        author: "Unknown"
    },
    {
        quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb"
    },
    {
        quote: "Nothing tastes as good as healthy feels.",
        author: "Unknown"
    },
    {
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        quote: "When you feel like quitting, think about why you started.",
        author: "Unknown"
    },
    {
        quote: "Your health is an investment, not an expense.",
        author: "Unknown"
    },
    {
        quote: "Make yourself a priority. Fill your cup first.",
        author: "Unknown"
    },
    {
        quote: "Slow progress is better than no progress.",
        author: "Unknown"
    },
    {
        quote: "The pain you feel today will be the strength you feel tomorrow.",
        author: "Unknown"
    },
    {
        quote: "You are what you eat, so don't be fast, cheap, easy, or fake.",
        author: "Unknown"
    },
    {
        quote: "Good things come to those who sweat.",
        author: "Unknown"
    },
    {
        quote: "Push yourself because no one else is going to do it for you.",
        author: "Unknown"
    }
];

export const getQuoteForDate = (dateStr) => {
    // Use date to generate consistent quote for each day
    const date = new Date(dateStr);
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const index = dayOfYear % motivationalQuotes.length;
    return motivationalQuotes[index];
};
