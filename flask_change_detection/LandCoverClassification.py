import numpy as np
import rasterio
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib

def extract_features(image_path):
    with rasterio.open(image_path) as src:
        image = src.read()
        image = np.moveaxis(image, 0, -1)  # Rearrange axes to (height, width, channels)
        features = image.reshape(-1, image.shape[-1])
    return features

def train_model(features, labels):
    X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)
    
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)
    
    y_pred = clf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy: {accuracy}")
    print(classification_report(y_test, y_pred))
    
    return clf

def classify_image(model, image_path, output_path):
    with rasterio.open(image_path) as src:
        image = src.read()
        image = np.moveaxis(image, 0, -1)
        features = image.reshape(-1, image.shape[-1])
        
        predictions = model.predict(features)
        classified_image = predictions.reshape(image.shape[0], image.shape[1])
        
        profile = src.profile
        profile.update(dtype=rasterio.uint8, count=1)
        
        with rasterio.open(output_path, 'w', **profile) as dst:
            dst.write(classified_image.astype(rasterio.uint8), 1)
    
    return output_path

def land_cover_classification(input_image_path, output_image_path):
    # In a real-world scenario, you would have a separate training dataset
    # For this example, we'll use the input image for both training and classification
    features = extract_features(input_image_path)
    
    # Generate dummy labels for demonstration purposes
    # In a real scenario, you would have actual ground truth labels
    labels = np.random.randint(0, 5, size=features.shape[0])
    
    model = train_model(features, labels)
    
    # Save the model
    joblib.dump(model, 'land_cover_model.joblib')
    
    # Classify the image
    classified_image_path = classify_image(model, input_image_path, output_image_path)
    
    return classified_image_path