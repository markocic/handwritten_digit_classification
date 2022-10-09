from PIL import Image
from skimage.io import imread
import numpy as np
from skimage.transform import resize


# read parsed image back in 8-bit, black and white mode (L)
x = imread('output.png')
gray = np.dot(x[...,:3], [0.299, 0.587, 0.114])
x = resize(gray, (28, 28))

im = Image.fromarray(x.astype(np.uint8))
im.convert("L")
print(x)
im.save("test.jpeg")