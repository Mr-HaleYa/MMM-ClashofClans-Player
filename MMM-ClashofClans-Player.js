Module.register("MMM-ClashofClans-Player", {
    defaults: {
        updateInterval: 15 * 60 * 1000, //Alle 15 Minuten
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
            var name = document.createElement("span");
            name.appendChild(document.createTextNode(this.playerName));
            wrapper.appendChild(name);
            var trophies = document.createElement("span")
            trophies.appendChild(document.createTextNode(this.trophies))
            wrapper.appendChild(trophies)
            var test = document.createElement("span")
            test.appendChild((document.createTextNode("Ja")))
            wrapper.appendChild(test)
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