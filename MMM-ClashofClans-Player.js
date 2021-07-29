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
            wrapper.classList.add("container_clash")

            var name_container = document.createElement("div")
            var span = document.createElement("span")
            span.appendChild(document.createTextNode(this.playerName))
            name_container.appendChild(span)
            name_container.classList.add("container_clash")
            wrapper.appendChild(name_container)

            var stats_container = document.createElement("div")
            stats_container.classList.add("container_clash")

            var ranking = document.createElement("div")
            ranking.classList.add("half")
            var ranking_title = document.createElement("span")
            ranking_title.classList.add("header")
            ranking_title.appendChild(document.createTextNode("Ranking"))
            ranking.appendChild(ranking_title)

            var ranking_details = document.createElement("div")
            ranking_details.classList.add("header")
            var immage_rank = document.createElement("img")
            immage_rank.src = this.ranking_src
            //image_rank.classList.add("CoC_images")
            ranking_details.appendChild(immage_rank)
            var trophies_span = document.createElement("span")
            trophies_span.appendChild(document.createTextNode(this.trophies))
            ranking_details.appendChild(trophies_span)
            ranking.appendChild(ranking_details)

            stats_container.appendChild(ranking)

            /*var clan = document.createElement("div")
            clan.classList.add("half")
            var clan_title = document.createElement("span")
            clan_title.classList.add("header")
            clan_title.appendChild(document.createTextNode("Clan"))
            clan.appendChild(clan_title)
            var clan_details = document.createElement("div")
            clan_details.classList.add("header")
            var immage_clan = document.createElement("img")
            image_clan.src = this.clan_src
            image_clan.classList.add("CoC_images")
            clan_details.appendChild(immage_clan)
            var clan_span = document.createElement("span")
            clan_span.appendChild(document.createTextNode(this.clan_name))
            clan_details.appendChild(clan_span)
            clan.appendChild(clan_details)

            stats_container.appendChild(ranking)
            stats_container.appendChild(clan)*/
            wrapper.appendChild(stats_container)
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
                this.clan_name = payload.clan.name
                this.clan_src = payload.clan.badgeUrls.medium
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
        }, 20*1000)
        this.getPlayerStats()
    }
})