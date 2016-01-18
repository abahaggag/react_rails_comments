var Comment = React.createClass({
    getInitialState: function(){
        return {comment: this.props.comment, editing: false};
    },
    
    handleDeleteClick: function(){
        var ans = confirm("are you sure?");

        if (ans) {
            this.props.onDeleteClick(this.state.comment.id);
        }
    },
    
    handleEditClick: function(){
        this.setState({editing: true});
    },
    
    renderDisplay: function(){
        return (
            <div className="comment">
                <h4>Author: {this.state.comment.author} | {this.state.comment.created_at}</h4>
                <p>{this.state.comment.text}</p>
                <button onClick={this.handleDeleteClick}>Delete</button>
                <button onClick={this.handleEditClick}>Edit</button>
            </div>
        );
    },
    
    handleEditSubmit: function(event){
        event.preventDefault();
        
        var author = this.refs.author.value;
        var text = this.refs.text.value;
        
        if (!author || !text){
            alert("author and comment are required");
            return false;
        }
        
        var formData = $(this.refs.form).serialize();
        this.props.onEditCommentSubmit(formData, this.state.comment.id, author, text);
        
        this.refs.author.value = "";
        this.refs.text.value = "";
        
        this.setState({editing: false});
    },
    
    handleCanelEdit: function(){
        this.setState({editing: false});
    },
    
    renderEdit: function(){
        
        return (
            <div className="comment">
                <form ref="form" action={"/comments/" + this.state.comment.id} method="patch" acceptCharset="UTF-8" onSubmit={this.handleEditSubmit}>
                    Author: <input ref="author" type="text" placeholder="Your Name Here" name="comment[author]" defaultValue={this.state.comment.author} />
                    Text: <textarea ref="text" placeholder="Your Comment Here" name="comment[text]" defaultValue={this.state.comment.text}/>
                    <p>
                        <button type="submit">Save</button>
                        <button onClick={this.handleCancelEdit}>Cancel</button>
                    </p>
                </form>                
            </div>
        );
    },
    
    render: function(){
        if(this.state.editing){
            return this.renderEdit();
        }
        else{
            return this.renderDisplay();
        }
    }
});