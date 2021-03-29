import base64
import re
import imageio
import numpy as np
import tensorflow as tf
from matplotlib import pyplot as plt
from skimage.io import imread, imsave
from skimage.transform import resize
from tensorflow.keras.models import load_model
from flask import Flask, request, jsonify
from flask import render_template

import os

os.environ['TF_FORCE_GPU_ALLOW_GROWTH'] = 'true'

config = tf.compat.v1.ConfigProto()
config.gpu_options.allow_growth = True
config.log_device_placement = True
sess = tf.compat.v1.Session(config=config)

app = Flask(__name__)


@app.route('/')
def main():
    # image_array = np.asarray(data)
    #
    # image = Image.fromarray(image_array, 'L')
    # image.save("test.png")
    #
    # im = imageio.imread("test.png")
    #
    # gray = np.dot(im[..., :3], [0.299, 0.587, 0.114])
    # plt.imshow(gray, cmap=plt.get_cmap('gray'))
    # plt.show()

    return render_template('index.html', predicted_num="Draw a digit from 0-9")


@app.route('/predict/', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        model = load_model("test_model.h5")
        # get data from drawing canvas and save as image
        parseImage(request.get_data())

        # read parsed image back in 8-bit, black and white mode (L)
        x = imread('output.png')
        gray = np.dot(x[...,:3], [0.299, 0.587, 0.114])
        x = resize(gray, (28, 28))

        # reshape image data for use in neural network
        x = x.reshape(1, 28, 28, 1)
        x = x / 255

        prediction = model.predict(x)
        print(prediction.argmax())
        return render_template('index.html', predicted_num=prediction.argmax())


def parseImage(imgData):
    # parse canvas bytes and save as output.png
    imgstr = re.search(b'base64,(.*)', imgData).group(1)
    with open('output.png', 'wb') as output:
        output.write(base64.decodebytes(imgstr))


if __name__ == '__main__':
    app.run()
