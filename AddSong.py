import requests
import re
import json
import os
import sys
import platform

def get_song_list(play_list_id):
    url = "http://121.37.225.70:4000/playlist/track/all?id=" + play_list_id

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    }

    response = requests.get(url, headers)
    response.encoding = response.apparent_encoding

    data = json.loads(response.text)
    songs_add = []
    list_length = len(data['songs'])

    for i in range(list_length):
        songs_add.append([0, 0])
        song_name = data['songs'][i]['name']
        song_id = data['songs'][i]['id']
        songs_add[i][0] = song_name
        songs_add[i][1] = song_id

    return songs_add, list_length
    # if platform.system() == "Linux":
    #     os.remove('song.json')
    # elif platform.system() == "Windows":
    #     os.unlink('song.json')

    # with open('song.json', 'w', encoding = 'utf-8') as file_json:
    #     file_json.write(songs_add)


def create_list(addr, port, list_id, token):
    url = "http://" + addr + ":" + port + "/api/bot/use/0/list/create/id/id"
    surl = "http://" + addr + ":" + port + "/api/bot/use/0/(/list/list/" + list_id + ")"

    headers = {
        'Authorization': 'Basic ' + token,
        'Content-Type': 'application/json'
    }

    response = requests.get(surl, headers)
    print(response.text)


def add_song(addr, port, songs_json, song_list_len, listId):
    for i in range(song_list_len):
        songName = songs_json[i][0]
        songId = songs_json[i][1]
        addurl = "http://" + addr + ":" + port + "/api/bot/use/0/(/list/add/listId/http%3A%2F%2Fmusic.163.com%2Fsong%2Fmedia%2Fouter%2Furl%3Fid%3D" + songId + "}.mp3"
        nameurl = "http://" + addr + ":" + port + "/api/bot/use/0/(/list/item/name/" + listId + "/" + songBeginNumber + "/" + songName


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


    # get_song_list(play_list_id)
    create_list(addr, port, list_id, token)

main()