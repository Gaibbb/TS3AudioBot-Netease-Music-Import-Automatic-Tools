import requests
from bs4 import BeautifulSoup
import re
import json
import os

url = "https://music.163.com/playlist?id=786711774"

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    # 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
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