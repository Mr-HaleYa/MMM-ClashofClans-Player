Module.register("MMM-ClashofClans-Player", {
    defaults: {
        updateInterval: 60 * 60 * 1000, //Every 60 Minutes
        playerTag: '', //Without the Hashtag
        playerToken: '' //This is available on https://developer.clashofclans.com -> My Account
    },

    start: function () {
        Log.info(`Starting Module: ${this.name}`);

        this.playerName = ''
        this.trophies = ''
        this.ranking_src = ''
        this.vtrophies = ''
        this.loaded = false
        this.sheduleUpdate()
    },

    getStyles: function () {
        return ['MMM-ClashofClans-Player.css'];
    },

    getPlayerStats: function() {
        this.sendSocketNotification('GET-PLAYER-STATS', {'name': this.config.playerTag, 'token': this.config.playerToken});
    },

    getDom: function () {
        if(this.loaded){
            var wrapper = document.createElement("div");

            var name_container = document.createElement("div")
            name_container.classList.add("CoC_container")
            var span = document.createElement("span")
            span.appendChild(document.createTextNode(this.playerName))
            name_container.appendChild(span)
            wrapper.appendChild(name_container)

            var ranking_details = document.createElement("div")
            ranking_details.classList.add("header")
            var immage_rank = document.createElement("img")
            immage_rank.classList.add("CoC_image")
            immage_rank.src = this.ranking_src
            ranking_details.appendChild(immage_rank)
            var trophies_span = document.createElement("span")
            trophies_span.appendChild(document.createTextNode(this.trophies))
            ranking_details.appendChild(trophies_span)
            wrapper.appendChild(ranking_details)

            var bb_ranking_details = document.createElement("div")
            bb_ranking_details.classList.add("header")
            var bb_trophies_span = document.createElement("span")
            bb_trophies_span.appendChild(document.createTextNode("VT : " + this.vtrophies))
            bb_ranking_details.appendChild(bb_trophies_span)
            wrapper.appendChild(bb_ranking_details)

        } else {
            var wrapper = document.createElement("div");
            wrapper.innerHTML = 'Loading Data...' + this.counter
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
                this.vtrophies = payload.versusTrophies
                this.ranking_src = payload.league.iconUrls.medium
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
