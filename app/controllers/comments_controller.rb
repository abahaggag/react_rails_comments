class CommentsController < ApplicationController
  def index
    @comments = Comment.all
  end
  
  def create
    @comment = Comment.new comment_params
    @comment.save
    
    if request.xhr?
        render json: @comment
      else
        redirect_to comments_path
    end
    
  end
  
  def destroy
    @comment = Comment.find_by id: params[:id]
    @comment.destroy
    
    if request.xhr?
        render json: {}
      else
        redirect_to comments_path
    end
  end
  
  def update
    @comment = Comment.find_by id: params[:id]
    @comment.update_attributes(comment_params)
    
    if request.xhr?
        render json: Comment.find_by(id: params[:id])
      else
        redirect_to comments_path
    end
  end
  
  private
  def comment_params
    params.require(:comment).permit(:author, :text)
  end
end
