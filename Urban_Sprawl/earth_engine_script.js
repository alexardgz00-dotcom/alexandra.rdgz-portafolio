// 1. Define the area of interest (Center of Querétaro, Mexico)
var point = ee.Geometry.Point([-100.3899, 20.5888]);

// Create a 10km x 10km bounding box around the city to keep the file size manageable
var region = point.buffer(10000).bounds();

// Center the map preview
Map.centerObject(region, 13);
Map.addLayer(region, {color: 'red'}, 'Study Area Bounding Box');

// 2. Load the Sentinel-2 Satellite database
var dataset = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterBounds(region)
                  // Filter for clear days only (under 10% clouds)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)); 

// 3. Get the 2018 Image (Dry season: Jan-April to avoid seasonal greening)
var img2018 = dataset.filterDate('2018-01-01', '2018-04-30').median();

// 4. Get the 2026 Image (Dry season: Jan-April)
var img2026 = dataset.filterDate('2026-01-01', '2026-04-30').median();

// 5. Convert the raw satellite data into standard RGB (8-bit) so our Python code can read it
var visParams = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000};
var rgb2018 = img2018.visualize(visParams);
var rgb2026 = img2026.visualize(visParams);

// Preview the images on the map below
Map.addLayer(rgb2018.clip(region), {}, 'Querétaro 2018 Preview', false);
Map.addLayer(rgb2026.clip(region), {}, 'Querétaro 2026 Preview', true);

// 6. Send the images to Google Drive
Export.image.toDrive({
  image: rgb2018.clip(region),
  description: 'Queretaro_2018_RGB',
  folder: 'EuroSAT_Project', // It will create this folder in your Drive
  scale: 10,                 // 10 meters per pixel (highest resolution)
  region: region,
  fileFormat: 'GeoTIFF'
});

Export.image.toDrive({
  image: rgb2026.clip(region),
  description: 'Queretaro_2026_RGB',
  folder: 'EuroSAT_Project',
  scale: 10,
  region: region,
  fileFormat: 'GeoTIFF'
});