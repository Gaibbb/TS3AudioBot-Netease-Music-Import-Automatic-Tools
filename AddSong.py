import requests
from bs4 import BeautifulSoup
import re
import json
import subprocess
import os
import sys
import time
import platform

def get_song_list(play_list_id):
    url = "https://music.163.com/playlist?id=" + play_list_id

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
        'Cookie': 'os=pc'
    }

    response = requests.get(url, headers)
    response.encoding = response.apparent_encoding

    soup = BeautifulSoup(response.text, 'lxml')

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

    if platform.system() == "Linux":
        os.remove('song.json')
    elif platform.system() == "Windows":
        os.unlink('song.json')

def create_list(addr, port, list_id, token):
    url = "http://" + addr + ":" + "/api/bot/use/0/(/list/create/id/id)"
    surl = "http://" + addr + ":" + "/api/bot/use/0/(/list/list/id)"

    headers = {
        'Authorization': 'Basic ' + token,
        'Content-Type': 'application/json'
    }

    response = requests.get(surl, headers)
    print(response.text)

def main():
    if len(sys.argv) == 6:
        play_list_id = sys.argv[1]
        addr = sys.argv[2]
        port = sys.argv[3]
        list_id = sys.argv[4]
        token = sys.argv[5]
    else:
        print("Please enter the right arguments.")
        exit()

    get_song_list(play_list_id)
    create_list(addr, port, list_id, token)

main()