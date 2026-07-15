# Urban Sprawl Analysis: Querétaro (2018-2026)
**Author:** Alexandra Rodriguez Cardenas | **Framework:** PyTorch | **Architecture:** ResNet50

## 1. Model Performance & Validation
Before deploying the AI on live geographic data, it was rigorously evaluated on an unseen test split of the EuroSAT dataset (20% of 27,000 images). 

The two-phase training approach (Feature Extraction followed by full-network Fine-Tuning) yielded highly robust results:
* **Initial Transfer Learning Accuracy:** 94.26%
* **Post Fine-Tuning Accuracy:** ~96.00%

![Final Confusion Matrix](images/final_confusion_matrix.png)

The confusion matrix indicates exceptional precision across major categories. Minor misclassifications primarily occurred between visually overlapping classes, such as "Highway" and "River" (due to similar linear geographic geometries) and "Pasture" vs. "Herbaceous Vegetation."

## 2. Geospatial Application: Querétaro, Mexico
To test the model's real-world viability, it was applied to Sentinel-2 imagery of Querétaro, one of Mexico's fastest-growing industrial and residential hubs. 

The inference engine processed massive `.tif` files by generating a sliding 64x64 pixel window, passing each patch through the ResNet50 architecture, and reconstructing the geographic array into a color-coded classification map.

![Queretaro Baseline 2018-2026]images/queretaro_change_detection.png)

## 3. Change Detection & Transition Analysis
The primary objective was to quantify the loss of natural and agricultural land to urbanization over an 8-year period. By generating boolean masks over the 2018 and 2026 classification arrays, we isolated specific geographic patches that transitioned from "Nature/Agriculture" (Annual Crop, Forest, Pasture, Herbaceous Vegetation) to "Urban" (Residential, Industrial).

![Fate of 2018 Green Space in Querétaro (by 2026)]images/queretaro_urban_sprawl_chart.png)

### Flow of Land Conversion
To move beyond net-loss and understand the specific dynamics of the sprawl, a transition matrix was calculated and visualized using a Plotly Sankey Diagram. 

![Querétaro Land Cover Transition Matrix (2018 → 2026)]images/queretaro_transition_matrix.png)

**Key Findings:**
1. **Primary Sprawl Vector:** The analysis reveals that residential and industrial expansion is primarily consuming `AnnualCrop` and `Pasture` lands rather than old-growth `Forest`. 
2. **Zoning Implications:** This suggests that urban expansion in the region is advancing outward into immediately adjacent agricultural zones, transforming flat, easily developable farmland into concrete infrastructure.

## Conclusion
This project successfully demonstrates the viability of utilizing Convolutional Neural Networks (CNNs) and open-source satellite imagery to automate environmental monitoring. By transitioning from qualitative observation to quantitative geospatial data, this pipeline provides actionable intelligence for urban planners and environmental conservationists.