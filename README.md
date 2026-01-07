# AI Vision Discovery: Deep Learning Research & Image Prediction

This repository serves as a comprehensive playground for my exploration into Deep Learning and Computer Vision. Developed during my intensive study of neural network architectures, this project demonstrates the practical application of various models for image classification and medical imaging analysis.

The project integrates a **FastAPI** backend with a modern **React** frontend to provide a seamless interface for testing specialized models—ranging from agricultural leaf pathology to medical X-ray interpretation.

![CNN Architecture](./gif/CNN.gif)

## Technical Stack

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white)

## Project Structure

```text
.
├── backend/                # FastAPI backend source code
│   ├── assets/             # Model and JSON data files
│   │   ├── models/         # Trained .h5 models
│   │   └── json_files/     # Label mapping files
│   ├── uploads/            # Directory for uploaded images
│   ├── main.py             # Backend entry point
│   └── requirements.txt     # Python dependencies
├── frontend/               # React (Vite) frontend application
│   ├── src/                # Frontend source code
│   └── package.json        # Frontend dependencies
└── README.md               # Project documentation
```

## Getting Started

### 1. Model Download & Setup

Due to the size of the trained neural networks, the `.h5` model files are hosted on Google Drive.

1. **Download Models**: [Download Models from Google Drive](https://drive.google.com/drive/folders/1ohIzeDP-6v0QZVDW_W2b_HOz1DjFz8wb?usp=sharing)
2. **Prepare Directory**: Inside the `backend` folder, ensure the following structure exists:
   ```bash
   mkdir -p backend/assets/models
   ```
3. **Place Models**: Move the downloaded `.h5` files into the `backend/assets/models/` directory.

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   python main.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## License

[MIT](https://choosealicense.com/licenses/mit/)
