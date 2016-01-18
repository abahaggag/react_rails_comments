var CommentsForm = React.createClass({
    handleSubmit: function(event){
        event.preventDefault();
        
        var author = this.refs.author.value;
        var text = this.refs.text.value;
        
        if (!author || !text){
            alert("author and comment are required");
            return false;
        }
        
        var formData = $(this.refs.form).serialize();
        this.props.onCommentSubmit(formData);
        
        this.refs.author.value = "";
        this.refs.text.value = "";
    },

    render: function(){
        return (
            <div>
                <h3>Add Your Comment</h3>
                <div className="commentsForm">
                    <form ref="form" action="/comments" method="post" acceptCharset="UTF-8" onSubmit={this.handleSubmit}>
                        <p><input ref="author" type="text" placeholder="Your Name Here" name="comment[author]" /></p>
                        <p><textarea ref="text" placeholder="Your Comment Here" name="comment[text]" /></p>
                        <p><button type="submit">Post Comment</button></p>
                    </form>
                </div>
            </div>
        );
    }
});