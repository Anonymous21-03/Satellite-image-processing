from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import DetectChange
import LandCoverClassification

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'output'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'tif', 'tiff'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/detect-change', methods=['POST'])
def detect_change():
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
        
        # Call your DetectChange script
        DetectChange.detect_change(image1_path, image2_path, app.config['OUTPUT_FOLDER'])
        
        # Return the paths of the generated images
        return jsonify({
            'difference': 'difference.jpg',
            'changeMap': 'ChangeMap.jpg',
            'closeMap': 'CloseMap.jpg',
            'openMap': 'OpenMap.jpg'
        })
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/api/land-cover-classification', methods=['POST'])
def land_cover_classification():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    image = request.files['image']
    
    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        output_path = os.path.join(app.config['OUTPUT_FOLDER'], 'classified_' + filename)
        
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)
        
        image.save(input_path)
        
        # Call your LandCoverClassification script
        classified_image_path = LandCoverClassification.land_cover_classification(input_path, output_path)
        
        # Return the path of the generated classified image
        return jsonify({
            'classifiedImage': os.path.basename(classified_image_path)
        })
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/output/<path:filename>')
def serve_file(filename):
    return send_from_directory(app.config['OUTPUT_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)