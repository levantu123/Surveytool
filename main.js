function obs(question) {
    return {
        qtype: ko.observable(question.type),
        title: ko.observable(question.title),
        choices: ko.observableArray(question.choices)

    }
}
function obj(survey) {
    return {
        id: ko.observable(survey.id),
        name: ko.observable(survey.name),
        questions: ko.observableArray(survey.questions),

        afterRenderCallback: function (elem, model) {
            if ($(elem).is(".infuser-loading")) {
                console.log("afterAdd invoked but this is still the loading template");
            }
            else {
                console.log("afterAdd invoked for " + model.name + ", " + name + ".  This is the real template.");

            }
        },
        drop: function drop(ev) {
            alert("hello");
        }

    }
}
survey1 = {
    id: 1,
    name: "First survey",
    questions: [
        new obs({
            type: 'qmultiple',
            title: 'What is your name?',
            choices: [
                { choice_value: 'My name is Tu' },
                { choice_value: 'Iam Minh Nguyen' },
                { choice_value: 'I dont know' },
                { choice_value: 'hello' }]
        }),
        new obs({
            type: 'qmultiple',
            title: 'What color do you like',
            choices: [
                { choice_value: 'Red' },
                { choice_value: 'Green' },
                { choice_value: 'Pink' }]
        }),
        new obs({
            type: 'qdropdown',
            title: 'what kind of film do you like',
            choices: [
                { choice_value: 'Cartoon' },
                { choice_value: 'honor' },
                { choice_value: 'Romantic' }]
        })]
}

function drop(ev) {
    alert("hello");
}

function allowDrop(ev) {
    ev.preventDefault();
}


$(function () {


    infuser.defaults.templateUrl = "templates";
    var n = new tuMenuBuilder();




    ko.bindingHandlers.visibleAndSelect = {
        update: function (element, valueAccessor) {
            ko.bindingHandlers.visible.update(element, valueAccessor);
            if (valueAccessor()) {
                setTimeout(function () {
                    $(element).find("input").focus().select();
                }, 0); //new tasks are not in DOM yet
            }
        }
    };


    function Task() {
        return {
            this: new obs({
                type: 'qdropdown',
                title: 'what kind of film do you like',
                choices: [
                    { choice_value: 'Cartoon' },
                    { choice_value: 'honor' },
                    { choice_value: 'Romantic' }]
            })
        }
    }

    ko.applyBindings(
        {
            isEditable: ko.observable(false),
            items: ko.observable(new obj(survey1)),
            items2: ko.observable(n),
            whichTemplateToUse2: function () {
                return 'menu';
            },
            whichTemplateToUse: function () {
                return 'view';
            },
        });
})