const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/sendMessage', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('https://api-bcbe5a.stack.tryrelevance.com/latest/studios/1d007fc6-571c-4ab7-bb52-9c6e5c26e622/trigger_limited', {
            params: {
                text: message
            },
            project: '168641cfe7b3-45d9-b0b7-c3beb7915315'
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '168641cfe7b3-45d9-b0b7-c3beb7915315:sk-NGJkMTNkN2QtNzNmOC00OWM2LTgzODMtOGJkZmZmY2RlMjVk'
            }
        });

        // Enviar la respuesta de vuelta al cliente
        res.json(response.data);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Error sending message' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
