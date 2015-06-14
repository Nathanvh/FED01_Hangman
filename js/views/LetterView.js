site.views.LetterView = Backbone.View.extend({
    tagName : "div",
    className : "letter",

    events : {
        'click' : 'disable'
    },

    template : _.template($("#letterTemplate").html()),

    render : function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    disable : function(e){
        e.preventDefault();
        if(this.model.get("enabled")){
            this.$el.addClass("clicked");
            this.model.set("enabled", false);
            site.events.trigger("sendClickedLetter", this.model.get("letter"));
        }
    }
});

