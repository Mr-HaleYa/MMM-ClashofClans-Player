Module.register("MMM-ClashofClans-Player", {
    defaults: {
        updateInterval: 20 * 1000, //Alle 15 Minuten
        playerTag: "YQLQ902Y", //Without the Hashtag
    },

    start: function () {
        Log.info(`Starting Module: ${this.name}`);

        this.playerName = ''
        this.trophies = ''
        this.ranking_src = ''
        this.clan_src = ''
        this.clan_name = ''
        this.loaded = false

        this.sheduleUpdate()
    },

    getStyles: function () {
        return ['MMM-ClashofClans-Player.css'];
    },

    getPlayerStats: function() {
        this.sendSocketNotification('GET-PLAYER-STATS', this.playerTag);
    },

    getDom: function () {
        if(this.loaded){
            /*var wrapper = document.createElement("div");
            wrapper.innerHTML = this.playerName;*/
            var wrapper = document.createElement("div");
            wrapper.classList.add("container")

            var name_container = document.createElement("div")
            var span = document.createElement("span")
            span.appendChild(document.createTextNode("huhu"))
            name_container.appendChild(span)
            name_container.classList.add("container")
            wrapper.appendChild(name_container)

            /*let stats_container = document.createElement("div")
            stats_container.classList.add("container")

            let ranking = document.createElement("div")
            ranking.classList.add("half")
            let ranking_title = document.createElement("span")
            ranking_title.classList.add("header")
            ranking_title.appendChild(document.createTextNode("Ranking"))
            ranking.appendChild(ranking_title)

            let ranking_details = document.createElement("div")
            ranking_details.classList.add("header")
            ranking_details.appendChild(
                document.createElement("img")
                    .src = this.ranking_src
            )
            ranking_details.appendChild(
                document.createElement("span")
                    .appendChild(document.createTextNode(this.trophies))
            )
            ranking.appendChild(ranking_details)


            let clan = document.createElement("div")
            clan.classList.add("half")
            let clan_title = document.createElement("span")
            clan_title.classList.add("header")
            clan_title.appendChild(document.createTextNode("Clan"))
            clan.appendChild(clan_title)
            let clan_details = document.createElement("div")
            clan_details.classList.add("header")
            clan_details.appendChild(
                document.createElement("img")
                    .src = this.clan_src
            )
            clan_details.appendChild(
                document.createElement("span")
                    .appendChild(document.createTextNode(this.clan_name))
            )
            clan.appendChild(clan_details)

            stats_container.appendChild(ranking)
            stats_container.appendChild(clan)
            wrapper.appendChild(stats_container)*/
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
                //this.clan_name = payload.clan.name
                //this.clan_src = payload.clan.badgeUrls.medium
                //this.ranking_src = payload.league.iconUrls.medium
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
        }, 20*1000)
        this.getPlayerStats()
    }
})