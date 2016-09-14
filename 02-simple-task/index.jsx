var Task = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            text: ''
        }
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var nextData = this.state.data.concat([{text: this.state.text, id: Date.now()}]);
        var nextText = '';
        this.setState({data: nextData, text: nextText});
    },

    onChange: function (e) {
        this.setState({text: e.target.value});
    },

    render: function () {
        return <div class="task">
            <h4>Simple Task</h4>
            <TaskList data={this.state.data}/>
            <form>
                <input type="text" onChange={this.onChange} value={this.state.text}/>
                <button type="button" onClick={this.handleSubmit}>{'Add #' + (this.state.data.length + 1)}</button>
            </form>
        </div>
    }
});

var TaskList = React.createClass({
    render: function () {
        var listItem = function (item) {
            return <li key={item.id}>{item.text}</li>
        };

        return <ul>{this.props.data.map(listItem)}</ul>
    }
});


ReactDOM.render(<Task/>, document.getElementById('app'));