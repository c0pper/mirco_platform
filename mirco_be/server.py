from flask import Flask, jsonify, send_file
from flask_cors import CORS  # Import the CORS module
import os
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


def find_unique_s_codes(content):
    unique_s_codes = set()

    # Splitting the content into lines
    lines = content.split('\n')

    # Iterating through each line
    for line in lines:
        # Extracting S code
        parts = line.split(': ', 1)
        if len(parts) == 2:
            s_code, _ = parts
            unique_s_codes.add(s_code)

    return list(unique_s_codes)



def get_role(role_strings):
    # Assuming the request contains a JSON payload with a list of strings
    endpoint = ""


    role = random.choice(["operatore", "debitore"])

    return role


def split_file(whole_file):
    file = {}
    file["content"] = whole_file

    s_codes = find_unique_s_codes(whole_file)
    lines = whole_file.split('\n')
    for idx, c in enumerate(s_codes):
        file[f"role_{idx}"] = []
    
    for idx, c in enumerate(s_codes):
        for line in lines:
            if line.startswith(c):
                file[f"role_{idx}"].append(line)

        file[f"role_{idx}_string"] = "\n".join(file[f"role_{idx}"])
    
    if file.get("role_0_string"):
        file["role_0_id"] = get_role(file["role_0"])
    if file.get("role_1_string"):
        file["role_1_id"] = get_role(file["role_1"])

    return file


def get_categories(text, role):
    if role == "operatore":
        analysis = "endpoint_op(text)"
        categories = [{"1": "op"}]
    else:
        analysis = "endpoint_deb(text)"
        categories = [{"2": "deb"}]

    return categories



@app.route('/api/files')
def get_files():
    txt_files_path = 'mirco_be/txtFiles'
    files = [f for f in os.listdir(txt_files_path) if f.endswith('.txt')]
    print(files)
    response = jsonify(files)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/api/files/<filename>')
def process_file_content(filename):
    txt_files_path = 'mirco_be/txtFiles'
    file_path = os.path.join(txt_files_path, filename)

    try:
        with open(file_path, 'r') as file:
            content = file.read()
            file = split_file(content)
            file["name"] = filename
            if file.get("role_0_id"):
                file[file["role_0_id"]] = get_categories(file["role_0_string"], file.get("role_0_id")) 
            if file.get("role_1_id"):
                file[file["role_1_id"]] = get_categories(file["role_1_string"], file.get("role_1_id")) 


            response = jsonify(file)
            response.headers.add('Access-Control-Allow-Origin', '*')
            return jsonify({'filename': filename, 'content': content})
    except FileNotFoundError:
        # Handle file not found error
        response = jsonify({'error': 'File not found'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response, 404
    except Exception as e:
        # Handle other exceptions
        response = jsonify({'error': str(e)})
        response.headers.add('Access-Control-Allow-Origin', '*')
        print(response({'error': str(e)}))
        return response({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3001)
