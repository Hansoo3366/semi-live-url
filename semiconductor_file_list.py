import pandas as pd
import os
import json
import openpyxl
import pymysql
from pymysql.err import IntegrityError

# MariaDB 연결 설정
db_config = {
    'host': '192.168.1.6',
    'user': 'root',
    'password': 'Gkstn5484##',
    'database': 'liveurllist'
}

def insert_data_safe(date, country, value):
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        # 삽입 시도
        insert_query = "INSERT INTO your_table (date, country, value) VALUES (%s, %s, %s)"
        cursor.execute(insert_query, (date, country, value))
        connection.commit()

        print(f"Data inserted successfully: {date}, {country}, {value}")

    except IntegrityError:
        print(f"Duplicate entry error. Skipping insert for: {date}, {country}")

    except Exception as e:
        print(f"Unexpected error: {e}")

    finally:
        if connection:
            connection.close()

# 1. 파일 리스트를 불러올 디렉토리 경로 지정
directory_path = './results'
COUNTRY = ['GLOBAL', 'US', 'EMEA', 'KR', 'JP', 'CN', 'SSIR']


# 2. 파일 리스트 가져오기
file_json = {}

for file_name in os.listdir(directory_path):
    if os.path.isdir(os.path.join(directory_path, file_name)):  # 폴더만 처리
        temp = {}
        for country in COUNTRY:
            try:
                # Excel 파일 경로
                excel_path = os.path.join(directory_path, file_name, "live_url_output.xlsx")
                # Excel 데이터를 읽어오기
                data = pd.read_excel(excel_path, sheet_name=country, engine='openpyxl')
                temp[country] = len(data)

                # MariaDB에 데이터 삽입
                insert_data_safe(file_name, 'Global' if country == 'GLOBAL' else country, len(data))

            except FileNotFoundError:
                print(f"File not found: {excel_path}")
            except ValueError:
                print(f"Sheet not found: {country} in {excel_path}")
            except Exception as e:
                print(f"Error processing {excel_path}: {e}")
        file_json[file_name] = temp

# JavaScript 파일 형식으로 저장
output_file = "file_list.js"
with open(output_file, "w", encoding="utf-8") as f:
    f.write(f"const fileList = {json.dumps(file_json, indent=4)};")

print(f"File list saved to {output_file}")