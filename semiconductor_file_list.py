import pandas as pd
import os
import json
import openpyxl

# 1. 파일 리스트를 불러올 디렉토리 경로 지정
directory_path = './results'
COUNTRY = ['GLOBAL', 'US', 'EMEA', 'KR', 'JP', 'CN', 'SSIR']


# 2. 파일 리스트 가져오기
file_list = os.listdir(directory_path)
file_json = {}
for i in file_list:
    temp = {}
    for j in COUNTRY:
        data = pd.read_excel("./results/" + i +"/live_url_output.xlsx", sheet_name=j, engine='openpyxl')
        temp[j] = len(data)
    file_json[i] = temp


# JavaScript 파일 형식으로 저장
output_file = "file_list.js"
with open(output_file, "w", encoding="utf-8") as f:
    f.write(f"const fileList = {file_json};")

# print(f"File list saved to {output_file}")