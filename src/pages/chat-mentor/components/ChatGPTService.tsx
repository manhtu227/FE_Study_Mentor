// ChatGPTService.js
// File này test trước sau này sửa sau
import axios from 'axios';

const API_KEY = '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';

const sendMessageToChatGPT = async (message: string) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
            },
        );

        // Lấy câu trả lời từ response
        const answer = response.data.choices[0].message.content;
        return answer;
    } catch (error) {
        console.error('Error sending request to ChatGPT:', error);
        return 'Error occurred while processing your request.';
    }
};

export default sendMessageToChatGPT;
