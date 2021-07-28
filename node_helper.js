var NodeHelper = require('node_helper')
var request = require('request')

module.exports = NodeHelper.create({
    start: function() {
        console.log('MMM-ClashofClans-Player helper, started...')

        this.PlayerName = ''
        this.trophies = null
    },

    getPlayerStats: function(payload) {
        var that = this
        this.url = 'https://api.clashofclans.com/v1/players/%23' + payload

        request({url: this.url, method: 'GET'}, function(error, response, body) {
            var result = JSON.parse(body)
            if(!error && response.statusCode == 200){
                that.PlayerName = result[0].name
                that.trophies = result[0].trophies
            } else {
                that.playerName = 'Error'
            }
            that.sendSocketNotification('GOT-PLAYER-STATS', {'name': that.playerName, 'trophies': that.trophies})
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