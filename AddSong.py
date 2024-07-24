import requests
import json
import sys
import urllib.parse
import time
import math

def get_song_list_kg(play_list_id, headers):
    url_src = "http://121.37.225.70:4001/playlist/track/all?pagesize=300&id=" + play_list_id
    response = requests.get(url_src, headers=headers)
    count = json.loads(response.text)['data']['count']
    for i in range(math.ceil(count / 300)):
        i += 1
        url = "http://121.37.225.70:4001/playlist/track/all?page=" + i + "&pagesize=300&id=" + play_list_id

        response = requests.get(url, headers=headers)
        data = json.loads(response.text)
        data = data['data']['info']
        song_list_len_src = len(data)
        print(f"song list len = {song_list_len_src}")
        song_list_name = []
        song_list_hash = []
        for i in range(song_list_len_src):
            song_name = data[i]['name']
            song_hash = data[i]['hash']
            song_list_name.append(song_name)
            song_list_hash.append(song_hash)

    return song_list_name, song_list_hash, song_list_len_src

def get_song_url_kg(song_list_name, song_list_hash, song_list_len):
    url_list = []
    for i in range(song_list_len):
        hash = song_list_hash[i]
        url = "http://121.37.225.70:4001/song/url?hash=" + hash
        response = requests.get(url)
        data = json.loads(response.text)
        
        if "url" in data:
            url_list.append([[song_list_name[i]], data['url'][0]])
            print(f"Import successfully: {song_list_name[i]}")
        else:
            print(f"Not import success: {song_list_name[i]}")

        time.sleep(0.5)

    return url_list

def list_search(addr, port, list_id, headers):
    url = "http://" + addr + ":" + port + "/api/bot/use/0/(/list/create/" + list_id + "/" + list_id 
    surl = "http://" + addr + ":" + port + "/api/bot/use/0/(/list/list"

    response = requests.get(surl, headers=headers)
    data = json.loads(response.text)

    for i in range(len(data)):
        if data[i]['Title'] == list_id:
            print("List existed")
            return data[i]['SongCount']
        elif i == (len(data) - 1) and data[i]['Title'] != list_id:
            response = requests.get(url, headers=headers)
            if response.status_code == 204:
                print("list", list_id, "created successfully.")
                return 0
            else:
                print(response.status_code)

def add_song_kg(addr, port, song_list, song_list_len, listId, song_begin_number, headers):
    print("Ready to add", song_list_len, "songs to list", listId)

    for i in range(song_list_len):
        song_name = song_list[i][0]
        song_url = song_list[i][1]
        songurl_trans = urllib.parse.quote(song_url, safe='')
        addurl = "http://" + addr + ":" + port + "/api/bot/use/0/(/list/add/" + listId + "/" + songurl_trans + ")"
        nameurl = "http://" + addr + ":" + port + "/api/bot/use/0/(/list/item/name/" + listId + "/" + str(song_begin_number) + "/" + song_name

        response = requests.get(addurl, headers=headers)
        response1 = requests.get(nameurl, headers=headers)

        print(f"Add song {song_name} to the list")
        song_begin_number += 1
        time.sleep(1)

def main():
    print("Script start...\n")

    if len(sys.argv) == 6:
        play_list_id = sys.argv[1]
        addr = sys.argv[2]
        port = sys.argv[3]
        list_id = sys.argv[4]
        token = sys.argv[5]
    else:
        print("Please enter the right arguments.")
        exit()

    headers_auth = {
        'Authorization': 'Basic ' + token,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
    }

    song_number = list_search(addr, port, list_id, headers_auth)
    song_list_name, song_list_hash, song_list_len = get_song_list_kg(play_list_id, headers_auth)
    url_list = get_song_url_kg(song_list_name, song_list_hash, song_list_len)
    list_len = len(url_list)
    # add_song_kg(addr, port, url_list, list_len, list_id, song_number, headers_auth)

main()