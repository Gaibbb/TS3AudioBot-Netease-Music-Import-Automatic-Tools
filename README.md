# TS3AudioBot-Netease-Music-Import-Automatic-Tools
A automatic tools for the Netease Music user to import playlist to ts3audiobot.
由于本人技术水平有限，此脚本不能保证运行起来百分百没问题，并且该脚本无法添加Vip歌曲。如果有运行上的问题可以提Issues或者电子邮件联系我，也可以自己修改代码来解决，代码写得很丑，请原谅555    
此脚本没有重复检查机制，也就是说会重复导入已有的歌曲，看看以后什么时候水平够了完善一下。

# How to use?
使用前请确保拥有Python3与NodeJS环境，并且Python已经安装了BeautifulSoup与lxml库。

```Shell
# 使用Python运行AddSong.py脚本
# 输入参数分别有:
# argv[1]: 网易云歌单的id
# argv[2]: Teamspeak服务器的地址
# argv[3]: TS3 AudioBot的监听端口
# argv[4]: 将歌曲添加到的歌单名
# argv[5]: 访问TS3 AudioBot的Token

ame@114514:~/TS3AudioBot-Netease-Music-Import-Automatic-Tools$  python3 AddSong.py 413670147 address port GaibRua_Favourite_Music token==
The following songs will be add into the GaibRua_Favourite_Music

New playlist GaibRua_Favourite_Music created success.
HTML 204, nothing to return
songId = 142420  songName = G大调第一大提琴组曲: 前奏曲
songId = 293436  songName = 神秘园之歌
songId = 406238  songName = Flower Dance
songId = 409353  songName = さくらさくら ~ Japanize Dream
songId = 442760  songName = 月光の雲海
songId = 460528  songName = 白金ディスコ
songId = 463775  songName = やわらかな時間
songId = 475563  songName = shizukana umi
songId = 493911  songName = 夏恋
songId = 498187  songName = βίος &lt;MK+nZk Version&gt;
songId = 526611  songName = 回想
songId = 536229  songName = 深海鱼
……
songId = 2028375883  songName = 忘れないでベイベー
songId = 2029892284  songName = Ahead of Us
songId = 2031870107  songName = Paradox
songId = 2034454236  songName = 海愿
songId = 2045878962  songName = 光の中へ
songId = 2045878963  songName = 青い春と西の空
songId = 2051328176  songName = 僕らはそれを愛と呼んだ
songId = 2052933626  songName = 花一匁
songId = 2055198410  songName = it begins
songId = 2057696725  songName = spiral
songId = 2060086839  songName = 壱雫空
songId = 2064724623  songName = Memories of Kindness
songId = 2074091141  songName = NAME
songId = 2074119582  songName = 碧天伴走
songId = 2077743614  songName = 風景はせはしく明滅し
songId = 2077744366  songName = 向日葵の嵐が過ぎ去り
songId = 2095883498  songName = 怪獣の花唄 - replica -
songId = 2097485069  songName = 迷星叫
songId = 2097485072  songName = 影色舞
songId = 2097486091  songName = 迷路日々
songId = 2098477533  songName = Constant Moderato Piano Arrange
songId = 2098478355  songName = RE Aoharu
songId = 2102378407  songName = 処救生
All songs have been add to the playlist

None
0
