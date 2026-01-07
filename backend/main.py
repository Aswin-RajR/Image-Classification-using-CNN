from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
import os
import shutil
import uuid
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.preprocessing import image
import numpy as np
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from tensorflow.keras.models import load_model

def model_load(model_name: str, image_path,original_model_name, image_size=(225, 225),):
    model = load_model(model_name)
    if original_model_name == "leaf_prediction":
        image_size = (225, 225)
    elif original_model_name == "bone":
        image_size = (384, 384)
    else:
        image_size = (224,224)
   
    img = image.load_img(image_path, target_size=image_size)
    img = image.img_to_array(img)
    img = img.astype('float32')
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    predction = model.predict(img)[0]

    # Determine paths relative to the current script
    base_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(base_dir, "assets", "json_files", f"{original_model_name}.json")
    
    with open(json_path, "r") as f:
        final_pred = json.load(f)
        print(np.argmax(predction))
        final_predction = final_pred[str(np.argmax(predction))]
        return final_predction
 

@app.post("/predict")
async def predict(model_name: str = Form(...), file: UploadFile = File(...)):
    # Save the uploaded file to a static directory (e.g., 'uploads/')
    upload_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
    original_model_name = model_name
    os.makedirs(upload_dir, exist_ok=True)

    # Cleanup: Delete old uploaded images before saving the new one
    for filename in os.listdir(upload_dir):
        old_file_path = os.path.join(upload_dir, filename)
        try:
            if os.path.isfile(old_file_path) or os.path.islink(old_file_path):
                os.unlink(old_file_path)
        except Exception as e:
            print(f"Failed to delete {old_file_path}. Reason: {e}")

    file_ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(upload_dir, unique_filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    print(file_path)
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir, "assets", "models", f"{original_model_name}.h5")
    
    result = model_load(model_name=model_path, image_path=file_path, original_model_name=original_model_name)
    # Return both model name and file path (relative or absolute as needed)
    return JSONResponse(content={
        # "model_name": model_name,
        "result": result  # or use a URL if serving static files
    })