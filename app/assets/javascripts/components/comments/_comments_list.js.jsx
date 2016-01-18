var CommentsList = React.createClass({
    getInitialState: function(){
        return {comments: this.props.comments || []};
    },
    
    handleDeleteClick: function(id){
        this.props.onDeleteCommentClick(id);
    },
    
    handleEditClick: function(formData, id, author, text){
        this.props.onEditCommentClick(formData, id, author, text);
    },
    
    render: function(){
        var comments = this.state.comments.map(function(comment){
            return (
                <Comment key={comment.id} comment={comment} onDeleteClick={this.handleDeleteClick} onEditCommentSubmit={this.handleEditClick} />
            );
        }, this);
        
        var is_visible = this.state.comments.length > 0 ? "show" : "hide" ;
        return (
            <div className={is_visible}>
                <h3>Comments</h3>
                <div className="commentsList">
                    { comments }            
                </div>
                <hr/>
            </div>
        );
    }
});