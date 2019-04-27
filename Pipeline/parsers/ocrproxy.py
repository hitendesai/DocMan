from PIL import Image
import pyocr
import pyocr.builders
import sys
import re
import io
from google.cloud import translate
import os
from io import BytesIO

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "${filename.format}"

class OCRProxyResponse:
    def __init__(self):
        self.text = ''
        self.success = False
        self.message = ''

class OCRProxy:
    def __init__(self):
        self.ocr = None

    def PerformOCR(self, ImageData):
        from google.cloud import vision
        translate_client = translate.Client()
        resp = OCRProxyResponse()  

        client = vision.ImageAnnotatorClient()
        with io.BytesIO(ImageData) as image_file:
            content = image_file.read()
        image = vision.types.Image(content=content)
        response = client.document_text_detection(image=image)
        texts = response.text_annotations

        text1 = (format(texts[0].description)) 
        target= 'en'
        translation = translate_client.translate(text1, target_language=target)
        text = (format(translation['translatedText']))
        resp.text = text
        resp.success = True
        return resp