# Handwritten digit classification

## Table of Contents
+ [About](#about)
+ [Getting Started](#getting_started)
+ [Usage](#usage)

## About <a name = "about"></a>
This is a responsive wep app to classify digits written on an HTML canvas using a Convolutional Neural Network.

The model is trained on an MNIST ("Modified National Institute of Standards and Technology") dataset containing 60,000 images of handwritten digits. At the time of writing this, the model's accuracy is 99.1%.

## Getting Started <a name = "getting_started"></a>

There is a live version for you to test before deciding to install it on your local machine. https://hw-digit-classification.herokuapp.com/

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

Python 3 is required as well as all the packages from requirements.txt file.
Install required packages with pip by running the following command.

```
pip install -r requirements.txt
```

### Installing

A step by step series of examples that tell you how to get a development env running.

<br>
Clone the git repository to your local machine

```
git clone https://github.com/markocic/handwritten_digit_classification.git
```

Change directory to a newly generated folder

```
cd handwritten_digit_classification
```

Make sure you have all the required packages installed.

```
pip install -r requirements.txt
```

Start the flask server

```
python app.py
```
A link to your web app will be printed in the terminal. It will probably be 

> 127.0.0.1:5000

If you ran into some issues feel free to contact me and I will try my best to help you resolve the said issue.

### Deployment

I deployed this app to heroku. Checkout branch 'heroku' for optimized version that's ready to be pushed.

## Usage <a name = "usage"></a>


After setting everything up and opening web app in your preferred web browser you will be greated with a screen that looks like this.

![home page](https://imgur.com/20JFpKo.jpg)

You can pick any color you want from the middle row and write a digit between 0-9 on a black canvas in the left row. After you have written a digit just click on "Predict" and the text in the right row saying "Write a digit between 0-9" will change to reflect model's prediction.

![usage](https://i.imgur.com/Ld6tMdb.gif)

 If you want to erase or clear the canvas, there is an eraser below the color picker and a "Clear" button below the canvas.
