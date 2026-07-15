# Eco-Vision: Mapping Urban Sprawl Using Deep Learning & Satellite Imagery
## 📌 Project Overview

This repository contains an end-to-end deep learning pipeline that uses PyTorch and a fine-tuned ResNet50 model to classify land cover and detect urban sprawl. The model was trained on the EuroSAT dataset and deployed to analyze real-world Sentinel-2 satellite imagery of Querétaro, Mexico, comparing the landscape of 2018 to 2026.

## ⚙️ Pipeline Architecture

## Part 1: Obtaining Satellite Imagery (Google Earth Engine)

To run the change detection analysis, you need raw, high-resolution `.tif` satellite images. We use Google Earth Engine (GEE) to source cloud-free Sentinel-2 data.

1. Create a free account at [Google Earth Engine](https://earthengine.google.com/).
2. Open the [Code Editor](https://code.earthengine.google.com/).
3. Paste the JavaScript extraction script located in the `earth_engine_script.js` file of this repository.
4. Click **Run**. The script will automatically filter for days with <10% cloud cover and compile a median RGB image for the dry seasons of 2018 and 2026.
5. Go to the **Tasks** tab on the right side of the GEE interface and click **Run** on the two pending export tasks. The `.tif` files will automatically download to your Google Drive.

## Part 2: Training the Model and Running Inference

The core machine learning pipeline is built in Python using Google Colab to leverage free GPU acceleration.
*   **Data Preparation:** Handled 27,000 images, applied data augmentation, and normalized to ImageNet standard matrices.
*   **Why ResNet50?:** We selected ResNet50 (Residual Network) as our core architecture for two primary reasons:
    1.  **Skip Connections:** Its 50-layer depth is capable of learning highly complex geospatial textures, while its mathematical "skip connections" prevent the vanishing gradient problem (where deep networks stop learning during training).
    2.  **Transfer Learning Engine:** By leveraging weights pre-trained on the massive ImageNet dataset, the model already possessed the foundational ability to detect edges, colors, and geometric shapes. We simply repurposed those edge-detectors to identify geographic features.
*   **Two-Phase Training:** The base layers were initially frozen to train a new fully connected final layer without causing massive mathematical shocks to the system. Once stable, all network weights were gently unfrozen for a 5-epoch fine-tuning phase at a reduced learning rate (`0.0001`).

### Prerequisites
Upload the `Urban_Sprawl_Analysis.ipynb` notebook to Google Colab and ensure your Runtime is set to **GPU** (`Runtime > Change runtime type > T4 GPU`). 

### 🚀 How to Run
1. **Data Preparation:** Run the initial cells to download the EuroSAT dataset directly into the Colab environment and initialize the PyTorch `DataLoader`.
2. **Model Training (Feature Extraction):** The notebook downloads a pre-trained ResNet50 model. The base layers are frozen, and the final fully connected layer is replaced to classify 10 specific land-cover categories. Run the training loop for 10 epochs.
3. **Fine-Tuning:** Unfreeze all network weights and run the secondary training loop for 5 epochs with a reduced learning rate (`0.0001`) to adapt the edge-detectors to satellite topographies.
4. **Evaluation:** Run the testing block to generate the classification report and Confusion Matrix.
5. **Geospatial Inference:** Mount your Google Drive in Colab. Point the inference script to the `Queretaro_2018_RGB.tif` and `Queretaro_2026_RGB.tif` files. The script will chop the images into 64x64 patches, classify them, and render the final Land Cover Transition Maps and Sankey flow diagrams.

## 🛠️ Tech Stack & Libraries

**Core Machine Learning**
* **Language:** Python 3.10
* **Framework:** PyTorch (Deep Learning & Autograd)
* **Computer Vision:** Torchvision (ResNet50 Architecture, Image Transforms)

**Geospatial & Data Processing**
* **Satellite Data Sourcing:** Google Earth Engine (JavaScript API), Copernicus
* **Data Manipulation:** NumPy, Pandas, PIL (Pillow)

**Data Visualization & Analytics**
* **Statistical Plotting:** Matplotlib, Seaborn (Confusion Matrix)
* **Interactive Visualization:** Plotly (Sankey Diagrams)

**Infrastructure**
* **Environment:** Google Colab
* **Hardware:** NVIDIA T4 Tensor Core GPU

### 🛠️Common Pitfalls & Troubleshooting

If you are replicating this project in Google Colab, you may encounter the following environmental quirks:

*   **Progress Bar Stuck at 0% (Epoch 1):** If reading the dataset directly from a mounted Google Drive, the network I/O bottleneck is severe. During the very first epoch, PyTorch and the Ubuntu OS must locate and cache the file paths of all 21,600 training images. The progress bar may appear completely frozen for 10 to 15 minutes, but the background Python engine is still running. Let it process; subsequent epochs will run 5x to 10x faster once the locations are cached in RAM.
*   **`NameError: 'test_loader' is not defined`:** Google Colab will occasionally drop idle variables from memory during long GPU training sessions. If your evaluation code throws this error, simply scroll up and re-run the specific cell that initialized your `DataLoaders` to place them back into RAM.
*   **CUDA Out of Memory Error:** If the Colab GPU crashes immediately upon starting the training loop, the hardware cannot process the volume of images simultaneously. Simply locate the `batch_size = 32` variable and reduce it to `16`.

---
*Author: Alexandra Rodriguez*  
*Focus: Integrating AI, bioinformatics, and biological systems.*
