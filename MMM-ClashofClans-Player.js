Module.register("MMM-ClashofClans-Player", {
    defaults: {
        updateInterval: 20000,
        playerTag: "YQLQ902Y", //Without the Hashtag
    },

    start: function () {
        Log.info(`Starting Module: ${this.name}`);

        this.playerName = ''
        this.trophies = ''
        this.loaded = false
        this.counter = 0

        this.sheduleUpdate()
    },

    getPlayerStats: function() {
        this.sendSocketNotification('GET-PLAYER-STATS', this.playerTag);
    },

    getDom: function () {
        if(this.loaded){
            var wrapper = document.createElement("div");
            var compliment = document.createElement("span");
            compliment.appendChild(document.createTextNode(this.config.playerName));
            wrapper.appendChild(compliment);
        } else {
            var wrapper = document.createElement("div");
            wrapper.innerHTML = 'Daten werden geladen...' + this.counter
            this.counter = this.counter + 1
        }


        return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {
        switch (notification) {
            case 'GOT-PLAYER-STATS':
                this.getPlayerStats(payload)
                this.playerName = payload.name
                this.trophies = payload.trophies
                this.loaded = true
                this.updateDom()
                break
            default:
                this.updateDom()
                break
        }
    },
    sheduleUpdate: function() {
        setInterval(() => {
            this.getPlayerStats()
        }, this.config.updateInterval)
        this.getPlayerStats()
    }
})