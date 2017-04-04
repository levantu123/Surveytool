
function element(e) {
    return {
        newTask: ko.observable(new Task(e.type)),
        allowNewTask: ko.observable(true),


        selectedTask: ko.observable(),

        clearTask: function (data, event) {
            if (data === self.selectedTask()) {
                selectedTask(null);
            }

            if (data.name() === "") {
                menu_btns_list.remove(data);
            }
        },

        isTaskSelected: function (task) {
            return task === selectedTask();
        },

    }
}


function obs(question) {
    return {
        type: ko.observable(question.type),
        title: ko.observable(question.title),
        choices: ko.observableArray(question.choices)
    }
}

function newMultiple() {
    return {
        type: ko.observable('bmultiple'),
        qtype: ko.observable('qmultiple'),
        title: ko.observable('New Multiple'),
        choices: ko.observableArray([
            { choice_value: 'Add More' }])
    }
}

function newDropdown() {
    return {
        type: ko.observable('bdropdown'),
        qtype: ko.observable('qdropdown'),
        title: 'New Dropdown',
        choices: ko.observableArray([
            { choice_value: 'Add More' }])
    }
}

function Task(type) {
    if (type === 'bmultiple') return new newMultiple();
    if (type === 'bdropdown') return new newDropdown();
}

function btns() {
    return {
        menu_btns_list: [
            new element({ type: 'bmultiple' }),
            new element({ type: 'bdropdown' }),
            new element({ type: 'bmultiple' }),
            new element({ type: 'bmultiple' }),
            new element({ type: 'bmultiple' })
        ],

    };
}
function tuMenuBuilder() {
    return {
        menu_btns_list: ko.observableArray(new btns().menu_btns_list)
    }
}


function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
