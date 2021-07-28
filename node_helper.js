var NodeHelper = require('node_helper')
var request = require('request')

module.exports = NodeHelper.create({
    start: function() {
        console.log('MMM-ClashofClans-Player helper, started...')

        this.PlayerName = ''
        this.trophies = null
    },

    getPlayerStats: function(payload) {
        //var that = this
        this.url = 'https://api.clashofclans.com/v1/players/%23' + payload

        request({
            url: this.url,
            method: 'GET'
        }, (error, response, body) => {

            if(!error && response.statusCode == 200){
                var result = JSON.parse(body)
                this.PlayerName = result.name
                this.trophies = result.trophies
            } else {
                this.playerName = 'Error'
            }
            this.sendSocketNotification('GOT-PLAYER-STATS', {'name': this.PlayerName, 'trophies': this.trophies})
        })
    },

    socketNotificationReceived: function(notification, payload) {
        switch (notification) {
            case 'GET-PLAYER-STATS':
                this.getPlayerStats(payload)
                break
            default:
                break
        }
    }
})