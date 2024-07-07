<h1 align="center">Welcome to @notetube 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

# NoteTube

NoteTube is a web application that generates summarized notes based on YouTube video URLs provided by users. It uses the ChatGPT API to create concise and comprehensive summaries, making it easier for users to grasp the main points and ideas from YouTube videos quickly and efficiently.

## Features

- **No installations or setup**: Simply provide a YouTube video URL to get instant summarized notes without the need for any software installations or complex setups.
- **Free of Charge**: Enjoy the convenience of generating summarized notes from YouTube videos at no cost, making learning accessible for everyone.
- **One-click AI summary**: Get concise and comprehensive notes with a single click, leveraging the power of ChatGPT to summarize YouTube videos efficiently.
- **Customizable Chat**: Users can interact with the YouTube information for a customized experience, asking specific questions and getting detailed responses.
- **Quick Prompts**: Use predefined prompts to generate detailed summaries, key takeaways, bullet point highlights, main points, and quick reviews.

## Getting Started

### Prerequisites

- Node.js
- pnpm
- A ChatGPT API key

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/NoteTUBE.git
    cd notetube
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

### Running the Application

1. Start both frontend and backend server's:

    ```bash
    pnpm start
    ```

2. Open your browser and navigate to `http://localhost:9000`.

### Deployment

NoteTube is deployed on Vercel (frontend) and Render (backend) for continuous integration and deployment.

## API Endpoints

### Summary Endpoint

- **URL**: `/api/summary/generate?videoId=1234567`
- **Method**: `POST`
- **Description**: Generates and stream the summary for the provided YouTube video URL.


### Chat Endpoint

- **URL**: `/api/summary/chat?videoId=123456&prompt=What are the key takeaways?`
- **Method**: `POST`
- **Description**: Allows users to interact with the YouTube information for a customized experience.

![Quick Prompts Section](image.png)

## Quick Prompts

NoteTube offers several predefined prompts to help users quickly generate different types of summaries:

- ✨ Generate detailed summary
- 📜 Generate detailed summary with citations
- 📄 Generate key takeaways
- 🔗 Generate bullet point highlights
- 📋 Extract main points and ideas
- 📝 Summarize video for quick review

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [OpenAI](https://openai.com/) for providing the ChatGPT API.
- The various open-source libraries and frameworks that make this project possible.

## Contact

For any inquiries or support, please contact [riyacec05@gmail.com](mailto:riyacec05@gmail.com).


## Author

👤 **riyacec05@gmail.com**