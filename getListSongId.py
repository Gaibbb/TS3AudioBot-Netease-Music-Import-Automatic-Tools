import requests
from bs4 import BeautifulSoup
import re
import json
import subprocess
import os

playlistId = input("Please enter the playlist id: ")
addr = input("Please enter the server address: ")
port = input("Please enter the server port: ")
listId = input("Please enter the target list id: ")
token = input('Please enter your token: ')

url = "https://music.163.com/playlist?id=" + playlistId

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    'Cookie': 'os=pc'
}

response = requests.get(url, headers = headers)
response.encoding = response.apparent_encoding

with open('output.html', 'w', encoding = 'utf-8') as file:
    file.write(response.text)

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
with open('song.json', 'w', encoding = 'utf-8') as file:
    file.write(data)

scriptPath = 'get.js'

def subprocess_script():
    process = subprocess.Popen(['node', scriptPath, addr, port, listId, token], stdout=subprocess.PIPE, text=True)
    stdout, stderr = process.communicate()

    print(stdout)
    print(stderr)
    process.wait()
    print(process.returncode)

subprocess_script()

try:
    os.remove('song.json')
    os.remove('output.html')
except OSError as e:
    print(f"Error: {e.filename} - {e.strerror}")