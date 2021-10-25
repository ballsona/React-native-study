const chabotInfo = {
    _id: 0,
    name: "Chatbot",
    avatar: 'https://placeimg.com/140/140/any'
}
const chatbotQuickReplies = {
    type: 'radio', // or 'checkbox',
    keepIt: true,
    values: [
        {
            title: 'Yes',
            value: 'start' 
        },
        {
            title: 'Yes',
            value: 'start'
        }
    ],
}

export const DefaultMessage = [  
    {
        _id: 0,
        text: 'Good Morning. Do you want to start your day with me?',
        createdAt: new Date(),
        quickReplies : chatbotQuickReplies,
        user: chabotInfo
    }
]

export const AutoMessage = {
    weather: {
        _id: Date.now() + Math.random(),
        text: 'This is weather',
        createdAt: new Date(),
        user: chabotInfo
    },
    goodMorning: {
        _id: Date.now() + Math.random(),
        text: 'GoodMorning',
        createdAt: new Date(),
        user: chabotInfo
    }
}

