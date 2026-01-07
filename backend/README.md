# Backend - AI Prediction Service

This is the FastAPI backend for the AI Prediction application, developed as a core part of my Deep Learning research and learning phase. It handles image uploads and runs inference using pre-trained frameworks, bridging neural network theory with real-world API implementation.

## Tech Stack

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white)

## Project Structure

```text
backend/
├── assets/             # Model and JSON data files
│   ├── models/         # Trained .h5 models
│   └── json_files/     # Label mapping files
├── uploads/            # Temporary directory for uploaded images
├── main.py             # FastAPI application entry point
└── requirements.txt     # Python package dependencies
```

## API Endpoints

### POST `/predict`
- **Description**: Accepts an image file and a model name to perform prediction.
- **Parameters**:
  - `model_name` (Form): The name of the model to use (e.g., `leaf_prediction`, `bone`).
  - `file` (File): The image file for prediction.
- **Response**: JSON containing the prediction result.

## Setup & Run

### 1. Download Models
The `.h5` model files are hosted on Google Drive.
- **Link**: [Download Models from Google Drive](https://drive.google.com/drive/folders/1ohIzeDP-6v0QZVDW_W2b_HOz1DjFz8wb?usp=sharing)

### 2. Directory Setup
Ensure the models are placed in the correct directory:
```bash
mkdir -p assets/models
# Place the downloaded .h5 files here
```

### 3. Installation & Execution
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Start the server:
   ```bash
   python main.py
   ```
