---
slug: template-editor
title: Template Editor
---

# Template Editor

The template editor is opened from the home screen by pressing the edit button below `Template` in the right panel. The template editor has three sections:

* Layers: This is where layers are created, selected and managed at a high level.
* Layer config: This is where you enter settings for a layer you have selected.
* Preview: This shows a preview of cards/components.

## Layers

By pressing the `add` button in the layers section, you can add a new layer. There are three types of layers – text, image and shape. When adding a new layer, a box appears where you select which type of layer should be added. Some things to note:

* **Layer order matters.** Layers further down in the list are placed _on top_ of layers further up. New layers are added at the bottom. You can reorder layers by clicking and draggning.
* **Layers can be cloned.** This could for example be useful if you have three close-to-identical layers for placing three icons. Cloning is done with the appropriate button, shown when you have selected a layer.
* **Layer visibility** can be turned on and off by the button for this, shown on the selected layer. Above the layer list is a checkbox allowing highlighting the selected layer, which may be useful if you have layers that may easily be mixed up.
* **Deleting layers** is done with the button for this, shown when you have selected a layer. You will have to confirm to actually delete the layer. There is no undelete.

## Layer config

The layer config panel, in the middle of the template editor, shows settings for the selected layer. Which settings are available depends on the type of layer selected, but some settings are present for all layer types.

### Common settings for layers

* **Layer name** is the name as presented on screen. Short and descriptive is generally a good idea.
* **Dimensions** tells where the content of the layer should be placed. There is offset from top left corner (X and Y properties) as well as width and height (W and H properties). The dimensions can be set either in percent of the component size, in millimeters, or in pixels. Switching from `XYWH` to `INSET` coordinate mode instead allows setting the dimensions as distance from the four sides of the component, which is useful in some cases.

### Config for text layers

* **Font** allows selecting font, style (such as bold or italic), text size and also text color. Formatting is _not_ collected from the spreadsheet, so any formatting in the spreadsheet will be lost. Note that text size will be decreased if necessary to fit the text within the given dimensions.
* **Text alignment** allows setting setting left/center/right in horizontal alignment, and top/middle/bottom in vertical alignment.
* **Text content** tells what the actual text should be. You can enter static text, but you probably also want some text fetched from the spreadsheet. You insert column values by entering column header in tripple curly-braces, for example `{{{Name}}}`. By default any column matching the layer name will be used.

Note: The fonts starting with lowercase letters, at the top of the list, are from a collection that may lack some characters (such as [en dashes](https://en.wikipedia.org/wiki/Dash#En_dash)). If the preview is lacking special characters, switch to a font starting with an uppercase letter.

### Config for image layers

* **Image selection**: This section holds a few important settings.
  * First of them is the link for uploading images. As the dialogue will tell you, **images must be uploaded through this tool to be accessible for Paperize** – it is not enough to upload them to the relevant folder in Google Drive.
  * The **static** and **dynamic** selection style tells whether a given image should be used for all components (static) or the image should vary depending on content in the spreadsheet (dynamic). If using the dynamic setting, you get extra options for describing the image name. Only the middle of these settings allow fetching data from a spreadsheet column – the _prefix_ and _suffix_ boxes just hold static text.
* **Image alignment** tells whether the image should be scaled to fit inside the given dimensions (fit), scaled to fill the given dimensions completely (fill) or stretched to match the dimensions even if it changes image proportions (stretch). There are also options for telling if left/center/right part of the image should show in case the full width isn't visible, and similarly for top/middle/bottom.

### Config for shape layers

* **Shape** tells which shape should be drawn. There available types are rectangle, rounded rectangle and ellipse. There are no settings for the radius for the rounded rectangle.
* **Stroke** contains settings for the border of the shape: width and color. The border can also be turned off.
* **Fill** contains settings for any color to fill the shape with. It is unfilled by default.

### Magic properties

A number of properties have a spreadsheet icon next to them. This tells that **magic properties** can be used to set the values from spreadsheet data, instead of entering them manually in the editor. This is done by setting a column name to the name of the magic property, visible when inspecting the spreadsheet icon. Magic properties support certain values, depending on where they are used.

Check out the [Magic Properties documentation](/references/magic-properties) to learn more about them.

## Preview

The preview pane can be used to preview how updates to the layers look on actual components. This is a standard Google preview of a pdf generated on the fly, which means that some settings might not be not fully relevant for the context. The download button downloads a single component in pdf format.
