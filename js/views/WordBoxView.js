site.views.WordBoxView = Backbone.View.extend({

    initialize : function(){
        var chosenWord = this.chooseWord();
        this.render(this.createModel(chosenWord));
    },

    render : function(wordModel){
        var wordView = new site.views.WordView({model: wordModel});
        this.$el.append(wordView.render().el);
    },

    loadXML : function(filename){
        if (window.XMLHttpRequest) {
            var xhttp = new XMLHttpRequest();
        } else {
            var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("GET", filename, false);
        xhttp.send();
        return xhttp.responseXML;
    },

    chooseWord : function(){
        var xml = this.loadXML("xml/words.xml");
        var words = xml.getElementsByTagName("word");
        var randomNumber = Math.floor(Math.random() * words.length);
        var word = words[randomNumber];
        return word.innerHTML;
    },

    createModel : function(word){
        var dottedWord = "";
        for(var i = 0; i < word.length; i++){
            dottedWord += "_";
        }

        return new site.models.Word({
            guessWord : word.toUpperCase(),
            shownWord : dottedWord
        });
    }
});