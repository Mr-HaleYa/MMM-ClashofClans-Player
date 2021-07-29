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
        this.url = 'https://api.clashofclans.com/v1/players/%23' + payload.name
        this.token = payload.token

        request({
            url: this.url,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        }, (error, response, body) => {
            var result = null;
            if(!error && response.statusCode == 200){
                result = JSON.parse(body)
            } else {
                result = null
            }
            that.sendSocketNotification('GOT-PLAYER-STATS', result)
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

