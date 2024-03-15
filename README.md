# Wardrobe-Wizard

## Notice

This project is tested on **Google Chrome**. We highly recommend you run this project on the same browser for the best experience.

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. **Clone the Repository**

   Use Git to pull the code to your local machine:
   
   ```bash
   git pull https://github.com/SylviaHJY/Wardrobe-Wizard.git

2. 

3.  **Open a Terminal in the backend Directory.** 
   Install the required packages using pip:
    ```bash
    pip install requirements.txt

4.  **Make sure you have .flaskenv file in the backend root directory.** Normally, it has been uploaded to our GitHub repo under our backend root directory, if you don't have it, you will need to add .flaskenv file manually.
    Add this two config code to your .flaskenv file:
     ```bash
     FLASK_APP=main.py
     FLASK_ENV=development
     
   So that you will be able to run flask (our backend supported by Flask) by this command:
    ```bash
     flask run

   Alternatively, you could run the flask project by those command in the terminal without having .flaskenv file:
   for Windows:
     ```bash
     set FLASK_APP=main.py
     set FLASK_ENV=development  
     flask run
     
   for Unix/Linux/macOS：
    ```bash
      export FLASK_APP=main.py
      export FLASK_ENV=development
      flask run

##Notice: Remember to delete all __pycache__ (under src, core, and router files) after everytime you terminate the terminal, so that you won't get errors once the code has been updated. 

5.  **Open a Terminal in the React Frontend Directory.**
   Install the required packages using npm:  
   
    ```bash
    npm install
6. Add .env file in the frontend root directory.

7. **Run the project locally with the following command:**
    ```bash
    npm start

8. **Access the Project**

The project will be running at https://localhost:3000. Open this URL in Google Chrome to view the project.
