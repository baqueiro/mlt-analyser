# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, jsonify, _app_ctx_stack
import tablib
import os
import logging
import operator
from logging.handlers import RotatingFileHandler

app = Flask (__name__)

#fun var

dataset = tablib.Dataset()
with open(os.path.join(os.path.dirname(__file__), 'input', 'Melate.csv')) as f:
    dataset.csv = f.read()


@app.route("/")
def index():
    return render_template('index.html')

#devolvemos cada número y la cantidad de veces que fue como resultado del melate, sin el adicional
@app.route('/histogram')
def histogram():
	entries = [0] * 57

	for row in dataset:
		for i in range(2, 9):
			entries[int(row[i])] += 1

	histogram = {}

	for idx, val in enumerate(entries):
		histogram[idx] = val

	del histogram[0]
	
	return jsonify(histogram=histogram)

@app.route('/histogram/order')
def histOrder():

	#Aún no se cómo usar funciones :P

	entries = [0] * 57

	for row in dataset:
		for i in range(2, 9):
			entries[int(row[i])] += 1

	histogram = {}

	for idx, val in enumerate(entries):
		histogram[idx] = val

	del histogram[0]

	sorted_x = sorted(histogram.items(), key=operator.itemgetter(1), reverse=True)

	return jsonify(mostFrecuency=sorted_x)


if __name__ == "__main__":
	handler = RotatingFileHandler('foo.log', maxBytes=10000, backupCount=1)
	handler.setLevel(logging.INFO)
	app.logger.addHandler(handler)
	app.run()
