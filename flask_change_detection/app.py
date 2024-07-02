from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import cv2
import numpy as np
from LandCoverClassification import land_cover_classification
import traceback
import logging

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'output'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'tif', 'tiff'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def detect_change(image1_path, image2_path, out_dir):
    # Read images
    img1 = cv2.imread(image1_path)
    img2 = cv2.imread(image2_path)

    # Ensure images are the same size
    img2 = cv2.resize(img2, (img1.shape[1], img1.shape[0]))

    # Compute difference
    diff = cv2.absdiff(img1, img2)
    cv2.imwrite(os.path.join(out_dir, 'difference.jpg'), diff)

    # Convert to grayscale
    gray_diff = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)

    # Flatten the image
    pixels = gray_diff.reshape((-1, 1))

    # Perform K-means clustering
    kmeans = KMeans(n_clusters=3, random_state=42)
    kmeans.fit(pixels)

    # Reshape the result back to the image shape
    change_map = kmeans.labels_.reshape(gray_diff.shape)

    # Normalize to 0-255 range
    change_map = (change_map - change_map.min()) / (change_map.max() - change_map.min()) * 255
    change_map = change_map.astype(np.uint8)

    cv2.imwrite(os.path.join(out_dir, 'ChangeMap.jpg'), change_map)

    # Apply morphological operations (if needed)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    close_map = cv2.morphologyEx(change_map, cv2.MORPH_CLOSE, kernel)
    cv2.imwrite(os.path.join(out_dir, 'CloseMap.jpg'), close_map)

    open_map = cv2.morphologyEx(close_map, cv2.MORPH_OPEN, kernel)
    cv2.imwrite(os.path.join(out_dir, 'OpenMap.jpg'), open_map)

@app.route('/api/detect-change', methods=['POST'])
def process_images():
    if 'image1' not in request.files or 'image2' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    image1 = request.files['image1']
    image2 = request.files['image2']
    
    if image1.filename == '' or image2.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if image1 and allowed_file(image1.filename) and image2 and allowed_file(image2.filename):
        filename1 = secure_filename(image1.filename)
        filename2 = secure_filename(image2.filename)
        
        image1_path = os.path.join(app.config['UPLOAD_FOLDER'], filename1)
        image2_path = os.path.join(app.config['UPLOAD_FOLDER'], filename2)
        
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)
        
        image1.save(image1_path)
        image2.save(image2_path)
        
        detect_change(image1_path, image2_path, app.config['OUTPUT_FOLDER'])
        
        return jsonify({
            'difference': 'difference.jpg',
            'changeMap': 'ChangeMap.jpg',
            'closeMap': 'CloseMap.jpg',
            'openMap': 'OpenMap.jpg'
        })
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/api/land-cover-classification', methods=['POST'])
def process_land_cover():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    image = request.files['image']
    
    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        output_filename = f"classified_{os.path.splitext(filename)[0]}.png"
        output_path = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
        
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)
        
        image.save(input_path)
        
        try:
            classified_image_path = land_cover_classification(input_path, output_path, n_clusters=5)
            return jsonify({'classifiedImage': os.path.basename(classified_image_path)})
        except Exception as e:
            error_message = str(e)
            stack_trace = traceback.format_exc()
            logging.error(f"Error in land cover classification: {error_message}\n{stack_trace}")
            return jsonify({'error': 'An error occurred during processing. Please check the server logs for details.'}), 500
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/output/<path:filename>')
def serve_file(filename):
    return send_from_directory(app.config['OUTPUT_FOLDER'], filename)

if __name__ == '__main__':
    logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')
    app.run(debug=True)