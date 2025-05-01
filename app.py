from flask import Flask, render_template
import os

app = Flask(__name__)

# Configuración para encontrar plantillas en el mismo directorio


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/galeria')
def galeria():
    return render_template('galeria.html')

if __name__ == '__main__':
    app.run(debug=True)