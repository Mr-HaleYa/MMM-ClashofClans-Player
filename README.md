# MMM-ClashofClans-Player

This is a MagicMirror Module which shows you the Name, the actual Trophies and the Clan of an Player

## Screenshot

## Requirements

- You need an active Clash of Clans Developer Account. You can register yourself one at https://developer.clashofclans.com/#/register
- You need an Token from your Account, which you can generate at https://developer.clashofclans.com/#/account


## Installation

1. You have to go to the `modules`folder

````javascript
cd ~/MagicMirror/modules
````

2. Clone this module into that folder:

````javascript
git clone https://github.com/AdmiralMurtho/MMM-ClashofClans-Player.git
````

3. Configure this module in your MagicMirror config file

````javascript
sudo nano ~/MagicMirror/config/config.js

{
  module: "MMM-ClashofClans-Player",
  position: "bottom_right",
  config: {
    updateInterval: 60*60*1000,
    playerTag: '',  //Without the Hashtag (#)
    playerToken: '' //The token, which you get from the developer Site
  }
},
````
