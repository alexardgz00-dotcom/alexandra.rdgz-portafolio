# 🦠 Machine Learning-Driven Reverse Vaccinology: Predicting *Brucella abortus* Antigen Candidates

## 📌 Project Overview
This repository contains an automated bioinformatics and machine learning pipeline designed to accelerate vaccine target discovery for *Brucella abortus*. By integrating computational biology with predictive modeling, this project screens thousands of uncharacterized bacterial proteins to identify highly viable, surface-exposed antigen candidates for wet-lab assay development. 

This approach minimizes the time and resources traditionally required for *in vitro* screening by applying a robust biological heuristic and a Random Forest classification model to the complete *Brucella* proteome.

---

## 🧬 The Biological Heuristic (Target Labeling)
Because complete, laboratory-verified lists of surface antigens are limited, this pipeline generates synthetic target labels based on established principles of immunology and reverse vaccinology. A protein is flagged as a strong vaccine candidate if it meets the following molecular thresholds:

1. **Molecular Weight (> 40 kDa):** Larger proteins possess a higher number of epitopes, making them highly visible targets for Antigen-Presenting Cells (APCs).
2. **Instability Index (< 40):** The protein must be structurally stable to survive the vaccine manufacturing process, maintain shelf-life, and persist in the host bloodstream without rapid degradation.
3. **Leucine Content (> 7%):** High concentrations of hydrophobic amino acids (like Leucine) strongly suggest the protein is membrane-bound or surface-exposed, allowing circulating antibodies to physically bind to it.

---

## ⚙️ Pipeline Architecture

1. **Automated Data Retrieval:** Dynamically streams the complete *Brucella abortus* proteome (UP000002719) directly from the UniProt REST API. Built-in error handling and fallback datasets ensure the pipeline remains resilient to server outages.
2. **Biochemical Feature Extraction:** Utilizes `Biopython` to parse FASTA sequences, clean ambiguous amino acid artifacts, and mathematically calculate the structural properties of each protein (Molecular Weight, Isoelectric Point, Instability Index, Aromaticity, etc.).
3. **Machine Learning Classification:** Trains a **Random Forest Classifier** (`scikit-learn`) on the engineered biochemical features to map complex, non-linear relationships and identify hidden antigen candidates.
4. **Model Evaluation & Interpretability:** Grades the model using precision, recall, and ROC-AUC scores, and visualizes Feature Importance to ensure the AI's decision-making is biologically sound and transparent.

---

## 🛠️ Tech Stack
* **Language:** Python 3
* **Bioinformatics:** Biopython (`SeqIO`, `ProteinAnalysis`)
* **Machine Learning:** Scikit-Learn (`RandomForestClassifier`)
* **Data Manipulation:** Pandas, NumPy
* **Data Visualization:** Matplotlib, Seaborn
* **Environment:** Google Colab / Jupyter Notebook

---

## 📊 Results & Interpretability
The Random Forest model successfully learned to distinguish viable candidates from background proteins, achieving a high **ROC-AUC score**. 

Crucially, the model's **Feature Importance** analysis confirms that the algorithm is not a "black box." The visualization (saved as `feature_importance.png`) demonstrates that the model heavily prioritizes measurable structural biology—such as Molecular Weight and Instability—proving that its classifications provide a reliable, data-driven foundation for selecting candidates for physical assay development.

---

## 🚀 How to Run
This pipeline is designed to be fully reproducible in Google Colab. 

1. Open `Brucella_Vaccine_Prediction.ipynb` in Google Colab.
2. Go to **Runtime > Run all**.
3. The script will automatically fetch the data from UniProt, extract the features, train the model, and output the classification metrics and feature importance charts.

---
*Author: Alexandra*  
*Focus: Integrating AI, bioinformatics, and biological systems.*