var CommentsBox = React.createClass({
    getInitialState: function(){
        return {comments: this.props.comments || []};
    },
    
    handleCommentSubmit: function(formData){
        $.ajax({
            data: formData,
            url: "/comments",
            type: "POST",
            dataType: "json",
            success: function ( newComment ) {
              this.pushNewComment(newComment);
            }.bind(this) 
        });
    },
    
    pushNewComment: function(newComment){
        var newComments = this.state.comments;
        newComments.push(newComment);
        this.setState({comments: newComments});
    },
    
    handleDeleteComment: function(id){
        
        var action = "comments/" + id;
        var data = "id=" + id;
        $.ajax({
            data: data,
            url: action,
            type: "DELETE",
            dataType: "json",
            success: function(data){
                this.deleteComment(id);
            }.bind(this, id)
        });
    },
    
    deleteComment: function(id){  
        var indexToDelete = this.getIndexById(id);
        var newComments = this.state.comments;
        newComments.splice(indexToDelete, 1);
        this.setState({comments: newComments});
    },
    
    getIndexById: function(id){
		var index;
		
		for (var i=0; i<this.state.comments.length; i++)
		{
			if(this.state.comments[i].id == id){
				index = i;
				break;
			}
		}

		return index;
	},
	
	handleEditComment: function(formData, id, author, text){
		    
        var action = "comments/" + id;
        $.ajax({
            data: formData,
            url: action,
            type: "PATCH",
            dataType: "json",
            success: function(data){
                this.editComment(id, author, text);
            }.bind(this, id, author, text)
        });
	},
	
	editComment: function(id, author, text){
		
        var indexToEdit = this.getIndexById(id);
        var arrComments = this.state.comments;
        arrComments[indexToEdit].author = author;
		arrComments[indexToEdit].text = text;
		
        this.setState({comments: arrComments});
    },
    
    render: function(){
        return (
            <div className="commentsBox">
                <header>
                    <h2>React is a great Library</h2>
                    <p>
                        It's really great library that works great with MVC server side technologies.
                        It's really great library that works great with MVC server side technologies.
                        It's really great library that works great with MVC server side technologies.
                        It's really great library that works great with MVC server side technologies.
                        It's really great library that works great with MVC server side technologies.
                        It's really great library that works great with MVC server side technologies.
                    </p>
                    <strong><p>By: Ahmed Bahaggag</p></strong>
                </header>
                
				<hr/>
				<CommentsList comments={this.state.comments} onDeleteCommentClick={this.handleDeleteComment} onEditCommentClick={this.handleEditComment} />
				
				<CommentsForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});