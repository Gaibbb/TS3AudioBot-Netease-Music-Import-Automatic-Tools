import requests
from bs4 import BeautifulSoup
import re
import json
import subprocess
import os
import sys
import time

arg = []

argv_name = ['playlistId', 'addr', 'port', 'listId', 'token']

if len(sys.argv) == 6:
    for i in range(5):
        arg.append(sys.argv[i + 1])
else:
    # for i in range(len(arg)):
    #    arg[i] = input(f"Please enter the {argv_name[i]}: ")
    print("Please enter the right arguments.")
    exit()

url = "https://music.163.com/playlist?id=" + arg[0]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    'Cookie': 'os=pc'
}

response = requests.get(url, headers = headers)
response.encoding = response.apparent_encoding

with open('output.html', 'w', encoding = 'utf-8') as file_html:
    file_html.write(response.text)

fp = open('output.html', 'r', encoding='utf-8')
soup = BeautifulSoup(fp, 'lxml')

ul = soup.find('ul', class_ = 'f-hide')
a_list = ul.find_all('a')

data = {}

for a in a_list:
    name_match = re.search(r'<a\s.*?>(.*?)<\/a>', str(a))
    id_match = re.search(r'<a\s.*?href="/song\?id=(\d+)".*?', str(a))
    data[id_match.group(1)] = name_match.group(1)

data = json.dumps(data, indent = 2)
with open('song.json', 'w', encoding = 'utf-8') as file_json:
    file_json.write(data)

scriptPath = 'get.js'

def subprocess_script():
    process = subprocess.Popen(['node', scriptPath, arg[1], arg[2], arg[3], arg[4]], stdout=subprocess.PIPE, text=True, encoding = 'utf-8')
    stdout, stderr = process.communicate()

    print(stdout)
    print(stderr)
    process.wait()
    print(process.returncode)

subprocess_script()
time.sleep(10)

file_html.close()
file_json.close()

os.remove('song.json')
os.remove('output.html')