import React, { useState, useRef } from 'react';
import './MainPage.css';

const linkedInUrl = 'https://www.linkedin.com/in/aswin-raj-r-3002ar/';
const githubUrl = 'https://github.com/Aswin-RajR/aswin-rajr';

const models = [
  { key: 'leaf_prediction', displayName: 'Leaf Health Detection', file: 'leaf_prediction.h5', description: 'Detects health and powdery rust in a leaf.', intro: 'This model helps identify whether a leaf is healthy or affected by powdery rust or other diseases. Upload a leaf image to get a prediction.' },
  { key: 'xray_model', displayName: 'X-ray Pneumonia Detection', file: 'xray_model.h5', description: 'Finds normal and pneumonia in x-ray images.', intro: 'This model analyzes chest X-ray images to detect normal cases or pneumonia. Upload an X-ray image to get a prediction.' },
  { key: 'mango_predict', displayName: 'Mango Disease Detection', file: 'mango_predict.h5', description: 'Detects healthy, Anthracnose, Bacterial Black Spot, and multiple diseases in mangoes.', intro: 'This model classifies mangoes as healthy or affected by Anthracnose, Bacterial Black Spot, or multiple diseases. Upload a mango image to get a prediction.' },
  { key: 'butterfly', displayName: 'Butterfly Species Classifier', file: 'butterfly.h5', description: 'Classifies a variety of butterfly types (100+ classes).', intro: 'This model can identify over 100 species of butterflies. Upload a butterfly image to get a prediction.' },
  { key: 'bone', displayName: 'Bone Fracture Detection', file: 'bone.h5', description: 'Detects types of bone fractures: Comminuted, Avulsion, Fracture Dislocation, Hairline, Greenstick.', intro: 'This model detects various types of bone fractures from X-ray images. Upload a bone X-ray to get a prediction.' },
];

const MainPage: React.FC = () => {
  const [showModels, setShowModels] = useState(false);
  const [selectedModelIdx, setSelectedModelIdx] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [resultText, setResultText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNavClick = (section: string) => {
    if (section === 'models') {
      setShowModels(true);
    } else {
      setShowModels(false);
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleModelSelect = (idx: number) => {
    setSelectedModelIdx(idx);
    setUploadedImage(null);
    setUploadedImageFile(null);
    setShowResult(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
        setShowResult(false);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePredict = async () => {
    if (!uploadedImageFile) return;
    const modelKey = models[selectedModelIdx].key;
    const formData = new FormData();
    formData.append('model_name', modelKey);
    formData.append('file', uploadedImageFile);
    setResultText('Predicting...');
    setShowResult(true);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResultText(data.result || 'No result returned.');
    } catch (error) {
      setResultText('Prediction failed.');
    }
  };

  return (
    <div className="main-root">
      <nav className="main-nav">
        <div className="nav-left">
          <span className="nav-brand">AR</span>
          <a href="#home" className="nav-link" onClick={() => handleNavClick('home')}>Home</a>
          <a href="#models" className={`nav-link${showModels ? ' active' : ''}`} onClick={() => handleNavClick('models')}>Models</a>
        </div>
        <div className="nav-right">
          <a href={linkedInUrl} className="icon-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><line x1="16" y1="11" x2="16" y2="16"/><line x1="12" y1="11" x2="12" y2="16"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="16" y1="8" x2="16" y2="8"/></svg>
          </a>
          <a href={githubUrl} className="icon-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.41-.01 2.74 0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/></svg>
          </a>
        </div>
      </nav>
      <main className="main-content">
        {!showModels ? (
          <>
            <section id="home" className="section home-section">
              <h1>Welcome to AR Deep Learning Models</h1>
              <p>This project provides simple, educational deep learning models created during my learning journey. Explore the basics of Artificial Neural Networks (ANN) and Convolutional Neural Networks (CNN), and try out the models yourself!</p>
            </section>
            <section className="section project-section">
              <h2>About This Project</h2>
              <p>My goal is to make deep learning approachable for beginners. The models here are intentionally simple, focusing on clarity and learning rather than complexity. Each model is accompanied by explanations and code, so you can understand how they work and build your own.</p>
            </section>
            <section className="section concepts-section">
              <h2>Deep Learning Concepts</h2>
              <h3>What is Deep Learning?</h3>
              <p>Deep learning is a subset of machine learning that uses artificial neural networks with many layers to learn from large amounts of data. It powers modern AI applications like image recognition, language translation, and more.</p>
              <h3>Artificial Neural Networks (ANN)</h3>
              <p>ANNs are inspired by the human brain and consist of interconnected nodes (neurons) organized in layers. They learn to map inputs to outputs by adjusting weights through training.</p>
              <h3>Convolutional Neural Networks (CNN)</h3>
              <p>CNNs are specialized neural networks for processing grid-like data such as images. They use convolutional layers to automatically learn spatial features, making them highly effective for computer vision tasks.</p>
            </section>
          </>
        ) : (
          <div className="models-view">
            <aside className="models-sidebar">
              {models.map((model, idx) => (
                <button
                  key={model.key}
                  className={`model-list-item${selectedModelIdx === idx ? ' selected' : ''}`}
                  onClick={() => handleModelSelect(idx)}
                >
                  {model.displayName}
                </button>
              ))}
            </aside>
            <section className="model-details">
              <h2>{models[selectedModelIdx].displayName}</h2>
              <p className="model-desc">{models[selectedModelIdx].description}</p>
              <p className="model-intro">{models[selectedModelIdx].intro}</p>
              <div className="upload-section">
                <label htmlFor="image-upload" className="upload-label">Upload an image:</label>
                <button
                  className="custom-file-btn"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose Image
                </button>
                <input
                  id="image-upload"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {uploadedImage && (
                  <>
                    <div className="uploaded-image-preview">
                      <img src={uploadedImage} alt="Uploaded preview" />
                    </div>
                    <button className="predict-btn" type="button" onClick={handlePredict}>
                      Predict
                    </button>
                  </>
                )}
                {showResult && (
                  <div className="result-box">
                    {resultText.split('\n').map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
