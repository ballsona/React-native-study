# Chatbot Flow

---

- Morning Version

| id  |                        content                         |       A-Type       | trigger |
| :-: | :----------------------------------------------------: | :----------------: | :-----: |
|  1  | Good morning! Are you ready to start you day with you? |  quickReply(Yes)   |    2    |
|  2  |                       [Weather]                        |  quickReply(Yes)   |    3    |
|  3  |             What're you going to do today?             |     text(save)     |    4    |
|  4  |                What's your To-do today?                |     text(save)     |    5    |
|  5  |                  Ok. Have a good day!                  | quickReply(seeyou) |   end   |
| 5-1 |                      Random Text                       | quickReply(seeyou) |   end   |

- Night Version

| id  |                      content                      |     A-Type      | trigger |
| :-: | :-----------------------------------------------: | :-------------: | :-----: |
|  1  | Long time No see.. Are you ready to end your day? | quickReply(Yes) |    2    |
|  2  |                Today's your point?                |      text       |    3    |
|  3  |                    Check Todo                     | quickReply(..?) |    4    |
|  4  |                 See you Tommorow.                 | quickReply(..?) |    5    |
