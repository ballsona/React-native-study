const chabotInfo = {
    _id: 0,
    name: "Chatbot",
    avatar: 'https://placeimg.com/140/140/any'
}
const morningQR = {
    type: 'radio', // or 'checkbox',
    keepIt: true,
    values: [
        {
            title: 'Yes',
            value: 'morning_YES'  
        },
        {
            title: 'no',
            value: 'no'
        }
    ],
}

export const morningM = [  
    {
        _id: 0,
        text: 'Good Morning. Do you want to start your day with me?',
        createdAt: new Date(),
        quickReplies : morningQR,
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
    },
    dayPlan: {
         _id: Date.now() + Math.random(),
        text: 'What are you going to do today?',
        createdAt: new Date(),
        user: chabotInfo
    }
}

