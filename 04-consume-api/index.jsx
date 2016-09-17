var data = [];

var InitialForm = React.createClass({
    loadFoodFromServer: function () {
        $.ajax({
            url: this.props.url,
            contentType: 'application/json',
            dataType: 'json',
            cache: false,
            success: function (data) {
                //console.log(data);
                this.setState({
                    data: data
                });

            }.bind(this),
            error: function (xhr, status, message) {
                console.error(this.props.url, status, message.toString())
            }.bind(this)
        });
    },

    getInitialState: function () {
        return {
            data: []
        }
    },

    componentDidMount: function () {
        //this.loadFoodFromServer();
        setInterval(this.loadFoodFromServer(), this.props.pollInterval)
    },

    render: function () {
        return (
            <div className="content">
                <h1>List Project</h1>
                <FormList data={this.state.data}/>
            </div>
        );
    }
});

var FormList = React.createClass({
    render: function () {
        var listNodes = this.props.data.map(function (data) {
            // name, link, description, start, fork, watch, language
            return (
                <List name={data.name} link={data.html_url} description={data.description} start={data.stargazers_count}
                      fork={data.forks_count} watch={data.watchers_count} language={data.language}>
                </List>
            );
        });

        return <div className="row frm-list">
            {listNodes}
        </div>
    }
});

var List = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.description.toString());

        return {__html: rawMarkup};
    },

    render: function () {
        return (
            <div className="col-xs-12 col-md-12 thumbnail">
                <h4>
                    <a href={this.props.link} target="_blank">{this.props.name}</a>
                </h4>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
                <div className="project-detail">
                    <ul className="detail-list">
                        <li><i className="glyphicon glyphicon-star"></i>&nbsp;{this.props.start}</li>
                        <li><i className="glyphicon glyphicon-eye-open"></i>&nbsp;{this.props.watch}</li>
                        <li><i className="glyphicon glyphicon-globe"></i>&nbsp;{this.props.language}</li>
                    </ul>
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <InitialForm url="https://api.github.com/users/rohmad-st/repos" pollInterval={500}/>,
    document.getElementById('app')
);