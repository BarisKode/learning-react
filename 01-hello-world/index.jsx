var MyForm = React.createClass({
    render: function () {
        return <div>
            <h2>Hello World, this is ReactJS!</h2>
        </div>
    }
});

ReactDOM.render(<MyForm/>, document.getElementById('app'));