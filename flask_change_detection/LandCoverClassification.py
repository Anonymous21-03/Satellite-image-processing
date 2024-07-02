import numpy as np
import rasterio
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import matplotlib.colors as colors
import warnings
from rasterio.errors import NotGeoreferencedWarning
import cv2

# Suppress the NotGeoreferencedWarning
warnings.filterwarnings('ignore', category=NotGeoreferencedWarning)

# Define land cover classes
LAND_COVER_CLASSES = ['Water', 'Vegetation', 'Urban', 'Bare Soil', 'Forest']

def extract_features(image_path):
    with rasterio.open(image_path) as src:
        image = src.read()
        image = np.moveaxis(image, 0, -1)  # Rearrange axes to (height, width, channels)
        features = image.reshape(-1, image.shape[-1])
    return features, image.shape

def classify_image(features, n_clusters, original_shape):
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    labels = kmeans.fit_predict(features)
    classified_image = labels.reshape(original_shape[:2])
    return classified_image

def create_legend(n_clusters):
    class_names = LAND_COVER_CLASSES[:n_clusters]
    colors = plt.cm.tab10(np.linspace(0, 1, n_clusters))
    legend_elements = [plt.Rectangle((0, 0), 1, 1, fc=colors[i], label=class_names[i]) for i in range(n_clusters)]
    return legend_elements

def land_cover_classification(input_image_path, output_image_path, n_clusters=5):
    # Extract features
    features, original_shape = extract_features(input_image_path)
    
    # Perform classification
    classified_image = classify_image(features, n_clusters, original_shape)
    
    # Create a color map
    cmap = plt.cm.tab10
    norm = colors.BoundaryNorm(np.arange(n_clusters+1)-0.5, n_clusters)
    
    # Create the figure and axes
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 6))
    
    # Plot the original image
    original_image = cv2.imread(input_image_path)
    original_image = cv2.cvtColor(original_image, cv2.COLOR_BGR2RGB)
    ax1.imshow(original_image)
    ax1.set_title('Original Image')
    ax1.axis('off')
    
    # Plot the classified image
    im = ax2.imshow(classified_image, cmap=cmap, norm=norm)
    ax2.set_title('Classified Image')
    ax2.axis('off')
    
    # Add legend
    legend_elements = create_legend(n_clusters)
    ax2.legend(handles=legend_elements, loc='center left', bbox_to_anchor=(1, 0.5))
    
    # Adjust layout and save
    plt.tight_layout()
    plt.savefig(output_image_path, dpi=200, bbox_inches='tight')
    plt.close()
    
    # Ensure the image is saved in a format that can be easily displayed
    saved_image = cv2.imread(output_image_path)
    cv2.imwrite(output_image_path, saved_image, [cv2.IMWRITE_JPEG_QUALITY, 90])
    
    return output_image_path